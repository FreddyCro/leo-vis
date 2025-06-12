<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

interface BarSegment {
  value: number;
  color: string;
}

interface DatasetItem {
  label: string;
  segments: BarSegment[];
}

interface Options {
  width: number;
  height: number;
  barHeight: number;
  barGap: number;
  labelWidth: number;
}

interface Props {
  datasets: DatasetItem[];
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
const VALUE_MIN_WIDTH = 24;
const FONT_COLOR = '#fff';

// 本地 reactive 狀態，控制顯示用 datasets
const displayedDatasets = ref<DatasetItem[]>([...props.datasets]);

// 監聽 props.datasets 變化，平滑過渡
watch(
  () => props.datasets,
  (newVal) => {
    // 用深拷貝確保 reactivity
    displayedDatasets.value = newVal.map((row) => ({
      label: row.label,
      segments: row.segments.map((seg) => ({ ...seg })),
    }));
  },
  { deep: true },
);

// 計算每 row 的總值
const rowTotals = computed(() =>
  displayedDatasets.value.map((row) =>
    row.segments.reduce((sum, seg) => sum + seg.value, 0),
  ),
);
// 最大總值，用於 bar 長度比例
const maxTotal = computed(() => Math.max(...rowTotals.value, 1));

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

function getSegmentWidth(seg: BarSegment) {
  const { width, labelWidth } = chartOptions.value;
  return (seg.value / maxTotal.value) * (width - labelWidth);
}
</script>

<template>
  <div ref="containerRef" class="l-barchart">
    <div
      v-for="row in displayedDatasets"
      :key="row.label"
      class="bar-row"
      :style="{
        height: `${chartOptions.barHeight}px`,
        marginBottom: `${chartOptions.barGap}px`,
      }"
    >
      <!-- 左側 label -->
      <div
        class="bar-label"
        :style="{
          width: `${chartOptions.labelWidth}px`,
          fontSize: `${FONT_SIZE}px`,
          color: FONT_COLOR,
        }"
      >
        {{ row.label }}
      </div>
      <!-- bar (stacked segments) -->
      <div class="bar-stack" :style="{ height: `${chartOptions.barHeight}px` }">
        <template
          v-for="seg in row.segments"
          :key="`${seg.color}-${seg.value}`"
        >
          <div
            class="bar-segment"
            :style="{
              width: `${getSegmentWidth(seg)}px`,
              backgroundColor: seg.color,
              height: `${chartOptions.barHeight}px`,
              display: getSegmentWidth(seg) > 0 ? 'inline-block' : 'none',
            }"
          >
            <span
              v-if="getSegmentWidth(seg) > VALUE_MIN_WIDTH"
              class="bar-value"
              :style="{ fontSize: `${FONT_SIZE}px`, color: FONT_COLOR }"
            >
              {{ seg.value }}
            </span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.l-barchart {
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .bar-row {
    display: flex;
    align-items: center;
    width: 100%;
    min-width: 0;
  }
  .bar-label {
    flex: 0 0 auto;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 8px;
  }
  .bar-stack {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1 1 0%;
    min-width: 0;
    position: relative;
    height: 100%;
    background: none;
  }
  .bar-segment {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    min-width: 0;
    overflow: hidden;
  }
  .bar-value {
    font-weight: bold;
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
  }
}
</style>
