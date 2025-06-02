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

    <p>{{ str.p1t1 }}</p>
    <p>{{ str.p1t2 }}</p>
    <Mock :title="true" :caption="true" />
    <p>{{ str.p2t1 }}</p>
    <Mock :title="true" :caption="true" />
    <p>{{ str.p3t1 }}</p>
    <p>{{ str.p3t2 }}</p>
    <Mock :title="true" :caption="true" />
    <p>{{ str.p4t1 }}</p>
    <Mock :title="true" :caption="true" />
    <p>{{ str.p5t1 }}</p>
    <p>{{ str.p5t2 }}</p>

    <LeoReadMore
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
        {
          title: str.related3Title,
          link: str.related3Link,
        },
        {
          title: str.related4Title,
          link: str.related4Link,
        },
      ]"
    />
  </div>
</template>

<style lang="scss"></style>
