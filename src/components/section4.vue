<script setup lang="ts">
import LeoIntro from '@/components/leo-intro.vue';
import LeoReadMore from '@/components/leo-read-more.vue';
import str from '@/locales/section4.json';
</script>

<template>
  <div>
    <LeoIntro chapter="04">
      <p>{{ str.title }}</p>
      <p>{{ str.subTitle }}</p>
    </LeoIntro>

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
  </div>
</template>

<style lang="scss"></style>
