<!-- ref: https://github.com/vasturiano/three-globe/blob/master/example/custom/index.html -->
<script setup>
import { onMounted, onUnmounted } from 'vue';
import ThreeGlobe from 'three-globe';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js?external=three';
import MOON_STATION_DATA from '@/assets/json/moon-stations.json';

const MOON_IMG_PATH = './img/moon_4k.jpg';

let Globe = null;
let camera = null;
let controls = null;

onMounted(() => {
  initMoon();
  // Handle scroll events
  window.addEventListener('scroll', handleScroll);
  // Handle resize events
  // window.addEventListener('resize', () => {
  //   const renderers = document.querySelectorAll(
  //     '#moonViz canvas, #moonViz .css2d',
  //   );
  //   renderers.forEach((r) => {
  //     r.style.width = `${window.innerWidth}px`;
  //     r.style.height = `${window.innerHeight}px`;
  //   });
  // });
});

onUnmounted(() => {
  // Remove scroll event listener
  window.removeEventListener('scroll', handleScroll);
  // Remove resize event listener
  // window.removeEventListener('resize', () => {});
});

function initMoon() {
  const gData = MOON_STATION_DATA.map((e) => {
    const [lat, lng] = convertMoonLatLngToGlobe(e.lat, e.lng);

    return {
      lat,
      lng,
      // lat: (Math.random() - 0.5) * 180,
      // lng: (Math.random() - 0.5) * 360,
      size: 10,
      color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
    };
  });

  Globe = new ThreeGlobe()
    .globeImageUrl(MOON_IMG_PATH)
    // .globeImageUrl(
    //   '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg',
    // )
    // .bumpImageUrl(
    //   '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png',
    // )
    .htmlElementsData(gData)
    .htmlElement((d) => {
      const el = document.createElement('div');
      el.innerHTML = stationMarkSVG();
      el.style.color = d.color;
      el.style.width = `${d.size}px`;
      el.style.transition = 'opacity 250ms';
      return el;
    })
    .htmlElementVisibilityModifier(
      (el, isVisible) => (el.style.opacity = isVisible ? 1 : 0),
    );

  // Setup renderers
  const renderers = [new THREE.WebGLRenderer(), new CSS2DRenderer()];
  renderers.forEach((r, idx) => {
    r.setSize(window.innerWidth, window.innerHeight);
    if (idx > 0) {
      // overlay additional on top of main renderer
      r.domElement.style.position = 'absolute';
      r.domElement.style.top = '0px';
      r.domElement.style.pointerEvents = 'none';
    }
    document.getElementById('moonViz').appendChild(r.domElement);
  });

  // Setup scene
  const scene = new THREE.Scene();
  scene.add(Globe);
  scene.add(new THREE.AmbientLight(0xcccccc, Math.PI));
  scene.add(new THREE.DirectionalLight(0xffffff, 0.6 * Math.PI));

  // Setup camera
  camera = new THREE.PerspectiveCamera();
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  camera.position.z = 500;

  // 初始化 OrbitControls
  controls = new OrbitControls(camera, renderers[0].domElement);

  // 最小距離限制（與 minDistance 類似）
  controls.minDistance = 101;

  // 控制速度（OrbitControls 沒有 rotateSpeed / zoomSpeed 直接支援，但可以用 damping 來達到類似效果）
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;

  // 禁用縮放
  controls.enableZoom = false;

  // 禁用平移（與 noPan 類似）
  controls.enablePan = false;

  // Update pov when camera moves
  Globe.setPointOfView(camera);
  controls.addEventListener('change', () => Globe.setPointOfView(camera));

  // Kick-off renderers
  (function animate() {
    // Frame cycle
    controls.update();
    renderers.forEach((r) => r.render(scene, camera));
    requestAnimationFrame(animate);
  })();
}

function handleScroll() {
  Globe.rotation.y += 0.01;
  Globe.rotation.x += 0.0025;
  Globe.setPointOfView(camera);
}

function stationMarkSVG(color = 'currentColor') {
  return `<svg viewBox="-4 0 36 36">
      <circle cx="12" cy="12" r="12" fill="${color}" />
    </svg>`;
}

function convertMoonLatLngToGlobe(lat, lng) {
  // 預設將月球本初子午線旋轉至對齊地球的本初子午線
  // 這個 offset 可以根據 IAU 的月球旋轉定義來抓（約 3~5° 差異）
  const lngOffset = -21; // 模擬值，根據月球本初子午線與地球差異調整
  let adjLng = lng + lngOffset;

  // 保證經度在 -180~180 之間
  if (adjLng > 180) adjLng -= 360;
  if (adjLng < -180) adjLng += 360;

  return [lat, adjLng];
}
</script>

<template>
  <div id="moonViz" />
</template>

<style scoped>
#moonViz {
  position: relative;
  width: 100%;
  height: 100vh;
}
</style>
