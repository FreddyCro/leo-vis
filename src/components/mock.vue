<script setup lang="ts">
defineProps<{
  title?: boolean;
  caption?: boolean;
}>();
</script>

<template>
  <div class="my-10">
    <!-- title -->
    <div v-if="title">Chart title</div>

    <!-- chart -->
    <div
      class="w-[640px] h-[360px] bg-gray-200 flex items-center justify-center"
    >
      Chart
    </div>

    <!-- caption -->
    <div v-if="caption">Chart caption</div>
  </div>
</template>
