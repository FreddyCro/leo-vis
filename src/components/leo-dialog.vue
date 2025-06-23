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
  async (val) => {
    if (val) {
      visible.value = true;
      await nextTick();
      dialogTransition.value = true;

      // scroll down 1px from current scroll position
      const scrollY = window.scrollY;
      window.scrollTo(0, scrollY + 1);

      setTimeout(() => {
        setBodyOverflowHidden();
        emit('open');
      }, 10);
    } else {
      dialogTransition.value = false;

      setTimeout(() => {
        visible.value = false;
        resetBodyOverflow();
        emit('close');
      }, 250); // match fade duration
    }
  },
  { immediate: true },
);

onMounted(() => {
  if (visible.value) setBodyOverflowHidden();
});

onBeforeUnmount(() => {
  resetBodyOverflow();
});

function setBodyOverflowHidden() {
  const scrollbarWidth = getScrollbarWidth();
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${scrollbarWidth}px`;
}

function resetBodyOverflow() {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
}

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
        <button class="leo-dialog__close" @click="handleClose">
          <svg
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16.5" cy="16.5" r="16" stroke="#404040" />
            <path d="M21.5 12L12 21.5" stroke="#404040" />
            <path d="M12 12L21.5 21.5" stroke="#404040" />
          </svg>
        </button>
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
  overflow: hidden;
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
