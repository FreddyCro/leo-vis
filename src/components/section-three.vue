<script setup lang="ts">
import { ref } from 'vue';
import LeoScrollTrigger from '@/components/leo-scroll-trigger.vue';
import LeoSectionIntro from '@/components/leo-section-intro.vue';
import LeoSectionLayout from '@/components/leo-section-layout.vue';
import LeoSvgPathAnimation from '@/components/leo-svg-path-animation.vue';
import Leo3dMoonSite from '@/components/leo-3d-moon-site.vue';
import LeoReadMore from '@/components/leo-read-more.vue';
import str from '@/locales/section3.json';

type MoonSiteCategory = 'all' | 'soviet' | 'us' | 'cn' | 'others';

const currentCategory = ref<MoonSiteCategory>('all');

function handleChangeCategory(
  isIntersecting: boolean,
  category: MoonSiteCategory,
) {
  if (!isIntersecting) return;
  currentCategory.value = category;
}
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
          <div class="leo-section leo-section--pt leo-section--no-mt">
            <p>{{ str.p1t1 }}</p>
            <p>{{ str.p1t2 }}</p>
            <p>{{ str.p1ChartTitle }}</p>
            <p>{{ str.p1ChartText1 }}</p>
            <p>{{ str.p1ChartText2 }}</p>
            <p>{{ str.p1ChartText3 }}</p>
            <p>{{ str.p1ChartText4 }}</p>
            <p>{{ str.p1ChartText5 }}</p>
            <p>{{ str.p1ChartText6 }}</p>
            <p>{{ str.p1ChartCaption }}</p>

            <!-- satellite fall down -->
            <div
              class="w-[640px] h-[480px] flex items-center justify-center bg-red-200"
            >
              satellite fall down
            </div>
          </div>
        </div>

        <div class="leo-section">
          <p>{{ str.p2t1 }}</p>
        </div>

        <div class="grid gird-cols-2 gap-4">
          <!-- 3d moon site -->
          <div class="sticky top-0 min-h-[100vh]">
            <Leo3dMoonSite :current-category="currentCategory" />
          </div>

          <!-- article -->
          <div class="relative opacity-[0.1] pointer-events-none">
            <!-- reset 3d moon site -->
            <LeoScrollTrigger
              :dev-mode="true"
              @change="handleChangeCategory($event, 'all')"
            />

            <!-- 3d moon site part soviet -->
            <LeoScrollTrigger
              :dev-mode="true"
              @change="handleChangeCategory($event, 'soviet')"
            >
              <div class="leo-section">
                <p>{{ str.p3t1 }}</p>
                <img
                  src="https://placehold.co/480x320/gray/white"
                  alt="Article Image"
                />
                <p>{{ str.p3Caption }}</p>
                <p>{{ str.p3t2 }}</p>
              </div>
            </LeoScrollTrigger>

            <!-- 3d moon site part us -->
            <LeoScrollTrigger
              :dev-mode="true"
              @change="handleChangeCategory($event, 'us')"
            >
              <div class="leo-section">
                <p>{{ str.p4t1 }}</p>
                <img
                  src="https://placehold.co/480x320/gray/white"
                  alt="Article Image"
                />
                <p>{{ str.p4Caption1 }}</p>
                <p>{{ str.p4t2 }}</p>
                <img
                  src="https://placehold.co/480x320/gray/white"
                  alt="Article Image"
                />
                <p>{{ str.p4Caption2 }}</p>
                <p>{{ str.p4t3 }}</p>
              </div>
            </LeoScrollTrigger>

            <!-- 3d moon site part cn -->
            <LeoScrollTrigger
              :dev-mode="true"
              @change="handleChangeCategory($event, 'cn')"
            >
              <div class="leo-section">
                <img
                  src="https://placehold.co/480x320/gray/white"
                  alt="Article Image"
                />
                <p>{{ str.p5Caption1 }}</p>
                <p>{{ str.p5t2 }}</p>
                <img
                  src="https://placehold.co/480x320/gray/white"
                  alt="Article Image"
                />
                <p>{{ str.p5Caption2 }}</p>
              </div>
            </LeoScrollTrigger>

            <!-- 3d moon site part others -->
            <LeoScrollTrigger
              :dev-mode="true"
              @change="handleChangeCategory($event, 'others')"
            >
              <div class="leo-section">
                <p>{{ str.p6t1 }}</p>
                <img
                  src="https://placehold.co/480x320/gray/white"
                  alt="Article Image"
                />
                <p>{{ str.p6Caption1 }}</p>
                <p>{{ str.p6t2 }}</p>
                <img
                  src="https://placehold.co/480x320/gray/white"
                  alt="Article Image"
                />
                <p>{{ str.p6Caption2 }}</p>
              </div>
            </LeoScrollTrigger>
          </div>
        </div>

        <!-- moon svg content -->
        <div
          class="w-[640px] h-[480px] flex items-center justify-center bg-red-200"
        >
          moon svg content
        </div>

        <div class="leo-container">
          <div class="leo-section">
            <p>{{ str.p3t1 }}</p>
          </div>

          <div class="leo-section">
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
        </div>
      </template>
    </LeoSectionLayout>
  </div>
</template>

<style lang="scss"></style>
