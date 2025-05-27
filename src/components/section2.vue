<script setup lang="ts">
import LeoIntro from '@/components/leo-intro.vue';
import LeoReadMore from '@/components/leo-read-more.vue';
import str from '@/locales/section2.json';
</script>

<template>
  <div>
    <leo-intro>
      <p>{{ str.title }}</p>
      <p>{{ str.subTitle }}</p>
    </leo-intro>
    <leo-read-more />
  </div>
</template>

<style lang="scss"></style>
