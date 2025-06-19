<script setup lang="ts">
import { computed, ref, watch } from 'vue';

interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string;
}

const props = defineProps<{
  labels: string[];
  dataset: Dataset[];
}>();

// 計算最大值，確保所有 bar 依比例顯示
const maxValue = computed(() => {
  return Math.max(...props.dataset.flatMap((ds) => ds.data));
});

// 用於觸發動畫：bar 高度/寬度
const animatedData = ref(props.dataset.map((ds) => [...ds.data]));

watch(
  () => props.dataset.map((ds) => ds.data),
  (newData) => {
    // 逐步更新 animatedData 以觸發 transition
    animatedData.value = newData.map((arr) => [...arr]);
  },
  { deep: true },
);

function barStyle(ds: Dataset, i: number) {
  const value = ds.data[i];
  const percent = maxValue.value ? (value / maxValue.value) * 100 : 0;
  return {
    height: `${percent}%`,
    backgroundColor: ds.backgroundColor,
    transition: 'height 0.6s cubic-bezier(.4,2,.6,1)',
  };
}
</script>

<template>
  <div class="leo-bar-chart">
    <div class="leo-bar-chart__bars">
      <div class="leo-bar-chart__x-axis">
        <div
          v-for="(label, i) in labels"
          :key="label"
          class="leo-bar-chart__x-group"
        >
          <div class="leo-bar-chart__bars-group">
            <div
              v-for="ds in dataset"
              :key="ds.label"
              class="leo-bar-chart__bar-wrapper"
            >
              <div
                class="leo-bar-chart__bar"
                :style="barStyle(ds, i)"
                :aria-label="`${ds.label}: ${ds.data[i]}`"
              >
                <span class="leo-bar-chart__bar-value">{{ ds.data[i] }}</span>
              </div>
            </div>
          </div>
          <div class="leo-bar-chart__x-label">{{ label }}</div>
        </div>
      </div>
    </div>
    <div class="leo-bar-chart__legend">
      <div
        v-for="ds in dataset"
        :key="ds.label"
        class="leo-bar-chart__legend-item"
      >
        <span
          class="leo-bar-chart__legend-color"
          :style="{ backgroundColor: ds.backgroundColor }"
        ></span>
        <span class="leo-bar-chart__legend-label">{{ ds.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.leo-bar-chart {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  font-family: inherit;
}
.leo-bar-chart__bars {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 260px;
  padding-bottom: 24px;
}
.leo-bar-chart__x-axis {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 220px;
  width: 100%;
}
.leo-bar-chart__x-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 0;
  min-width: 0;
}
.leo-bar-chart__bars-group {
  display: flex;
  gap: 8px;
  align-items: flex-end;
  height: 100%;
}
.leo-bar-chart__bar-wrapper {
  display: flex;
  align-items: flex-end;
  width: 28px;
}
.leo-bar-chart__bar {
  width: 100%;
  min-height: 4px;
  border-radius: 4px 4px 0 0;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: height 0.6s cubic-bezier(0.4, 2, 0.6, 1);
}
.leo-bar-chart__bar-value {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-4px);
  font-size: 12px;
  color: #333;
  white-space: nowrap;
  pointer-events: none;
}
.leo-bar-chart__x-label {
  margin-top: 8px;
  font-size: 14px;
  color: #666;
  text-align: center;
}
.leo-bar-chart__legend {
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
}
.leo-bar-chart__legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}
.leo-bar-chart__legend-color {
  width: 16px;
  height: 16px;
  border-radius: 3px;
  display: inline-block;
  margin-right: 2px;
  border: 1px solid #eee;
}
</style>
