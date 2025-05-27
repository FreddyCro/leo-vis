<script setup lang="ts">
// import Leo3dMoonSite from '@/components/leo-3d-moon-site.vue';
import LeoIntro from '@/components/leo-intro.vue';
import LeoReadMore from '@/components/leo-read-more.vue';
import str from '@/locales/section3.json';
</script>

<template>
  <div>
    <leo-intro>
      <p>{{ str.title }}</p>
      <p>{{ str.subTitle }}</p>
    </leo-intro>

    <!-- satellite fall down -->

    <!-- 3d moon site -->

    <!-- moon svg content -->

    <leo-read-more />
  </div>
</template>

<style lang="scss"></style>
