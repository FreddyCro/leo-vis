<script lang="ts" setup>
import {
  defineEmits,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue';
import { getScrollbarWidth } from '@/utils/get-scrollbar-width';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'open'): void;
  (e: 'close'): void;
  (e: 'update:modelValue', value: boolean): void;
}>();

const visible = ref(props.modelValue);
const dialogTransition = ref(false);

watch(
  () => props.modelValue,
  (val) => {
    visible.value = val;
    if (val) emit('open');
  },
);

function setBodyOverflowHidden() {
  const scrollbarWidth = getScrollbarWidth();
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${scrollbarWidth}px`;
}

function resetBodyOverflow() {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
}

watch(
  () => visible.value,
  (val) => {
    if (val) {
      setBodyOverflowHidden();
    } else {
      resetBodyOverflow();
    }
  },
);

onMounted(() => {
  if (visible.value) setBodyOverflowHidden();
});

onBeforeUnmount(() => {
  resetBodyOverflow();
});

watch(
  () => props.modelValue,
  async (val) => {
    if (val) {
      visible.value = true;
      await nextTick();
      dialogTransition.value = true;
      emit('open');
    } else {
      dialogTransition.value = false;
      setTimeout(() => {
        visible.value = false;
        emit('close');
      }, 250); // match fade duration
    }
  },
  { immediate: true },
);

function handleClose() {
  emit('update:modelValue', false);
}
</script>

<template>
  <transition
    name="fade"
    @before-enter="(el) => ((el as HTMLElement).style.display = 'flex')"
    @leave="(el) => ((el as HTMLElement).style.display = 'none')"
  >
    <div v-if="visible" class="leo-dialog-backdrop" @click.self="handleClose">
      <div class="leo-dialog">
        <button class="leo-dialog__close" @click="handleClose">×</button>
        <div class="leo-dialog__content">
          <slot />
        </div>
      </div>
    </div>
  </transition>
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
  position: relative;
  min-width: 320px;
  max-width: 90vw;
  min-height: 120px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  padding-top: 32px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
}

.leo-dialog__close {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #000;
  cursor: pointer;
}

.leo-dialog__content {
  padding: 32px 24px 24px 24px;
  overflow: auto;
  overflow-x: auto;
  flex: 1 1 auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
