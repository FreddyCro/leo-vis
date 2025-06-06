<script setup lang="ts">
interface Props {
  isCustomSpace?: boolean;
  isCustomIntro?: boolean;
  isCustomArticle?: boolean;
}

defineProps<Props>();
</script>

<template>
  <div class="ls-layout">
    <div
      class="sticky top-0 h-[var(--ls-layout-header-h)] bg-[url('./img/bg_star.jpg')] bg-cover bg-center"
    >
      <template v-if="isCustomSpace">
        <slot name="space" />
      </template>
      <div v-else class="absolute inset-0 z-10">
        <slot name="space" />
      </div>

      <template v-if="isCustomIntro">
        <slot name="intro" />
      </template>
      <div v-else class="absolute inset-0 z-20 bg-black bg-opacity-50">
        <slot name="intro" />
      </div>
    </div>

    <template v-if="isCustomArticle">
      <slot name="article" />
    </template>
    <div v-else class="relative z-30 bg-black">
      <slot name="article" />
    </div>
  </div>
</template>

<style lang="scss">
.ls-layout {
  --ls-layout-header-h: 100vh;
}
</style>
