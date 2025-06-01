<!-- <script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Engine } from '@/utils/engine';

const UseDateSlider = false;

const state = ref({
  stations: [],
  initialDate: new Date().getTime(),
  currentDate: new Date().getTime(),
  referenceFrame: UseDateSlider ? 2 : 1,
});

const el = ref<HTMLElement | null>(null);
const engine = new Engine();
const currentGroup = ref<'active' | 'starlink'>('active');

onMounted(() => {
  engine.referenceFrame = state.value.referenceFrame;
  engine.initialize(el.value, {
    onStationClicked: () => {
      console.log('Station clicked');
    },
  });

  addStations();
  engine.updateAllPositions(new Date());
});

function addStations() {
  const groupMap = {
    active: './all.txt',
    // 'https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle',
    starlink: './startlink.txt',
    // 'https://celestrak.org/NORAD/elements/gp.php?GROUP=starlink&FORMAT=tle',
  };

  const url = getCorsFreeUrl(groupMap[currentGroup.value]);

  // console.log('state.value:', state.value);
  // state.value.stations.forEach((station) => {
  //   engine.removeSatellite(station);
  // });
  // state.value.stations = [];

  engine
    .loadLteFileStations(
      url,
      currentGroup.value === 'active' ? 0xffffff : 0x0000ff,
    )
    .then((stations) => {
      state.value.stations = stations;
      // console.log('Stations loaded:', stations, groupMap[currentGroup.value]);
      // state.value.stations = stations.filter((station) => {
      //   const mash = station.mesh;
      //   return currentGroup.value === 'active'
      //     ? !mash.name.includes('STARLINK')
      //     : mash.name.includes('STARLINK');
      // });
    });
}

function switchStations() {
  currentGroup.value = currentGroup.value === 'active' ? 'starlink' : 'active';
  addStations();
}

function getCorsFreeUrl(url: string): string {
  return url;
}
</script>

<template>
  <div>
    <button
      @click="switchStations"
      class="mb-2 px-4 py-1 bg-blue-600 text-white rounded"
    >
      Switch Stations ({{ currentGroup }})
    </button>
    <div ref="el" id="earth" class="w-[300px] h-[300px]"></div>
  </div>
</template> -->

<!-- ref: https://github.com/dsuarezv/satellite-tracker -->
<script setup>
import { onMounted, ref } from 'vue';
import { Engine } from '@/utils/engine';

const UseDateSlider = false;
// const DateSliderRangeInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours

const state = ref({
  stations: [],
  initialDate: new Date().getTime(),
  currentDate: new Date().getTime(),
  referenceFrame: UseDateSlider ? 2 : 1,
});

const el = ref(null);
const engine = new Engine();

onMounted(() => {
  engine.referenceFrame = state.value.referenceFrame;
  engine.initialize(el.value, {
    onStationClicked: () => {
      console.log('Station clicked');
    },
  });

  addStations();
  engine.updateAllPositions(new Date());

  // setTimeout(() => {
  //   state.value.stations.forEach((station) => {
  //     engine.addOrbit(station);
  //     // console.log('Removed station:', station);
  //   });
  //   console.log('All stations removed');
  // }, 5000);
});

function addStations() {
  //this.engine.loadLteFileStations(getCorsFreeUrl('https://celestrak.org/NORAD/elements/weather.txt'), 0x00ffff)
  //this.engine.loadLteFileStations(getCorsFreeUrl('https://celestrak.org/NORAD/elements/cosmos-2251-debris.txt'), 0xff0090)
  engine
    .loadLteFileStations(
      getCorsFreeUrl(
        './active_satellites.txt',
        // './startlink.txt',
        // 'https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle',
      ),
      0xffffff,
    )
    //this.engine.loadLteFileStations(getCorsFreeUrl('https://celestrak.org/NORAD/elements/science.txt'), 0xffff00)
    //this.engine.loadLteFileStations(getCorsFreeUrl('https://celestrak.org/NORAD/elements/stations.txt'), 0xffff00)
    //this.engine.loadLteFileStations(getCorsFreeUrl('https://celestrak.org/NORAD/elements/iridium-NEXT.txt'), 0x00ff00)
    //this.engine.loadLteFileStations(getCorsFreeUrl('https://celestrak.org/NORAD/elements/gps-ops.txt'), 0x00ff00)
    //this.engine.loadLteFileStations(getCorsFreeUrl('https://celestrak.org/NORAD/elements/ses.txt'), 0xffffff)
    //this.engine.loadLteFileStations(getCorsFreeUrl('https://celestrak.org/NORAD/elements/starlink.txt'), 0x0000ff)
    //this.engine.loadLteFileStations(getCorsFreeUrl('https://celestrak.org/NORAD/elements/gps-ops.txt'), 0xffffff, { orbitMinutes: 0, satelliteSize: 200 })
    //this.engine.loadLteFileStations(getCorsFreeUrl('https://celestrak.org/NORAD/elements/glo-ops.txt'), 0xff0000, { orbitMinutes: 500, satelliteSize: 500 })
    .then((stations) => {
      state.value.stations = stations;
      console.log('Stations loaded:', stations);

      // stations.value.stations.forEach((station) => {
      //   engine.removeSatellite(station);
      //   console.log('Removed station:', station);
      // });
    });
}

// function processQuery(stations) {
//   const q = window.location.search;
//   if (!q) return;

//   const params = qs.parse(q);

//   if (params.ss) {
//     const selectedIds = params.ss.split(',');
//     if (!selectedIds || selectedIds.length === 0) return;

//     selectedIds.forEach((id) => {
//       const station = this.findStationById(stations, id);
//       if (station) this.selectStation(station);
//     });
//   }

//   if (params.highlight) {
//     const query = params.highlight;
//     const matches = this.queryStationsByName(stations, query);
//     matches.forEach((st) => this.engine.highlightStation(st));
//     this.setState({ ...this.state, query, queryObjectCount: matches.length });
//   }
// }

function getCorsFreeUrl(url) {
  return url;
}
</script>

<template>
  <div ref="el" id="earth" class="w-[600px] h-[600px]"></div>
</template>
