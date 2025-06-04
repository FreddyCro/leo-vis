<script setup lang="ts">
import LeoIntro from '@/components/leo-intro.vue';
import LeoReadMore from '@/components/leo-read-more.vue';
import Mock from '@/components/mock.vue';
import str from '@/locales/section2.json';
</script>

<template>
  <div>
    <LeoIntro chapter="02">
      <p>{{ str.title }}</p>
      <p>{{ str.subTitle }}</p>
    </LeoIntro>

    <div class="leo-container">
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

<style lang="scss"></style>
