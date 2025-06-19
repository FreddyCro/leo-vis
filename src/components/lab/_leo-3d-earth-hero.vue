<!-- ref: https://github.com/vasturiano/three-globe -->
<script setup>
import { onMounted } from 'vue';
import ThreeGlobe from 'three-globe';
import * as THREE from 'three';

const TARGET_ID = 'globe-viz';
const GLOBE_TEXTURE_URL = './img/earth_night.jpg';
const ARCS_N = 50;
const G_N = 750;

onMounted(() => {
  /**
   * Initialize three.js globe
   */
  const arcsData = generateArcData(ARCS_N);
  const gData = generateSpotData(G_N);
  const Globe = new ThreeGlobe()
    .globeImageUrl(GLOBE_TEXTURE_URL)
    .arcsData(arcsData)
    .arcColor('color')
    .arcAltitude(0.25)
    .arcAltitudeAutoScale(1)
    .arcDashLength(0.5)
    .arcDashGap(4)
    .arcDashInitialGap(() => Math.random() * 5)
    .arcDashAnimateTime(2000)
    .arcStroke(0.5)
    .customLayerData(gData)
    .customThreeObject((d) => {
      // 建立主體
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(d.radius),
        new THREE.MeshLambertMaterial({ color: d.color }),
      );

      // 建立光暈
      const spriteMaterial = new THREE.SpriteMaterial({
        map: createGlowTexture(), // 產生一個發光漸層貼圖
        color: d.color,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(d.radius * 6, d.radius * 6, 1); // 光暈大小可調整

      // group
      const group = new THREE.Group();
      group.add(mesh);
      group.add(sprite);

      return group;
    })
    .customThreeObjectUpdate((obj, d) => {
      Object.assign(obj.position, Globe.getCoords(d.lat, d.lng, d.alt));
    });

  // const renderer = new THREE.WebGLRenderer();
  const renderer = new THREE.WebGLRenderer({ alpha: true }); // 讓 canvas 支援透明
  renderer.setClearColor(0x000000, 0); // 設定背景為透明
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById(TARGET_ID).appendChild(renderer.domElement);

  /**
   * Create scene, camera, and lights
   */
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

  // from left
  // camera.position.set(200, 0, 50);
  // from right
  camera.position.set(-200, 0, 50);

  // const controls = new OrbitControls(camera, renderer.domElement);
  // controls.enableDamping = true;
  // controls.dampingFactor = 0.05;
  // controls.rotateSpeed = 1;
  // controls.zoomSpeed = 100;
  // controls.minDistance = 150;
  // controls.maxDistance = 800;
  // controls.enablePan = false; // 禁用平移以避免破壞視角
  // controls.enabled = false;

  /**
   * Animate the globe
   */
  let moving = true;

  function animate() {
    // TODO: if root is in viewport, do, else, return

    requestAnimationFrame(animate);

    // when use OrbitControls, postiton.x will not change
    // controls.target.x += 0.5;

    // 攝影機 x 軸由 200 緩慢移動到 0
    if (moving) {
      camera.position.x += (0 - camera.position.x) * 0.05; // 0.05 可調整速度
      if (Math.abs(camera.position.x) < 0.1) {
        camera.position.x = 0;
        moving = false; // 停止移動
      }
      camera.translateZ(+3);
    }

    if (camera.position.z > 300) {
      camera.position.z = 300;
    }

    // camera.translateZ(+3);

    // rotate
    Globe.rotation.y += 0.001;
    Globe.rotation.x += 0.00025;

    // controls.update(); // 必須呼叫以啟用 damping
    renderer.render(scene, camera);
  }

  animate();
});

function createGlowTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.2, 'rgba(255,255,255,0.6)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

function generateArcData(number) {
  return [...Array(number).keys()].map(() => ({
    startLat: (Math.random() - 0.5) * 180,
    startLng: (Math.random() - 0.5) * 360,
    endLat: (Math.random() - 0.5) * 180,
    endLng: (Math.random() - 0.5) * 360,
    color: ['#00F4DC', '#8D41D9'][Math.floor(Math.random() * 2)],
  }));
}

function generateSpotData(number) {
  return [...Array(number).keys()].map(() => ({
    lat: (Math.random() - 0.5) * 180,
    lng: (Math.random() - 0.5) * 360,
    alt: Math.random() * 0.15,
    radius: Math.random() * 1,
    color: ['#00F4DC', '#8D41D9'][Math.round(Math.random() * 1)],
  }));
}

// 如果需要，可以添加事件監聽器來調整大小
// window.addEventListener('resize', () => {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });
</script>

<template>
  <div :id="TARGET_ID" class="leo-hero-earth" />
</template>

<style lang="scss"></style>
