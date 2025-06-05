<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import Leo3dEarthHero from '@/components/leo-3d-earth-hero.vue';
import LeoSectionIntro from '@/components/leo-section-intro.vue';
import LeoSectionLayout from '@/components/leo-section-layout.vue';
import LeoOutline from '@/components/leo-outline.vue';
import Mock from '@/components/mock.vue';
import str from '@/locales/section-hero.json';

const isZoomOut = ref(false);
let lastScrollTop = 0;

window.addEventListener('scroll', handleScroll);

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

function handleScroll() {
  const currentScrollTop =
    window.pageYOffset || document.documentElement.scrollTop;

  if (currentScrollTop > 100) {
    // 離開頁面頂部，執行回調 a
    isZoomOut.value = true;
  } else {
    // 回到頁面頂部，執行回調 b
    isZoomOut.value = false;
  }

  lastScrollTop = currentScrollTop;
}
</script>

<template>
  <div class="ls-hero">
    <LeoSectionLayout>
      <template #space>
        <Leo3dEarthHero :is-zoom-out="isZoomOut" />
      </template>
      <template #intro>
        <LeoSectionIntro>
          <p>{{ str.title }}</p>
          <p>{{ str.subTitle }}</p>
        </LeoSectionIntro>
      </template>
      <template #article>
        <div class="leo-container">
          <p>{{ str.p1t1 }}</p>
          <p>{{ str.p1t2 }}</p>
          <figure>
            <figcaption>
              {{ str.g1Title }}
            </figcaption>
            <Mock />
            <figcaption>
              {{ str.g1Caption }}
            </figcaption>
          </figure>
          <figure>
            <div
              class="flourish-embed flourish-chart"
              data-src="visualisation/23264843"
            />
          </figure>
          <p>{{ str.p2t1 }}</p>
          <p>{{ str.p3t1 }}</p>
          <p>{{ str.p3t2 }}</p>

          <LeoOutline />
        </div>
      </template>
    </LeoSectionLayout>
  </div>
</template>

<style lang="scss">
.ls-hero {
  // override the default height
  .ls-layout {
    --ls-layout-header-h: 250vh;
  }
}
</style>
