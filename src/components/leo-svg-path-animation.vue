<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { AnimationController } from '@/utils/svg-path-animation-controller';

interface Props {
  elementNumber: number;
}

defineProps<Props>();

const svgEl = ref<SVGSVGElement | null>(null);
const elementEls = ref<HTMLDivElement[]>([]);
const circleEl = ref<SVGCircleElement | null>(null);
const DURATION = 10000;

onMounted(() => {
  const animation = new AnimationController({
    svgEl: svgEl.value,
    elements: elementEls.value,
    circleEl: circleEl.value,
    yoyo: true,
  });

  animation.drawLines().run(DURATION);

  // TODO: stop when out of view

  // animation.drawLines().run(DURATION).addCircle();

  // 範例：3秒後移動到新圓點
  // setTimeout(() => {
  //   animation.moveToNewPoint({
  //     duration: 3000,
  //   });
  // }, 3000);
});
</script>

<template>
  <div class="relative w-full h-full overflow-hidden">
    <svg
      ref="svgEl"
      class="l-svg-animate-path w-full h-full"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    />
    <div
      v-for="i in elementNumber"
      :key="i"
      ref="elementEls"
      class="absolute top-0 left-0"
    >
      <slot :name="`element-${i}`" />
    </div>
  </div>
</template>

<style lang="scss">
.l-svg-animate-path {
  path {
    fill: none;
    // stroke: black;
  }
}
</style>
