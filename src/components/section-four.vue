<script setup lang="ts">
import LeoSectionIntro from '@/components/leo-section-intro.vue';
import LeoSectionLayout from '@/components/leo-section-layout.vue';
import LeoSvgPathAnimation from '@/components/leo-svg-path-animation.vue';
import LeoReadMore from '@/components/leo-read-more.vue';
import str from '@/locales/section4.json';
</script>

<template>
  <div>
    <LeoSectionLayout>
      <template #space>
        <LeoSvgPathAnimation :element-number="3">
          <template #element-1>1</template>
          <template #element-2>2</template>
          <template #element-3>3</template>
        </LeoSvgPathAnimation>
      </template>
      <template #intro>
        <LeoSectionIntro chapter="04">
          <p>{{ str.title }}</p>
          <p>{{ str.subTitle }}</p>
        </LeoSectionIntro>
      </template>
      <template #article>
        <div class="leo-container">
          <p>{{ str.p1t1 }}</p>
          <p>{{ str.p1t2 }}</p>
          <p>{{ str.p1t3 }}</p>

          <!-- trash float -->
          <div
            class="w-[640px] h-[480px] flex items-center justify-center bg-red-200"
          >
            trash float
          </div>

          <p>{{ str.p2t1 }}</p>
          <p>{{ str.p2t2 }}</p>
          <p>{{ str.p2t3 }}</p>

          <figure>
            <div
              class="flourish-embed flourish-chart"
              data-src="visualisation/23290332"
            />
          </figure>

          <p>{{ str.p3t1 }}</p>
          <p>{{ str.p3t2 }}</p>

          <LeoReadMore
            :data="[
              {
                title: str.related1Title,
                desc: str.related1Desc,
                link: str.related1Link,
                bg: 'https://placehold.co/480x320/gray/white',
              },
            ]"
          />
        </div>
      </template>
    </LeoSectionLayout>
  </div>
</template>

<style lang="scss"></style>
