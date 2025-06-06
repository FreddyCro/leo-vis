<script setup lang="ts">
import LeoSectionIntro from '@/components/leo-section-intro.vue';
import LeoSectionLayout from '@/components/leo-section-layout.vue';
import LeoSvgPathAnimation from '@/components/leo-svg-path-animation.vue';
import LeoReadMore from '@/components/leo-read-more.vue';
import Mock from '@/components/mock.vue';
import str from '@/locales/section2.json';
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
        <LeoSectionIntro chapter="02">
          <p>{{ str.title }}</p>
          <p>{{ str.subTitle }}</p>
        </LeoSectionIntro>
      </template>
      <template #article>
        <div class="leo-container">
          <div class="leo-section leo-section--pt leo-section--no-mt">
            <p>{{ str.p1t1 }}</p>
            <p>{{ str.p1t2 }}</p>
            <figure>
              <div
                class="flourish-embed flourish-chart"
                data-src="visualisation/23266793"
              />
            </figure>
            <p>{{ str.p2t1 }}</p>
            <figure>
              <div
                class="flourish-embed flourish-chart"
                data-src="visualisation/23267137"
              />
            </figure>
            <p>{{ str.p3t1 }}</p>
            <p>{{ str.p3t2 }}</p>
          </div>
          <div class="leo-section">
            <figure>
              <div
                class="flourish-embed flourish-chart"
                data-src="visualisation/23265551"
              />
            </figure>
            <p>{{ str.p4t1 }}</p>
            <figure>
              <figcaption>
                {{ str.g4Title }}
              </figcaption>
              <Mock />
              <figcaption>
                {{ str.g4Caption }}
              </figcaption>
            </figure>
            <p>{{ str.p5t1 }}</p>
            <p>{{ str.p5t2 }}</p>
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
                {
                  title: str.related3Title,
                  link: str.related3Link,
                  bg: 'https://placehold.co/480x320/gray/white',
                },
                {
                  title: str.related4Title,
                  link: str.related4Link,
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
