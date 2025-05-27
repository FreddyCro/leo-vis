<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';

const wrap = ref<HTMLElement | null>(null);
const playerRef = ref(null);

// ref: https://developers.lottiefiles.com/docs/dotlottie-player/dotlottie-web/methods/
// setFrame

onMounted(() => {
  if (playerRef.value) {
    // const dotLottie = playerRef.value.getDotLottieInstance();
    // dotLottie.addEventListener('pause', () => {
    //   console.log('paused');
    // });
    // dotLottie.addEventListener('frame', ({ currentFrame }) => {
    //   console.log('Frame:', currentFrame);
    // });
    // pause
    // setTimeout(() => {
    //   dotLottie.pause();
    //   console.log('paused');
    // }, 3000);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// get scroll position by wrap and set frame
function handleScroll() {
  if (wrap.value && playerRef.value) {
    const { y, height } = wrap.value.getBoundingClientRect();

    if (y > 0) return;

    const percent = Math.abs(y) / (height * 0.67);

    const dotLottie = playerRef.value.getDotLottieInstance();
    const allFrame = dotLottie.totalFrames;
    const frame = Math.floor(allFrame * percent);
    dotLottie.setFrame(frame);
  }
}
</script>

<template>
  <div ref="wrap" class="relative w-full h-[400vh] flex">
    <div
      class="absolute top-0 left-0 w-full h-full bg-linear-to-b from-cyan-100 to-blue-800"
    />
    <div class="w-full p-5">
      <div class="sticky top-0 h-screen flex items-center justify-center">
        <DotLottieVue
          ref="playerRef"
          style="height: 100px; width: 100px"
          src="https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie"
        />
      </div>
    </div>
  </div>
</template>
