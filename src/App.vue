<script setup lang="ts">
// import LeoNavbar from '@/components/leo-navbar.vue';
// import LeoFooter from '@/components/leo-footer.vue';
// import SectionHero from '@/components/section-hero.vue';
// import SectionOne from '@/components/section-one.vue';
// import SectionTwo from '@/components/section-two.vue';
// import SectionThree from '@/components/section-three.vue';
// import SectionFour from '@/components/section-four.vue';
// import SectionTw from '@/components/section-tw.vue';
import { ref } from 'vue';
import LeoBarChart from '@/components/leo-bar-chart.vue';

const datasets = [
  {
    label: 'United States',
    segments: [
      { value: 859, color: '#00f7ef' }, // Commercial
      { value: 220, color: '#00b2ff' }, // Government
      { value: 21, color: '#008b85' }, // Military
    ],
  },
  {
    label: 'China',
    segments: [
      { value: 291, color: '#00f7ef' },
      { value: 209, color: '#00b2ff' },
      { value: 100, color: '#008b85' },
    ],
  },
  {
    label: 'United Kingdom',
    segments: [
      { value: 545, color: '#00f7ef' },
      { value: 5, color: '#00b2ff' },
      { value: 0, color: '#008b85' },
    ],
  },
  {
    label: 'Russia',
    segments: [
      { value: 103, color: '#00f7ef' },
      { value: 7, color: '#00b2ff' },
      { value: 60, color: '#008b85' },
    ],
  },
  {
    label: 'Japan',
    segments: [
      { value: 120, color: '#00f7ef' },
      { value: 30, color: '#00b2ff' },
      { value: 0, color: '#008b85' },
    ],
  },
  {
    label: 'India',
    segments: [
      { value: 60, color: '#00f7ef' },
      { value: 30, color: '#00b2ff' },
      { value: 0, color: '#008b85' },
    ],
  },
  {
    label: 'Other',
    segments: [
      { value: 300, color: '#00f7ef' },
      { value: 80, color: '#00b2ff' },
      { value: 10, color: '#008b85' },
    ],
  },
];

const data = ref(datasets);

function changeData() {}
</script>

<template>
  <div class="app">
    <LeoBarChart :datasets="data" />
    <!-- <LeoNavbar />
    <main class="leo-main">
      <div class="bg-black text-white">
        <SectionHero />
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
      </div>
      <SectionTw />
    </main>
    <LeoFooter /> -->
  </div>
</template>
