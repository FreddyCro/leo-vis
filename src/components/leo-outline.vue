<script setup lang="ts">
import strOutline from '@/locales/outline.json';
import str1 from '@/locales/section1.json';
import str2 from '@/locales/section2.json';
import str3 from '@/locales/section3.json';
import str4 from '@/locales/section4.json';

const data = [
  {
    title: str1.title,
    subTitle: str1.subTitle,
    articles: [
      { text: strOutline.text1_1, link: strOutline.link1_1 },
      { text: strOutline.text1_2, link: strOutline.link1_2 },
      { text: strOutline.text1_3, link: strOutline.link1_3 },
    ],
  },
  {
    title: str2.title,
    subTitle: str2.subTitle,
    articles: [
      { text: strOutline.text2_1, link: strOutline.link2_1 },
      { text: strOutline.text2_2, link: strOutline.link2_2 },
      { text: strOutline.text2_3, link: strOutline.link2_3 },
      { text: strOutline.text2_4, link: strOutline.link2_4 },
    ],
  },
  {
    title: str3.title,
    subTitle: str3.subTitle,
    articles: [
      { text: strOutline.text3_1, link: strOutline.link3_1 },
      { text: strOutline.text3_2, link: strOutline.link3_2 },
    ],
  },
  {
    title: str4.title,
    subTitle: str4.subTitle,
    articles: [{ text: strOutline.text4_1, link: strOutline.link4_1 }],
  },
];
</script>

<template>
  <div class="leo-outline"></div>
  <h2 class="text-3xl font-bold mb-4">{{ strOutline.title }}</h2>
  <!-- section name -->

  <!-- section articles  -->
  <div v-for="(section, index) in data" :key="index" class="mb-8">
    <h3 class="text-2xl font-semibold mb-2">{{ section.title }}</h3>
    <p class="text-lg mb-4">{{ section.subTitle }}</p>
    <ul class="list-disc pl-5">
      <li v-for="(article, idx) in section.articles" :key="idx">
        <a :href="article.link" class="text-blue-500 hover:underline">
          {{ article.text }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss"></style>
