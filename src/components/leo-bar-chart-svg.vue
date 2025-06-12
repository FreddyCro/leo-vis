<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

interface BarChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

interface Options {
  width: number;
  height: number;
  barHeight: number;
  barGap: number;
  labelWidth: number;
}

interface Props {
  data: BarChartData;
  options?: Options;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => ({
    width: 320,
    height: 120,
    barHeight: 24,
    barGap: 18,
    labelWidth: 48,
  }),
});

// 常數設定
const DEFAULT_WIDTH = 320;
const DEFAULT_HEIGHT = 120;
const DEFAULT_BAR_HEIGHT = 24;
const DEFAULT_BAR_GAP = 18;
const DEFAULT_LABEL_WIDTH = 48;
const FONT_SIZE = 13;
const LABEL_DY = 6;
const VALUE_MIN_WIDTH = 24;
const FONT_COLOR = '#fff';

// 計算每個 bar 的總值
const totals = computed(() =>
  props.data.labels.map((_, i) =>
    props.data.datasets.reduce((sum, ds) => sum + (ds.data[i] || 0), 0),
  ),
);

// 最大總值，用於 bar 長度比例
const maxTotal = computed(() => Math.max(...totals.value, 1));

// 響應式尺寸
const containerRef = ref<HTMLDivElement | null>(null);
const svgWidth = ref(props.options.width ?? DEFAULT_WIDTH);
const svgHeight = ref(props.options.height ?? DEFAULT_HEIGHT);

function updateSize() {
  if (containerRef.value) {
    svgWidth.value = containerRef.value.clientWidth || DEFAULT_WIDTH;
    svgHeight.value = containerRef.value.clientHeight || DEFAULT_HEIGHT;
  }
}

onMounted(() => {
  updateSize();
  window.addEventListener('resize', updateSize);
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateSize);
});

// 取得 options，帶入 fallback 與響應式尺寸
const chartOptions = computed(() => ({
  width: svgWidth.value,
  height: svgHeight.value,
  barHeight: props.options.barHeight ?? DEFAULT_BAR_HEIGHT,
  barGap: props.options.barGap ?? DEFAULT_BAR_GAP,
  labelWidth: props.options.labelWidth ?? DEFAULT_LABEL_WIDTH,
}));

function getStackOffset(rowIdx: number, dsIdx: number) {
  const { datasets } = props.data;
  const { width, labelWidth } = chartOptions.value;
  let sum = 0;
  for (let i = 0; i < dsIdx; i++) {
    sum += datasets[i].data[rowIdx] || 0;
  }
  return (sum / maxTotal.value) * (width - labelWidth);
}

function getStackWidth(rowIdx: number, dsIdx: number) {
  const { datasets } = props.data;
  const { width, labelWidth } = chartOptions.value;
  const value = datasets[dsIdx].data[rowIdx] || 0;
  return (value / maxTotal.value) * (width - labelWidth);
}
</script>

<template>
  <div ref="containerRef" class="l-barchart">
    <svg
      :width="chartOptions.width"
      :height="chartOptions.height"
      :viewBox="`0 0 ${chartOptions.width} ${chartOptions.height}`"
      style="width: 100%; height: 100%"
    >
      <g
        v-for="(label, rowIdx) in data.labels"
        :key="rowIdx"
        :transform="`translate(0, ${rowIdx * (chartOptions.barHeight + chartOptions.barGap)})`"
      >
        <!-- 左側 label -->
        <text
          :x="0"
          :y="chartOptions.barHeight / 2"
          :dy="LABEL_DY"
          text-anchor="start"
          :font-size="FONT_SIZE"
          :fill="FONT_COLOR"
        >
          {{ label }}
        </text>
        <!-- 堆疊 bar -->
        <g>
          <template v-for="(ds, dsIdx) in data.datasets" :key="dsIdx">
            <rect
              :x="chartOptions.labelWidth + getStackOffset(rowIdx, dsIdx)"
              y="0"
              :width="getStackWidth(rowIdx, dsIdx)"
              :height="chartOptions.barHeight"
              :fill="ds.backgroundColor"
              class="bar"
            />
            <!-- 數值 -->
            <text
              v-if="getStackWidth(rowIdx, dsIdx) > VALUE_MIN_WIDTH"
              :x="
                chartOptions.labelWidth +
                getStackOffset(rowIdx, dsIdx) +
                getStackWidth(rowIdx, dsIdx) / 2
              "
              :y="chartOptions.barHeight / 2"
              text-anchor="middle"
              alignment-baseline="middle"
              :font-size="FONT_SIZE"
              :fill="FONT_COLOR"
              font-weight="bold"
            >
              {{ ds.data[rowIdx] }}
            </text>
          </template>
        </g>
      </g>
    </svg>
  </div>
</template>

<style lang="scss">
.l-barchart {
  width: 100%;
  height: 100%;
  background: transparent;

  .bar {
    transition:
      x 0.5s cubic-bezier(0.4, 0, 0.2, 1),
      width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
}
</style>
