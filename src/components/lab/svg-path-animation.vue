<script setup lang="ts">
// TODO
// 1. enter intro viewport, animate svg path
// 2. leave intro viewport and enter article viewport, stop animation and move into article

import { onMounted, ref } from 'vue';

const svgEl = ref<SVGSVGElement | null>(null);
const path1El = ref<SVGPathElement | null>(null);
const path2El = ref<SVGPathElement | null>(null);
const blueEl = ref<HTMLDivElement | null>(null);
const greenEl = ref<HTMLDivElement | null>(null);

const DURATION = 40000;

onMounted(() => {
  const animation = useAnimation();
  animation.drawLines().run(DURATION);
});

function useAnimation() {
  return {
    drawLines() {
      if (!svgEl.value || !path1El.value || !path2El.value) {
        console.error('SVG or path element not found');
        return this;
      }

      const svg = svgEl.value;
      const width = window.innerWidth;
      const height = window.innerHeight;
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

      // 產生不規則路徑
      function randomPath(startX: number, startY: number) {
        let d = `M${startX} ${startY}`;
        for (let i = 0; i < 4; i++) {
          d += ` Q${Math.random() * width} ${Math.random() * height},${Math.random() * width} ${Math.random() * height}`;
        }
        return d;
      }

      path1El.value.setAttribute('d', randomPath(0, 0));
      path2El.value.setAttribute('d', randomPath(width, 0));

      return this;
    },

    run(customDuration: number) {
      if (!path1El.value || !path2El.value || !blueEl.value || !greenEl.value) {
        console.error('SVG or path element not found');
        return this;
      }

      const duration = customDuration;
      const path1 = path1El.value;
      const path2 = path2El.value;
      const length1 = path1.getTotalLength();
      const length2 = path2.getTotalLength();
      let start: number | null = null;
      let ticking = false;

      const animate = (timestamp: number) => {
        if (ticking) return;
        if (start === null) start = timestamp;
        ticking = true;

        const currentTime = timestamp - start;
        const progress = Math.min(currentTime / duration, 1);

        const point1 = path1.getPointAtLength(progress * length1);
        const point2 = path2.getPointAtLength(progress * length2);

        if (blueEl.value) {
          blueEl.value.style.transform = `translate(${point1.x}px, ${point1.y}px)`;
        }
        if (greenEl.value) {
          greenEl.value.style.transform = `translate(${point2.x}px, ${point2.y}px)`;
        }

        if (progress >= 1) {
          start = null;
          setTimeout(() => {
            ticking = false;
            requestAnimationFrame(animate);
          }, 500);
          return;
        }

        ticking = false;
        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
      return this;
    },
  };
}

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
    >
      <path ref="path1El" />
      <path ref="path2El" />
    </svg>
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
