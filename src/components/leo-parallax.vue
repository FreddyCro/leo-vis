<script setup lang="ts">
// emit to callback scroll event
</script>

<template>
  <div>
    <!-- background -->

    <!-- foreground -->
  </div>
</template>

<style scoped></style>

<!-- https://codepen.io/PointC/pen/PoWBYXm
https://codepen.io/benfrain/pen/yLqyKOo
https://benfrain.com/how-to-animate-along-an-svg-path-at-the-same-time-the-path-animates/
用 animateMotion 裡面放 img? -->

<!-- getPointAtLength -->
<!-- https://codepen.io/nirjan_dev/pen/vYEmpgb -->

<!-- chatgpt: 動態產生 rwd svg path -->
<!-- function drawDiagonalLineAndGetPoint() {
  const svg = document.getElementById("mySvg");
  const path = document.getElementById("myPath");

  const width = window.innerWidth;
  const height = window.innerHeight;

  // 設定 viewBox 以配合實際大小
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  // 劃出左上到右下的斜線
  const d = `M0 0 L${width} ${height}`;
  path.setAttribute("d", d);

  // 取得路徑總長度
  const length = path.getTotalLength();

  // 假設想要斜線上中間的點（50%）
  const middlePoint = path.getPointAtLength(length / 2);
  console.log("Midpoint:", middlePoint);
}

window.addEventListener("load", drawDiagonalLineAndGetPoint);
window.addEventListener("resize", drawDiagonalLineAndGetPoint); -->
