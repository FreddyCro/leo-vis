<!-- ref: https://github.com/vasturiano/three-globe/blob/master/example/custom/index.html -->
<script setup>
import { onMounted, onUnmounted } from 'vue';
import ThreeGlobe from 'three-globe';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js?external=three';
import MOON_STATION_DATA from '@/assets/json/moon-stations.json';

const props = defineProps({
  currentCategory: {
    type: String,
    default: 'soviet',
  },
});

const MOON_ROOT_ID = 'moon-vis';
const MOON_IMG_PATH = './img/moon_4k.jpg';
let moonController = null;

class MoonController {
  constructor(targetId, options = {}) {
    this.targetId = targetId;
    this.options = {
      moonTextureUrl: '',
      stations: [],
      cameraPosition: [0, 0, 500],
      ...options,
    };
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.labelRenderer = null;
    this.globe = null;
    this.controls = null;
    this.animationId = null;
  }

  /**
   * 初始化 three-globe 月球
   */
  init() {
    // 轉換站點資料
    const gData = this.options.stations.map((e) => {
      const [lat, lng] = convertMoonLatLngToGlobe(e.lat, e.lng);
      return {
        ...e,
        lat,
        lng,
        size: 12,
        color: stationColor(e.cate),
      };
    });

    this.globe = new ThreeGlobe()
      .globeImageUrl(this.options.moonTextureUrl)
      .htmlElementsData(gData)
      .htmlElement((d) => {
        const el = document.createElement('div');
        el.setAttribute('data-category', d.cate);
        el.innerHTML = stationMark(d.color);
        el.style.color = d.color;
        el.style.width = `${d.size}px`;
        el.style.transition = 'opacity 250ms';
        return el;
      })
      .htmlElementVisibilityModifier(handleSiteVisibilityChange);

    // WebGLRenderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // CSS2DRenderer
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';
    this.labelRenderer.domElement.style.pointerEvents = 'none';

    // Append to DOM
    const targetElement = document.getElementById(this.targetId);
    if (targetElement) {
      targetElement.appendChild(this.renderer.domElement);
      targetElement.appendChild(this.labelRenderer.domElement);
    }
    return this;
  }

  setScene() {
    this.scene = new THREE.Scene();
    if (this.globe) this.scene.add(this.globe);
    this.scene.add(new THREE.AmbientLight(0xcccccc, Math.PI));
    this.scene.add(new THREE.DirectionalLight(0xffffff, 0.6 * Math.PI));
    return this;
  }

  setCamera({ position }) {
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.set(...position);
    this.options.cameraPosition = position;
    return this;
  }

  setControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 101;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    if (this.globe && this.camera) {
      this.globe.setPointOfView(this.camera);
      this.controls.addEventListener('change', () => {
        this.globe.setPointOfView(this.camera);
      });
    }

    // add rotation callback
    this.controls.addEventListener('start', () => {
      console.log('Controls started');
    });

    this.controls.addEventListener('end', () => {
      console.log(
        'Camera position:',
        this.camera.position.x,
        this.camera.position.y,
        this.camera.position.z,
      );
    });

    return this;
  }

  animate() {
    const animateLoop = () => {
      this.animationId = requestAnimationFrame(animateLoop);

      if (this.globe) {
        // this.globe.rotation.y += 0.0005;
        // this.globe.rotation.x += 0.0005;
      }

      // category is soviet
      if (props.currentCategory === 'soviet') {
        this.camera.position.set(
          -184.43856924446047,
          158.49481744586123,
          436.87733635181746,
        );
      }

      // category is us
      if (props.currentCategory === 'us') {
        this.camera.position.set(
          -202.87283327525873,
          -75.4358911451228,
          450.723906450512,
        );
      }

      // category is cn

      if (props.currentCategory === 'cn') {
        this.camera.position.set(
          -380.32376745990535,
          176.80560493683888,
          272.20141433876256,
        );
        // this.camera.position.set(
        //   -0.00044917950101927074,
        //   -499.99999999974955,
        //   0.00021963099962235867,
        // );
      }

      // category is others
      if (props.currentCategory === 'others') {
        this.camera.position.set(
          148.46184703813043,
          -263.80696143786486,
          397.9509606357892,
        );
      }

      // TODO: reset rotation
      // this.globe.rotation.x = 0;
      // this.globe.rotation.y = 0;

      if (this.controls) this.controls.update();
      if (this.scene && this.camera && this.renderer && this.labelRenderer) {
        this.renderer.render(this.scene, this.camera);
        this.labelRenderer.render(this.scene, this.camera);
      }
    };
    animateLoop();
    return this;
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    return this;
  }

  resetCamera() {
    if (this.camera) {
      this.camera.position.set(...this.options.cameraPosition);
      if (this.controls) this.controls.update();
    }
    return this;
  }

  resize() {
    if (this.camera && this.renderer && this.labelRenderer) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    }
    return this;
  }

  dispose() {
    this.stop();
    if (this.renderer) this.renderer.dispose();
    if (this.labelRenderer && this.labelRenderer.domElement?.parentNode) {
      this.labelRenderer.domElement.parentNode.removeChild(
        this.labelRenderer.domElement,
      );
    }
    return this;
  }
}

onMounted(() => {
  moonController = new MoonController(MOON_ROOT_ID, {
    moonTextureUrl: MOON_IMG_PATH,
    stations: MOON_STATION_DATA,
    cameraPosition: [0, 0, 500],
  });

  moonController
    .init()
    .setScene()
    .setCamera({ position: [0, 0, 500] })
    .setControls()
    .animate();

  // Handle resize events
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (moonController) {
    moonController.dispose();
  }

  window.removeEventListener('resize', handleResize);
});

function handleResize() {
  if (moonController) {
    moonController.resize();
  }
}

function handleSiteVisibilityChange(el, isVisible) {
  let isCategoryMatch = false;
  const elCategory = el.dataset.category;

  if (props.currentCategory === elCategory) {
    isCategoryMatch = true;
  } else if (props.currentCategory === 'others') {
    isCategoryMatch = ['india', 'japan', 'folk'].includes(elCategory);
  }

  // Set opacity to 1 if the element is visible to the camera
  // and matches the current category, otherwise set to 0
  // el.style.opacity = isVisible && isCategoryMatch ? 1 : 0;
  el.style.opacity = isVisible ? 1 : 0;
}

function stationMark(color = 'currentColor') {
  return `<svg viewBox="-4 0 36 36">
      <circle cx="12" cy="12" r="12" fill="${color}" />
    </svg>`;
}

function stationColor(category) {
  switch (category) {
    case 'soviet':
      return '#FFFB18';
    case 'us':
      return '#0800FF';
    case 'cn':
      return '#FF0037';
    case 'india':
      return '#FF7700';
    case 'japan':
      return '#B42EF2';
    case 'folk':
      return '#00F4DC';
    default:
      return '#ffffff';
  }
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
  <div :id="MOON_ROOT_ID" class="leo-moon-site" />
</template>

<style lang="scss">
.leo-moon-site {
  position: relative;
  width: 100%;
  height: 100vh;
}
</style>
