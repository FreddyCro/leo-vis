<!-- ref: https://github.com/dsuarezv/satellite-tracker/blob/master/App.js -->
<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
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

const props = withDefaults(
  defineProps<{
    currentCategory?: string;
  }>(),
  { currentCategory: SATELLITE_LABEL_ALL },
);

const USE_ORBIT_ANIMATE = true;
const SATELLITE_FILE = './active_satellites.txt';
const SATELLITE_COLOR = 0xffffff; // white color for satellites
const SATELLITE_APOGEE_THRESHOLD = 2000; // apogee threshold in km
const INTERVAL_MS = 50;
const ORBIT_ANIMATE_STEP_MS = 5000; // Increment by 5 second
// const DateSliderRangeInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours

const CATEGORY_ORDER_MAP: Record<string, number> = {
  [SATELLITE_LABEL_ALL]: 1,
  [SATELLITE_LABEL_APOGEE]: 2,
  [SATELLITE_LABEL_STARLINK]: 3,
  [SATELLITE_LABEL_ONEWEB]: 4,
  [SATELLITE_LABEL_KUIPER]: 5,
};

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
let orbitalObserver: (() => void) | null = null;
let orbitRafId: number | null = null;

const filterCache: Record<string, Station[]> = {};

watch(
  () => props.currentCategory,
  (newCategory) => {
    filterSatellites(newCategory);
  },
);

onMounted(() => {
  engine.referenceFrame = state.referenceFrame;
  engine.initialize(el.value, {});

  addStations();
  engine.updateAllPositions(new Date());

  // orbital motion
  handleRunOrbitalMotionObserver();
});

onUnmounted(() => {
  if (orbitalObserver) {
    orbitalObserver();
    orbitalObserver = null;
  }

  if (orbitRafId !== null) {
    cancelAnimationFrame(orbitRafId);
    orbitRafId = null;
  }

  engine.dispose();
});

function buildFilterCache() {
  const allLabels = [
    SATELLITE_LABEL_ALL,
    SATELLITE_LABEL_APOGEE,
    SATELLITE_LABEL_STARLINK,
    SATELLITE_LABEL_ONEWEB_KUIPER,
  ];
  allLabels.forEach((label) => {
    filterCache[label] = state.allChildren.filter((child: Station) => {
      if (label === SATELLITE_LABEL_ALL) return true;

      return (
        child.label === SATELLITE_LABEL_EARTH ||
        (Array.isArray(child.label)
          ? child.label.includes(label)
          : child.label === label)
      );
    });
  });
}

function addStations() {
  engine
    .loadLteFileStations(SATELLITE_FILE, SATELLITE_COLOR)
    .then((stations: Station[]) => {
      // console.log('Stations loaded:', stations);
      state.allChildren = addNameAndLabelToChildren(stations);
      engine.earth.children = state.allChildren;

      // build cache
      buildFilterCache();
    });
}

function filterSatellites(filterName: string) {
  // use cache
  const children =
    filterCache[filterName] || filterCache[SATELLITE_LABEL_ALL] || [];
  engine.earth.children = children;

  // highlight stations
  engine.earth.children.forEach((child: any, i: number) => {
    // exclude Earth mesh from highlighting
    if (i > 0) {
      const station = {
        mesh: child,
      };
      engine.clearStationHighlight(station);
      engine.highlightStation(
        station,
        getCategoryColorOrder(filterName, child.label) || 1,
      );
    }
  });

  // render
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
  });
}

function classifyStation(station: Station): string[] {
  const labels: string[] = [];
  const name = station.name || '';

  // starlink
  if (name.includes(SATELLITE_LABEL_STARLINK)) {
    labels.push(SATELLITE_LABEL_STARLINK);
  }

  // oneweb and kuiper
  if (
    name.includes(SATELLITE_LABEL_ONEWEB) ||
    name.includes(SATELLITE_LABEL_KUIPER)
  ) {
    labels.push(SATELLITE_LABEL_ONEWEB_KUIPER);
  }

  // oneweb
  if (name.includes(SATELLITE_LABEL_ONEWEB)) {
    labels.push(SATELLITE_LABEL_ONEWEB);
  }

  // kuiper
  if (name.includes(SATELLITE_LABEL_KUIPER)) {
    labels.push(SATELLITE_LABEL_KUIPER);
  }

  // apogee height
  if (
    station.mesh &&
    typeof station.mesh.apogee === 'number' &&
    station.mesh.apogee < SATELLITE_APOGEE_THRESHOLD
  ) {
    labels.push(SATELLITE_LABEL_APOGEE);
  }
  return labels.length > 0 ? labels : [SATELLITE_LABEL_EARTH];
}

function handleRunOrbitalMotionObserver() {
  const { observe } = createIntersectionObserver();

  orbitalObserver = observe({
    element: root.value,
    enterCallback: () => {
      let lastTime = performance.now();

      function animate(now: number) {
        orbitRafId = requestAnimationFrame(animate);

        if (USE_ORBIT_ANIMATE) {
          const elapsed = now - lastTime;
          if (elapsed >= INTERVAL_MS) {
            state.currentDate += ORBIT_ANIMATE_STEP_MS;
            engine.updateAllPositions(new Date(state.currentDate));
            lastTime = now;
          }
        } else {
          engine.updateAllPositions(new Date());
        }
      }

      orbitRafId = requestAnimationFrame(animate);
    },
    leaveCallback: () => {
      if (orbitRafId !== null) {
        cancelAnimationFrame(orbitRafId);
        orbitRafId = null;
      }
      engine.updateAllPositions(new Date(state.currentDate));
    },
    options: {
      threshold: 0.5,
    },
  });
}

function getCategoryColorOrder(
  filterName: string,
  label: string | string[],
): number {
  const labels = Array.isArray(label) ? label : [label];

  if (filterName === SATELLITE_LABEL_ONEWEB_KUIPER) {
    if (labels.includes(SATELLITE_LABEL_ONEWEB)) {
      return CATEGORY_ORDER_MAP[SATELLITE_LABEL_ONEWEB];
    }
    if (labels.includes(SATELLITE_LABEL_KUIPER)) {
      return CATEGORY_ORDER_MAP[SATELLITE_LABEL_KUIPER];
    }
  } else if (labels.includes(filterName)) {
    return CATEGORY_ORDER_MAP[filterName];
  }
  // Default case for other categories
  return CATEGORY_ORDER_MAP[SATELLITE_LABEL_ALL];
}
</script>

<template>
  <div ref="root">
    <div
      id="earth"
      ref="el"
      class="w-full h-[calc(var(--init-screen-height)*1)] flex items-center overflow-hidden pointer-events-none"
    />
  </div>
</template>
