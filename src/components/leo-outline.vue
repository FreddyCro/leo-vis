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
  <div>
    <!-- section name -->
    {{ data }}

    <!-- section articles  -->
  </div>
</template>

<style lang="scss"></style>
