<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
const playerRef = ref(null);

// ref: https://developers.lottiefiles.com/docs/dotlottie-player/dotlottie-web/methods/
// setFrame

onMounted(() => {
  if (playerRef.value) {
    const dotLottie = playerRef.value.getDotLottieInstance();
    dotLottie.addEventListener('pause', () => {
      console.log('paused');
    });

    dotLottie.addEventListener('frame', ({ currentFrame }) => {
      console.log('Frame:', currentFrame);
    });

    setTimeout(() => {
      // pause
      dotLottie.pause();
      console.log('paused');
    }, 3000);
  }
});
</script>

<template>
  <DotLottieVue
    ref="playerRef"
    style="height: 100px; width: 100px"
    autoplay
    loop
    src="https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie"
  />
</template>
