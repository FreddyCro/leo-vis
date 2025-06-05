<script setup lang="ts"></script>

<template>
  <div class="ls-layout">
    <div
      class="sticky top-0 h-[var(--ls-layout-header-h)] bg-[url('./img/bg_star.jpg')] bg-cover bg-center"
    >
      <div class="absolute inset-0 z-10">
        <slot name="space" />
      </div>
      <div class="relative z-20">
        <slot name="intro" />
      </div>
    </div>
    <div class="relative z-30 bg-black">
      <slot name="article" />
    </div>
  </div>
</template>

<style lang="scss">
.ls-layout {
  --ls-layout-header-h: 100vh;
}
</style>
