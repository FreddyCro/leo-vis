<!-- ref: https://github.com/dsuarezv/satellite-tracker -->
<script setup>
import { onMounted, ref } from 'vue';
import { Engine } from '@/utils/engine';

const USE_ORBIT_ANIMATE = true;
// const DateSliderRangeInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours

const state = {
  allChildren: [],
  initialDate: new Date().getTime() - 24 * 60 * 60 * 1000, // 24 hours ago
  currentDate: new Date().getTime(),
  referenceFrame: USE_ORBIT_ANIMATE ? 2 : 1,
};

const el = ref(null);
const engine = new Engine();

onMounted(() => {
  engine.referenceFrame = state.referenceFrame;
  engine.initialize(el.value, {
    // onStationClicked: () => {
    //   console.log('Station clicked');
    // },
  });

  addStations();
  engine.updateAllPositions(new Date());

  setInterval(() => {
    if (USE_ORBIT_ANIMATE) {
      state.currentDate += 1000 * 5; // Increment by 5 second
      engine.updateAllPositions(new Date(state.currentDate));
    } else {
      engine.updateAllPositions(new Date());
    }
  }, 1000);
});

function addStations() {
  engine
    .loadLteFileStations(getCorsFreeUrl('./active_satellites.txt'), 0xffffff)
    .then((stations) => {
      // console.log('Stations loaded:', stations);
      state.allChildren = addNameAndLabelToChildren(stations);
      engine.earth.children = state.allChildren;

      // remove 10000 children from state.allChildren
      // state.allChildren = state.allChildren.slice(0, 100);
      // engine.earth.children = state.allChildren;
      // console.log('engine.earth.children:', engine.earth.children);
      // engine.render();
    });
}

function filterSatellites(filterName) {
  // console.log('children:', Array.from(engine.earth.children)[2]);
  // console.log('stations:', state.allChildren[1]);

  switch (filterName) {
    case 'APOGEE_2000':
      engine.earth.children = state.allChildren.filter(
        (child) =>
          child.label.includes('APOGEE_2000') || child.label === 'EARTH',
      );
      break;
    case 'STARLINK':
      engine.earth.children = state.allChildren.filter(
        (child) => child.label.includes('STARLINK') || child.label === 'EARTH',
      );
      break;
    case 'ONEWEB_KUIPER':
      engine.earth.children = state.allChildren.filter(
        (child) =>
          child.label.includes('ONEWEB_KUIPER') || child.label === 'EARTH',
      );
      break;
    case 'ALL':
      // Reset to all children
      engine.earth.children = state.allChildren;
      break;
    default:
      console.warn('Unknown filter:', filterName);
  }

  engine.render();
}

function addNameAndLabelToChildren(stations) {
  return Array.from(engine.earth.children).map((child) => {
    const { uuid } = child;
    const station = stations.find((s) => s.mesh?.uuid === uuid);

    if (station) {
      child.name = station.name || '';
      child.label = classifyStation(station);
    }

    // preserve child not a station, it's the Earth mesh
    else {
      child.label = 'EARTH';
    }

    return child;

    // else {
    //   console.warn('Station not found for child:', uuid);
    // }
  });
}

function classifyStation(station) {
  let labels = [];

  if (station.name.includes('STARLINK')) {
    labels.push('STARLINK');
  }

  if (station.name.includes('ONEWEB') || station.name.includes('KUIPER')) {
    labels.push('ONEWEB_KUIPER');
  }

  if (station.mesh.apogee < 2000) {
    labels.push('APOGEE_2000');
  }

  return labels.length > 0 ? labels.join(', ') : '';
}

function getCorsFreeUrl(url) {
  return url;
}
</script>

<template>
  <div>
    <button
      class="p-3 border-solid border bg-white text-black"
      @click="filterSatellites('APOGEE_2000')"
    >
      {{ 'Apogee Height < 2000' }}
    </button>
    <button
      class="p-3 border-solid border bg-white text-black"
      @click="filterSatellites('STARLINK')"
    >
      STARLINK
    </button>
    <button
      class="p-3 border-solid border bg-white text-black"
      @click="filterSatellites('ONEWEB_KUIPER')"
    >
      ONEWEB/KUIPER
    </button>
    <button
      class="p-3 border-solid border bg-white text-black"
      @click="filterSatellites('ALL')"
    >
      ALL
    </button>
    <div ref="el" id="earth" class="w-[600px] h-[600px]"></div>
  </div>
</template>
