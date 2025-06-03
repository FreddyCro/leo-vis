<script setup>
import { onMounted, onUnmounted } from 'vue';
import ThreeGlobe from 'three-globe';
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js?external=three';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js?external=three';

const MOON_IMG_PATH = './img/moon_4k.jpg';
const MOON_STATION_DATA = [
  { lat: 29.1, lng: 0 },
  { lat: 7.08, lng: -64.37 },
  { lat: 18.87, lng: -62.05 },
  { lat: -0.5137, lng: 56.3638 },
  { lat: 38.23, lng: -35 },
  { lat: 3.78, lng: 56.62 },
  { lat: 25.99, lng: 30.4 },
  { lat: 12.66, lng: 62.15 },
  { lat: 12.71, lng: 62.21 },
  { lat: -10.7, lng: -20.67 }, // 339.33 - 360 = -20.67
  { lat: 2.43, lng: 24.38 },
  { lat: -12.82, lng: -2.39 }, // 357.61 - 360 = -2.39
  { lat: -2.47, lng: -43.34 }, // 316.66 - 360 = -43.34
  { lat: -3.01, lng: -23.41 }, // 336.59 - 360 = -23.41
  { lat: 1.45, lng: 23.19 },
  { lat: 0.47, lng: -1.43 }, // 358.57 - 360 = -1.43
  { lat: -40.98, lng: -11.51 },
  { lat: 0.674, lng: 23.473 },
  { lat: -3.012, lng: -23.421 },
  { lat: -3.645, lng: -17.471 },
  { lat: 26.132, lng: 3.633 },
  { lat: -9.0, lng: 15.5 },
  { lat: 20.191, lng: 30.772 },
  { lat: 44.12, lng: -19.51 },
  { lat: -45.5, lng: 177.6 },
  { lat: 43.1, lng: -51.8 },
  { lat: -41.63, lng: -153.98 },
  { lat: -69.37, lng: 32.32 },
  { lat: -13.31, lng: 25.25 },
  { lat: -80.13, lng: 1.44 },
  { lat: 18.56, lng: 61.81 },
  { lat: -84.79, lng: 29.19 },
];
let Globe = null;

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
  const markerSvg = `<svg viewBox="-4 0 36 36">
      <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
      <circle fill="black" cx="14" cy="14" r="7"></circle>
    </svg>`;

  const gData = MOON_STATION_DATA.map((e) => {
    const [lat, lng] = convertMoonLatLngToGlobe(e.lat, e.lng);

    return {
      lat,
      lng,
      size: 10,
      // lat: (Math.random() - 0.5) * 180,
      // lng: (Math.random() - 0.5) * 360,
      // size: 7 + Math.random() * 30,
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
      el.innerHTML = markerSvg;
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
  const camera = new THREE.PerspectiveCamera();
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  camera.position.z = 500;

  // Add camera controls
  const tbControls = new TrackballControls(camera, renderers[0].domElement);
  tbControls.minDistance = 101;
  tbControls.rotateSpeed = 1;
  tbControls.zoomSpeed = 0.8;
  tbControls.noZoom = true;
  // tbControls.noPan = false;
  // tbControls.enabled = false;

  // Update pov when camera moves
  Globe.setPointOfView(camera);
  tbControls.addEventListener('change', () => Globe.setPointOfView(camera));

  // Kick-off renderers
  (function animate() {
    // IIFE
    // Frame cycle
    tbControls.update();
    renderers.forEach((r) => r.render(scene, camera));
    requestAnimationFrame(animate);
  })();
}

function handleScroll() {
  Globe.rotation.y += 0.01;
  Globe.rotation.x += 0.0025;
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
  <div id="moonViz"></div>
</template>

<style scoped>
#moonViz {
  position: relative;
  width: 100%;
  height: 100vh;
}
</style>
