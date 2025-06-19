<script lang="ts" setup>
import { defineEmits, ref, watch } from 'vue';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'open'): void;
  (e: 'close'): void;
  (e: 'update:modelValue', value: boolean): void;
}>();

const visible = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    visible.value = val;
    if (val) emit('open');
  },
);

function handleClose() {
  visible.value = false;
  emit('update:modelValue', false);
  emit('close');
}
</script>

<template>
  <div v-if="visible" class="leo-dialog-backdrop" @click.self="handleClose">
    <div class="leo-dialog">
      <button class="leo-dialog__close" @click="handleClose">×</button>
      <div class="leo-dialog__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.leo-dialog-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow: auto;
}

.leo-dialog {
  background: #fff;
  border-radius: 8px;
  min-width: 320px;
  max-width: 90vw;
  min-height: 120px;
  max-height: 90vh;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
  position: relative;
  display: flex;
  flex-direction: column;
}

.leo-dialog__close {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.leo-dialog__content {
  padding: 32px 24px 24px 24px;
  overflow: visible;
  flex: 1 1 auto;
}
</style>
