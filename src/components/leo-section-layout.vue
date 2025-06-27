<script setup lang="ts">
import LeoScrollTrigger from '@/components/leo-scroll-trigger.vue';

interface Props {
  isCustomSpace?: boolean;
  isCustomIntro?: boolean;
  isCustomArticle?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'changeSpace', isIntersecting: boolean): void;
}>();

function handleChangeSpace(isIntersecting: boolean) {
  // emit changeSpace event
  emit('changeSpace', isIntersecting);
}
</script>

<template>
  <div class="ls-layout relative">
    <LeoScrollTrigger
      class="absolute top-0 opacity-0 pointer-events-none"
      scroll-height="var(--ls-layout-header-h)"
      @change="handleChangeSpace"
    />

    <div
      class="sticky top-0 h-[var(--ls-layout-header-h)] bg-[url('./img/bg_star.jpg')] bg-cover bg-center overflow-hidden"
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
      <div
        v-else
        class="absolute inset-0 z-20 min-h-[568px] xs:min-h-[736px] md:min-h-[1024px] lg:min-h-[1280px]"
      >
        <slot name="intro" />
      </div>
    </div>

    <template v-if="isCustomArticle">
      <slot name="article" />
    </template>
    <div
      v-else
      class="relative z-30 mt-[calc(var(--init-screen-height)*0.14)] bg-black"
    >
      <div
        class="h-[calc(var(--init-screen-height)*0.15)] -translate-y-[calc(var(--init-screen-height)*0.14)] bg-gradient-to-b from-transparent to-black"
        role="presentation"
      />
      <div class="ls-layout-article-wrap">
        <slot name="article" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.ls-layout {
  --ls-layout-header-h: var(--init-screen-height);
}
</style>
