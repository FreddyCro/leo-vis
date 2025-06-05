<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { AnimationController } from '@/utils/svg-path-animation-controller';

const svgEl = ref<SVGSVGElement | null>(null);
const blueEl = ref<HTMLDivElement | null>(null);
const greenEl = ref<HTMLDivElement | null>(null);
const circleEl = ref<SVGCircleElement | null>(null);

const DURATION = 40000;

onMounted(() => {
  const animation = new AnimationController({
    svgEl: svgEl.value,
    elements: [blueEl.value, greenEl.value],
    circleEl: circleEl.value,
  });

  animation.drawLines().run(DURATION).addCircle();

  // 範例：3秒後移動到新圓點
  setTimeout(() => {
    animation.moveToNewPoint();
  }, 3000);
});

// ref:
// https://codepen.io/PointC/pen/PoWBYXm
// https://codepen.io/benfrain/pen/yLqyKOo
// https://benfrain.com/how-to-animate-along-an-svg-path-at-the-same-time-the-path-animates/
// 用 animateMotion 裡面放 img?
// getPointAtLength
// https://codepen.io/nirjan_dev/pen/vYEmpgb

// chatgpt: 動態產生 rwd svg path
// function drawDiagonalLineAndGetPoint() {
//   const svg = document.getElementById('mySvg');
//   const path = document.getElementById('myPath');

//   const width = window.innerWidth;
//   const height = window.innerHeight;

//   // 設定 viewBox 以配合實際大小
//   svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

//   // 劃出左上到右下的斜線
//   const d = `M0 0 L${width} ${height}`;
//   path.setAttribute('d', d);

//   // 取得路徑總長度
//   const length = path.getTotalLength();

//   // 假設想要斜線上中間的點（50%）
//   const middlePoint = path.getPointAtLength(length / 2);
//   console.log('Midpoint:', middlePoint);
// }

// window.addEventListener('load', drawDiagonalLineAndGetPoint);
// window.addEventListener('resize', drawDiagonalLineAndGetPoint);
</script>

<template>
  <div class="relative w-full h-screen">
    <svg
      ref="svgEl"
      class="l-svg-animate-path w-full h-full"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    />
    <div
      ref="blueEl"
      class="absolute top-0 left-0 w-[100px] h-[100px] bg-blue-300"
    ></div>
    <div
      ref="greenEl"
      class="absolute top-0 left-0 w-[100px] h-[100px] bg-green-300"
    ></div>
  </div>
</template>

<style lang="scss">
.l-svg-animate-path {
  path {
    fill: none;
    stroke: black;
  }
}
</style>
