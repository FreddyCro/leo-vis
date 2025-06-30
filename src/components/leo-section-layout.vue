<script setup lang="ts">
import LeoScrollTrigger from '@/components/leo-scroll-trigger.vue';
import LeoPic from '@/components/leo-pic.vue';

interface Props {
  isCustomSpace?: boolean;
  isCustomIntro?: boolean;
  isCustomArticle?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'changeSpace', isIntersecting: boolean): void;
  (e: 'changeArticle', isIntersecting: boolean): void;
}>();

function handleChangeSpace(isIntersecting: boolean) {
  // emit changeSpace event
  emit('changeSpace', isIntersecting);
}

function handleChangeArticle(isIntersecting: boolean) {
  // emit changeArticle event
  emit('changeArticle', isIntersecting);
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
      class="sticky top-0 h-[var(--ls-layout-header-h)] overflow-hidden relative"
    >
      <LeoPic
        classname="absolute inset-0 w-full h-full object-cover"
        src="img/bg_star"
        :use2x="false"
        :webp="false"
        loading="eager"
      />

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

    <LeoScrollTrigger :threshold="0" @change="handleChangeArticle">
      <template v-if="isCustomArticle">
        <slot name="article" />
      </template>
      <div
        v-else
        class="relative z-30 mt-[calc(var(--init-screen-height)*0.8)] bg-black"
      >
        <div
          class="h-[calc(var(--init-screen-height)*0.15)] -translate-y-[calc(var(--init-screen-height)*0.14)] bg-gradient-to-b from-transparent to-black pointer-events-none"
          role="presentation"
        />
        <div class="ls-layout-article-wrap">
          <slot name="article" />
        </div>
      </div>
    </LeoScrollTrigger>
  </div>
</template>

<style lang="scss">
.ls-layout {
  --ls-layout-header-h: var(--init-screen-height);
}
</style>
