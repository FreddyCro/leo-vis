<script setup lang="ts">
type Item = {
  title: string;
  link: string;
};

interface Props {
  title?: string;
  data: Item[];
}

defineProps<Props>();
</script>

<template>
  <div class="leo-read-more">
    <h2 v-if="title" class="text-2xl font-bold mb-4">{{ title }}</h2>
    <ul class="list-disc pl-5">
      <li v-for="(item, index) in data" :key="index">
        <a :href="item.link" class="text-blue-500 hover:underline">{{
          item.title
        }}</a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss"></style>
