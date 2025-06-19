<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { getDeviceTypeByResolution } from '@/utils/get-device';

defineProps({
  isIntersecting: {
    type: Boolean,
    default: false,
  },
});

const deviceType = ref(getDeviceTypeByResolution());

function handleResize() {
  deviceType.value = getDeviceTypeByResolution();
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div v-if="deviceType === 'mobile'">Mobile Device</div>
  <div v-else-if="deviceType === 'tablet'">Tablet Device</div>
  <div v-else>Desktop Device</div>
</template>

<style lang="scss"></style>
