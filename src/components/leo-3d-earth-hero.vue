<script setup>
import { onMounted } from 'vue';
import ThreeGlobe from 'three-globe';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

onMounted(() => {
  // Gen random data
  const N = 500;

  const arcsData = [...Array(N).keys()].map(() => ({
    startLat: (Math.random() - 0.5) * 180,
    startLng: (Math.random() - 0.5) * 360,
    endLat: (Math.random() - 0.5) * 180,
    endLng: (Math.random() - 0.5) * 360,
    color: ['red', 'white', 'blue', 'green'][Math.floor(Math.random() * 4)],
  }));

  const Globe = new ThreeGlobe()
    .globeImageUrl(
      '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg',
    )
    .arcsData(arcsData)
    .arcColor('color')
    .arcAltitude(0.2)
    .arcAltitudeAutoScale(1)
    .arcDashLength(0.3)
    .arcDashGap(4)
    .arcDashInitialGap(() => Math.random() * 5)
    .arcDashAnimateTime(2000);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('globeViz').appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.add(Globe);
  scene.add(new THREE.AmbientLight(0xcccccc, Math.PI));
  scene.add(new THREE.DirectionalLight(0xffffff, 0.6 * Math.PI));

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 0, 500);

  // ✅ 使用 OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.rotateSpeed = 1;
  controls.zoomSpeed = 100;
  controls.minDistance = 150;
  controls.maxDistance = 800;
  controls.enablePan = false; // 建議禁用平移以避免破壞視角

  // 渲染迴圈
  function animate() {
    requestAnimationFrame(animate);
    controls.target.x += 0.5;
    camera.translateZ(-3);
    controls.update(); // ✅ 必須呼叫以啟用 damping
    renderer.render(scene, camera);
  }
  animate();

  // 如果需要，可以添加事件監聽器來調整大小
  // window.addEventListener('resize', () => {
  //   camera.aspect = window.innerWidth / window.innerHeight;
  //   camera.updateProjectionMatrix();
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  // });
});
</script>

<template>
  <div id="globeViz"></div>
</template>

<!-- <script setup>
import { onMounted } from 'vue';
import ThreeGlobe from 'three-globe';
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js?external=three';

onMounted(() => {
  // Gen random data
  const N = 500;

  const arcsData = [...Array(N).keys()].map(() => ({
    startLat: (Math.random() - 0.5) * 180,
    startLng: (Math.random() - 0.5) * 360,
    endLat: (Math.random() - 0.5) * 180,
    endLng: (Math.random() - 0.5) * 360,
    color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
  }));

  const Globe = new ThreeGlobe()
    .globeImageUrl(
      '//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg',
    )
    .arcsData(arcsData)
    .arcColor('color')
    .arcDashLength(0.4)
    .arcDashGap(4)
    .arcDashInitialGap(() => Math.random() * 5)
    .arcDashAnimateTime(1000);

  // Setup renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('globeViz').appendChild(renderer.domElement);

  // Setup scene
  const scene = new THREE.Scene();
  scene.add(Globe);
  scene.add(new THREE.AmbientLight(0xcccccc, Math.PI));
  scene.add(new THREE.DirectionalLight(0xffffff, 0.6 * Math.PI));

  // Setup camera
  // const camera = new THREE.PerspectiveCamera();
  // camera.aspect = window.innerWidth / window.innerHeight;
  // camera.updateProjectionMatrix();
  // camera.position.z = 500;
  const camera = new THREE.PerspectiveCamera();
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  camera.position.z = 1000; // 從更遠的地方開始
  camera.position.x = 0; // 初始 x 位置

  // Add camera controls
  const tbControls = new TrackballControls(camera, renderer.domElement);
  tbControls.minDistance = 101;
  tbControls.rotateSpeed = 5;
  tbControls.zoomSpeed = 0.8;
  let frame = 0;
  const totalFrames = 120; // 動畫持續 120 幀

  (function animate() {
    // 攝影機由遠拉近，並往左偏
    if (frame < totalFrames) {
      // z 由 1000 緩慢減少到 500
      camera.position.z = 1000 - (500 * frame) / totalFrames;
      // x 由 0 緩慢減少到 -200（往左偏）
      camera.position.x = -200 * (frame / totalFrames);
      camera.lookAt(0, 0, 0); // 保持看向球體中心
      frame++;
    }

    tbControls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  })();

  // Kick-off renderer
  // (function animate() {
  //   // IIFE
  //   // Frame cycle
  //   tbControls.update();
  //   renderer.render(scene, camera);
  //   requestAnimationFrame(animate);
  // })();
});
</script>

<template>
  <div id="globeViz"></div>
</template> -->
