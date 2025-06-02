<!-- ref: https://github.com/dsuarezv/satellite-tracker/blob/master/App.js -->
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { Engine } from '@/utils/engine';
import createIntersectionObserver from '@/utils/intersection-observer';
import {
  SATELLITE_LABEL_ALL,
  SATELLITE_LABEL_APOGEE,
  SATELLITE_LABEL_EARTH,
  SATELLITE_LABEL_KUIPER,
  SATELLITE_LABEL_ONEWEB,
  SATELLITE_LABEL_ONEWEB_KUIPER,
  SATELLITE_LABEL_STARLINK,
} from '@/utils/constants';

interface Station {
  name: string;
  label: string;
  mesh: {
    uuid: string;
    apogee: number;
  };
}

const USE_ORBIT_ANIMATE = false;
const SATELLITE_FILE = './active_satellites.txt';
const SATELLITE_COLOR = 0xffffff; // white color for satellites
const SATELLITE_APOGEE_THRESHOLD = 2000; // apogee threshold in km
const INTERVAL_MS = 1000;
const ORBIT_ANIMATE_STEP_MS = 5000; // Increment by 5 second
// const DateSliderRangeInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours

const state: {
  allChildren: Station[];
  initialDate: number;
  currentDate: number;
  referenceFrame: number;
} = {
  allChildren: [],
  initialDate: new Date().getTime() - 24 * 60 * 60 * 1000, // 24 hours ago
  currentDate: new Date().getTime(),
  referenceFrame: USE_ORBIT_ANIMATE ? 2 : 1,
};

const root = ref<HTMLElement | null>(null);
const el = ref<HTMLElement | null>(null);
const engine: any = new Engine();
let timer: ReturnType<typeof setInterval> | null = null;
let _unobserve: (() => void) | null = null;

onMounted(() => {
  engine.referenceFrame = state.referenceFrame;
  engine.initialize(el.value, {});

  addStations();
  engine.updateAllPositions(new Date());

  // obital motion
  handleRunOrbitalMotionObserver();
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

function addStations() {
  engine
    .loadLteFileStations(SATELLITE_FILE, SATELLITE_COLOR)
    .then((stations: Station[]) => {
      // console.log('Stations loaded:', stations);
      state.allChildren = addNameAndLabelToChildren(stations);
      engine.earth.children = state.allChildren;
    });
}

function filterSatellites(filterName: string) {
  const filterMap: Record<string, (label: string) => boolean> = {
    [SATELLITE_LABEL_APOGEE]: (label) => label.includes(SATELLITE_LABEL_APOGEE),
    [SATELLITE_LABEL_STARLINK]: (label) =>
      label.includes(SATELLITE_LABEL_STARLINK),
    [SATELLITE_LABEL_ONEWEB_KUIPER]: (label) =>
      label.includes(SATELLITE_LABEL_ONEWEB_KUIPER),
    [SATELLITE_LABEL_ALL]: () => true,
  };

  const isMatch = filterMap[filterName];

  if (!isMatch) {
    console.warn('Unknown filter:', filterName);
    return;
  }

  engine.earth.children = state.allChildren.filter(
    (child: Station) =>
      child.label === SATELLITE_LABEL_EARTH || isMatch(child.label),
  );

  engine.render();
}

function addNameAndLabelToChildren(stations: Station[]) {
  return Array.from(engine.earth.children).map((child: any) => {
    const { uuid } = child;
    const station = stations.find((s: Station) => s.mesh?.uuid === uuid);

    if (station) {
      child.name = station.name || '';
      child.label = classifyStation(station);
    }

    // preserve child not a station, it's the Earth mesh
    else {
      child.label = SATELLITE_LABEL_EARTH;
    }

    return child;

    // else {
    //   console.warn('Station not found for child:', uuid);
    // }
  });
}

function classifyStation(station: Station): string[] {
  const labels = [];

  if (station.name.includes(SATELLITE_LABEL_STARLINK)) {
    labels.push(SATELLITE_LABEL_STARLINK);
  }

  if (
    station.name.includes(SATELLITE_LABEL_ONEWEB) ||
    station.name.includes(SATELLITE_LABEL_KUIPER)
  ) {
    labels.push(SATELLITE_LABEL_ONEWEB_KUIPER);
  }

  if (station.mesh.apogee < SATELLITE_APOGEE_THRESHOLD) {
    labels.push(SATELLITE_LABEL_APOGEE);
  }

  return labels;
}

function handleRunOrbitalMotionObserver() {
  const { observe } = createIntersectionObserver();
  _unobserve = observe({
    element: root.value,
    enterCallback: () => {
      timer = setInterval(() => {
        if (USE_ORBIT_ANIMATE) {
          state.currentDate += ORBIT_ANIMATE_STEP_MS;
          engine.updateAllPositions(new Date(state.currentDate));
        } else {
          engine.updateAllPositions(new Date());
        }
      }, INTERVAL_MS);
    },
    leaveCallback: () => {
      if (timer) clearInterval(timer);
      timer = null;
      engine.updateAllPositions(new Date(state.currentDate));
    },
    options: {
      threshold: 0.5,
    },
  });
}
</script>

<template>
  <div ref="root">
    <button
      class="p-3 border-solid border bg-white text-black"
      @click="filterSatellites(SATELLITE_LABEL_APOGEE)"
    >
      {{ 'Apogee Height < 2000' }}
    </button>
    <button
      class="p-3 border-solid border bg-white text-black"
      @click="filterSatellites(SATELLITE_LABEL_STARLINK)"
    >
      STARLINK
    </button>
    <button
      class="p-3 border-solid border bg-white text-black"
      @click="filterSatellites(SATELLITE_LABEL_ONEWEB_KUIPER)"
    >
      ONEWEB/KUIPER
    </button>
    <button
      class="p-3 border-solid border bg-white text-black"
      @click="filterSatellites(SATELLITE_LABEL_ALL)"
    >
      ALL
    </button>
    <div id="earth" ref="el" class="w-[600px] h-[600px]"></div>
  </div>
</template>
