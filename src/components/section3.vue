<script setup lang="ts">
import Leo3dMoonSite from '@/components/leo-3d-moon-site.vue';
import LeoIntro from '@/components/leo-intro.vue';
import LeoReadMore from '@/components/leo-read-more.vue';
import str from '@/locales/section3.json';
</script>

<template>
  <div>
    <leo-intro chapter="03">
      <p>{{ str.title }}</p>
      <p>{{ str.subTitle }}</p>
    </leo-intro>

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

    <!-- 3d moon site -->
    <div
      class="w-[640px] h-[480px] flex items-center justify-center bg-red-200"
    >
      <leo-3d-moon-site />
    </div>

    <!-- moon svg content -->
    <div
      class="w-[640px] h-[480px] flex items-center justify-center bg-red-200"
    >
      moon svg content
    </div>
    <p>{{ str.p3t1 }}</p>

    <leo-read-more
      :title="str.relatedTitle"
      :data="[
        {
          title: str.related1Title,
          link: str.related1Link,
        },
        {
          title: str.related2Title,
          link: str.related2Link,
        },
      ]"
    />
  </div>
</template>

<style lang="scss"></style>
