<script setup>
import { onMounted, onUnmounted } from 'vue';
import ThreeGlobe from 'three-globe';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js?external=three';
import {
  convertMoonLatLngToGlobe,
  getCanvasSize,
  stationColor,
  stationMark,
} from '@/utils/moon-utils';
import MOON_STATION_DATA from '@/assets/json/moon-stations.json';

const props = defineProps({
  currentCategory: {
    type: String,
    default: 'all',
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
    // Calculate and store a fixed camera radius for all positions
    this.radius = new THREE.Vector3(...this.options.cameraPosition).length();
  }

  init() {
    // Convert station data
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

    const { width, height } = getCanvasSize();

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
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // CSS2DRenderer
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(width, height);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';
    this.labelRenderer.domElement.style.pointerEvents = 'none';

    // Append to DOM
    const targetElement = document.getElementById(this.targetId);
    if (targetElement) {
      targetElement.appendChild(this.renderer.domElement);
      targetElement.appendChild(this.labelRenderer.domElement);
    } else {
      console.error(`Target element with ID ${this.targetId} not found.`);
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

  setCamera(option) {
    const { width, height } = getCanvasSize();
    this.camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);

    const { position } = option || {};
    const newPosition = position || this.options.cameraPosition;

    // Always set camera at fixed radius, only direction changes
    const dir = new THREE.Vector3(...newPosition).normalize();
    this.camera.position.copy(dir.multiplyScalar(this.radius));
    this.options.cameraPosition = newPosition;

    return this;
  }

  setControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = this.radius;
    this.controls.maxDistance = this.radius;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;
    this.controls.enabled = false;
    // this.controls.enableZoom = false;
    // this.controls.enablePan = false;

    if (this.globe && this.camera) {
      this.globe.setPointOfView(this.camera);
      this.controls.addEventListener('change', () => {
        this.globe.setPointOfView(this.camera);
      });
    }

    return this;
  }

  animate() {
    // Helper to create positions at fixed radius
    const makePosition = (x, y, z) => {
      const v = new THREE.Vector3(x, y, z);
      v.setLength(this.radius);
      return v;
    };

    const positions = {
      all: makePosition(...this.options.cameraPosition),
      soviet: makePosition(
        -184.43856924446047,
        158.49481744586123,
        436.87733635181746,
      ),
      us: makePosition(
        -202.87283327525873,
        -75.4358911451228,
        450.723906450512,
      ),
      cn1: makePosition(
        -357.5450654210032,
        216.18274233623478,
        274.63894135587424,
      ),
      cn2: makePosition(
        127.95264223458179,
        -262.11205224678906,
        -452.68686021593976,
      ),
      others: makePosition(
        148.46184703813043,
        -263.80696143786486,
        397.9509606357892,
      ),
    };

    let lastCategory = props.currentCategory;
    let cnStep = 0; // 0: not in cn, 1: moving to pos1, 2: moving to pos2
    const targetPosition = this.camera.position.clone();

    const animateLoop = () => {
      this.animationId = requestAnimationFrame(animateLoop);

      // Detect category change
      if (props.currentCategory !== lastCategory) {
        if (props.currentCategory === 'cn') {
          cnStep = 1; // Start cn two-step transition
          targetPosition.copy(positions.cn1);
        } else {
          cnStep = 0;
          if (props.currentCategory === 'all') {
            targetPosition.copy(positions.all);
          } else if (props.currentCategory === 'soviet') {
            targetPosition.copy(positions.soviet);
          } else if (props.currentCategory === 'us') {
            targetPosition.copy(positions.us);
          } else if (props.currentCategory === 'others') {
            targetPosition.copy(positions.others);
          }
        }
        lastCategory = props.currentCategory;
      }

      // Handle cn two-step transition
      const SLERP_FACTOR = 0.12;
      if (props.currentCategory === 'cn') {
        if (cnStep === 1) {
          // Move to position 1
          this.moveCameraSlerp(positions.cn1, SLERP_FACTOR);
          // If close enough to pos1, proceed to pos2
          if (this.camera.position.distanceTo(positions.cn1) < 2) {
            cnStep = 2;
            targetPosition.copy(positions.cn2);
          }
        } else if (cnStep === 2) {
          // Move to position 2
          this.moveCameraSlerp(positions.cn2, SLERP_FACTOR);
        }
      } else {
        // Other categories: single target
        this.moveCameraSlerp(targetPosition, SLERP_FACTOR);
      }

      if (props.currentCategory === 'all') {
        // rotate globe
        // this.globe.rotation.y += 0.001;
        // this.globe.rotation.x += 0.00025;
      } else {
        // Keep the globe static when focusing on a specific category
        this.globe.rotation.set(0, 0, 0);
      }

      // update
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
      const dir = new THREE.Vector3(...this.options.cameraPosition).normalize();
      this.camera.position.copy(dir.multiplyScalar(this.radius));
      if (this.controls) this.controls.update();
    }
    return this;
  }

  resize() {
    if (this.camera && this.renderer && this.labelRenderer) {
      const { width, height } = getCanvasSize();
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
      this.labelRenderer.setSize(width, height);
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

  /**
   * Smoothly move the camera along the sphere using slerp to avoid visual scaling.
   * @param {THREE.Vector3} targetPosition - The target position vector.
   * @param {number} slerpFactor - Interpolation factor (0~1, higher is faster).
   */
  moveCameraSlerp(targetPosition, slerpFactor = 0.08) {
    const center = new THREE.Vector3(0, 0, 0);
    const radius = this.radius;
    const from = this.camera.position.clone().normalize();
    const to = targetPosition.clone().normalize();
    const quatFrom = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      from,
    );
    const quatTo = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      to,
    );
    const slerpedQuat = quatFrom.clone();
    slerpedQuat.slerp(quatTo, slerpFactor);
    const newDir = new THREE.Vector3(0, 0, 1).applyQuaternion(slerpedQuat);
    this.camera.position.copy(newDir.multiplyScalar(radius));
    this.camera.lookAt(center);
  }
}

onMounted(() => {
  moonController = new MoonController(MOON_ROOT_ID, {
    moonTextureUrl: MOON_IMG_PATH,
    stations: MOON_STATION_DATA,
    cameraPosition: [-200, 0, 500],
  });

  moonController.init().setScene().setCamera().setControls().animate();

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

// 將分類判斷抽成工具函式
function isCategoryMatch(current, elCategory) {
  if (current === 'all') return true;
  if (current === elCategory) return true;
  if (current === 'others')
    return ['india', 'japan', 'folk'].includes(elCategory);
  return false;
}

function handleSiteVisibilityChange(el, isVisible) {
  const elCategory = el.dataset.category;
  el.style.opacity =
    isVisible && isCategoryMatch(props.currentCategory, elCategory) ? 1 : 0;
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
