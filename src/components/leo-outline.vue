<script setup lang="ts">
import LeoPic from '@/components/leo-pic.vue';
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
      {
        text: strOutline.text1_1,
        link: strOutline.link1_1,
        bg: 'img/newspaceera2025_pic2_1',
      },
      {
        text: strOutline.text1_2,
        link: strOutline.link1_2,
        bg: 'img/newspaceera2025_pic2_2',
      },
      {
        text: strOutline.text1_3,
        link: strOutline.link1_3,
        bg: 'img/newspaceera2025_pic2_3',
      },
    ],
  },
  {
    title: str2.title,
    subTitle: str2.subTitle,
    articles: [
      {
        text: strOutline.text2_1,
        link: strOutline.link2_1,
        bg: 'img/newspaceera2025_pic2_4',
      },
      {
        text: strOutline.text2_2,
        link: strOutline.link2_2,
        bg: 'img/newspaceera2025_pic2_5',
      },
      {
        text: strOutline.text2_3,
        link: strOutline.link2_3,
        bg: 'img/newspaceera2025_pic2_6',
      },
      {
        text: strOutline.text2_4,
        link: strOutline.link2_4,
        bg: 'img/newspaceera2025_pic2_7',
      },
    ],
  },
  {
    title: str3.title,
    subTitle: str3.subTitle,
    articles: [
      {
        text: strOutline.text3_1,
        link: strOutline.link3_1,
        bg: 'img/newspaceera2025_pic2_8',
      },
      {
        text: strOutline.text3_2,
        link: strOutline.link3_2,
        bg: 'img/newspaceera2025_pic2_9',
      },
    ],
  },
  {
    title: str4.title,
    subTitle: str4.subTitle,
    articles: [
      {
        text: strOutline.text4_1,
        link: strOutline.link4_1,
        bg: 'img/newspaceera2025_pic2_10',
      },
    ],
  },
];
</script>

<template>
  <div class="l-outline">
    <h2 class="text-3xl font-bold mb-4">{{ strOutline.title }}</h2>

    <div v-for="(chapter, index) in data" :key="index" class="mb-7 sm:mb-9">
      <!-- chapter title -->
      <div class="inline-flex items-center gap-2 mb-3 md:mb-6">
        <!-- number -->
        <div class="text-7xl text-[#00F4DC]">0{{ index + 1 }}</div>

        <!-- title -->
        <div>
          <h3 class="text-2xl font-semibold mb-2">{{ chapter.title }}</h3>
          <p class="text-lg mb-4">{{ chapter.subTitle }}</p>
        </div>
      </div>

      <!-- chapter articles  -->
      <ul class="flex flex-col md:grid md:grid-cols-2 gap-2 sm:gap-4">
        <li v-for="article in chapter.articles" :key="article.text">
          <a :href="article.link" class="flex gap-3">
            <!-- img -->
            <div
              class="relative min-h-[74px] sm:min-h-[88px] aspect-[120/74] shrink-0 rounded-lg border border-[#808080] overflow-hidden"
            >
              <LeoPic
                :src="article.bg"
                :use-prefix="false"
                :webp="false"
                :width="620"
                :height="450"
              />
            </div>

            <!-- text -->
            <p class="l-outline__card-text w-full flex items-center">
              {{ article.text }}
            </p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.l-outline {
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &__card-text {
    line-height: 1.5 !important;
  }
}
</style>
