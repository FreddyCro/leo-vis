<script setup>
import { computed } from 'vue';

const props = defineProps({
  id: {
    type: String,
  },
  classname: {
    type: String,
  },
  src: {
    type: String,
    required: true,
  },
  srcset: {
    type: Array,
    default: () => ['mob', 'pad', 'pc'],
  },
  default: {
    type: String,
    default: 'pc',
  },
  ext: {
    type: String,
    default: 'jpg',
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  alt: {
    type: String,
  },
  altby: {
    type: String,
  },
  loading: {
    type: String,
    default: 'eager',
    // default: 'lazy',
  },
  use2x: {
    type: Boolean,
    default: true,
  },
  usePrefix: {
    type: Boolean,
    default: true,
  },
  webp: {
    type: Boolean,
    default: false,
  },
});

const { VITE_ASSETS_PATH } = import.meta.env;

const parsedMedia = computed(() => {
  if (!props.srcset) return;
  if (props.srcset.length === 0) return;

  const media = [];

  if (props.srcset.includes('pc')) {
    media.push('(min-width: 1280px)');
  }

  if (props.srcset.includes('pad')) {
    media.push('(min-width: 768px)');
  }

  if (props.srcset.includes('mob')) {
    media.push('');
  }

  return media;
});

const parsedSrcset = computed(() => {
  if (!props.srcset) return;
  if (props.srcset.length === 0) return;

  return handleImage({
    src: props.src,
    srcset: props.srcset,
    ext: props.ext,
    use2x: props.use2x,
    usePrefix: props.usePrefix,
  });
});

const parsedWebpSrcset = computed(() => {
  if (!props.webp) return;
  if (!props.srcset) return;
  if (props.srcset.length === 0) return;

  return handleImage({
    src: props.src,
    srcset: props.srcset,
    ext: 'webp',
    use2x: props.use2x,
    usePrefix: props.usePrefix,
  });
});

const parsedDefault = computed(() => {
  if (props.default === 'pc')
    return `${VITE_ASSETS_PATH}${props.src}_pc.${props.ext}`;
  if (props.default === 'pad')
    return `${VITE_ASSETS_PATH}${props.src}_pad.${props.ext}`;
  if (props.default === 'mob')
    return `${VITE_ASSETS_PATH}${props.src}_mob.${props.ext}`;
  return `${VITE_ASSETS_PATH}${props.src}.${props.ext}`;
});

function handleImage({ src, srcset, ext, use2x, usePrefix }) {
  // console.log(src, srcset, ext);
  if (!srcset) return;
  if (srcset.length === 0) return;

  const srcsetList = [];

  if (srcset.includes('pc')) {
    let pc = `${VITE_ASSETS_PATH}${src}${usePrefix ? '_pc' : ''}.${ext} 1x`;

    if (use2x) {
      pc += `, ${VITE_ASSETS_PATH}${src}${usePrefix ? '_pc' : ''}@2x.${ext} 2x`;
    }

    srcsetList.push(pc);
  }

  if (srcset.includes('pad')) {
    let pad = `${VITE_ASSETS_PATH}${src}${usePrefix ? '_pad' : ''}.${ext} 1x`;

    if (use2x) {
      pad += `, ${VITE_ASSETS_PATH}${src}${
        usePrefix ? '_pad' : ''
      }@2x.${ext} 2x`;
    }

    srcsetList.push(pad);
  }

  if (srcset.includes('mob')) {
    let mob = `${VITE_ASSETS_PATH}${src}${usePrefix ? '_mob' : ''}.${ext} 1x`;

    if (use2x) {
      mob += `, ${VITE_ASSETS_PATH}${src}${
        usePrefix ? '_mob' : ''
      }@2x.${ext} 2x`;
    }

    srcsetList.push(mob);
  }

  return srcsetList;
}
</script>

<template>
  <picture class="leo-pic">
    <template v-for="(media, index) in parsedMedia">
      <source
        v-if="webp"
        :key="`webp-${media}`"
        :media="media"
        :srcset="parsedWebpSrcset[index]"
        type="image/webp"
      />
      <source
        v-if="srcset.length > 0"
        :key="`normal-${media}`"
        :media="media"
        :srcset="parsedSrcset[index]"
      />
    </template>
    <img
      class="leo-pic-img"
      :class="classname || ''"
      :src="parsedDefault"
      :alt="alt"
      :aria-labelledby="altby"
      :loading="loading"
    />
  </picture>
</template>

<style lang="scss">
.leo-pic-img {
  width: 100%;
  height: auto;
  pointer-events: none;
}
</style>
