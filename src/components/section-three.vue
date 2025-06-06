<script setup lang="ts">
import LeoSectionIntro from '@/components/leo-section-intro.vue';
import LeoSectionLayout from '@/components/leo-section-layout.vue';
import LeoSvgPathAnimation from '@/components/leo-svg-path-animation.vue';
import Leo3dMoonSite from '@/components/leo-3d-moon-site.vue';
import LeoReadMore from '@/components/leo-read-more.vue';
import str from '@/locales/section3.json';
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
        <LeoSectionIntro chapter="03">
          <p>{{ str.title }}</p>
          <p>{{ str.subTitle }}</p>
        </LeoSectionIntro>
      </template>
      <template #article>
        <div class="leo-container">
          <p>{{ str.p1t1 }}</p>
          <p>{{ str.p1t2 }}</p>
          <p>{{ str.p1t3 }}</p>

          <!-- satellite fall down -->
          <div
            class="w-[640px] h-[480px] flex items-center justify-center bg-red-200"
          >
            satellite fall down
          </div>

          <p>{{ str.p2t1 }}</p>
          <p>{{ str.p2t2 }}</p>
          <p>{{ str.p2t3 }}</p>
        </div>

        <!-- 3d moon site -->
        <div
          class="w-[640px] h-[480px] flex items-center justify-center bg-red-200"
        >
          <Leo3dMoonSite />
        </div>

        <div class="leo-container">
          <!-- moon svg content -->
          <div
            class="w-[640px] h-[480px] flex items-center justify-center bg-red-200"
          >
            moon svg content
          </div>
          <p>{{ str.p3t1 }}</p>

          <LeoReadMore
            :title="str.relatedTitle"
            :data="[
              {
                title: str.related1Title,
                link: str.related1Link,
                bg: 'https://placehold.co/480x320/gray/white',
              },
              {
                title: str.related2Title,
                link: str.related2Link,
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
