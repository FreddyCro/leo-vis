<script setup lang="ts">
import LeoIntro from '@/components/leo-intro.vue';
import LeoReadMore from '@/components/leo-read-more.vue';
import Mock from '@/components/mock.vue';
import str from '@/locales/section4.json';
</script>

<template>
  <div>
    <LeoIntro chapter="04">
      <p>{{ str.title }}</p>
      <p>{{ str.subTitle }}</p>
    </LeoIntro>

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

    <Mock :title="true" :caption="true" />

    <p>{{ str.p3t1 }}</p>
    <p>{{ str.p3t2 }}</p>

    <LeoReadMore
      :title="str.relatedTitle"
      :data="[
        {
          title: str.related1Title,
          link: str.related1Link,
        },
      ]"
    />
  </div>
</template>

<style lang="scss"></style>
