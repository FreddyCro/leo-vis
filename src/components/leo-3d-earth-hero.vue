<!-- ref: https://github.com/vasturiano/three-globe -->
<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import ThreeGlobe from 'three-globe';
import * as THREE from 'three';
import { createGlowTexture } from '@/utils/3d-utils';

const props = defineProps({
  isZoomOut: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['onReady']);
const globeContainer = ref(null);
const TARGET_ID = 'globe-viz';
const GLOBE_TEXTURE_URL = './img/earth_night.jpg';
const ARCS_N = 50;
const G_N = 600;
let Globe = null;
let observer = null;

class GlobeController {
  constructor(targetId, options = {}) {
    this.targetId = targetId;
    this.moving = true; // 添加移動狀態控制
    this.lastRenderTime = 0;
    this.renderInterval = 1000 / 60; // 60 FPS
    this.options = {
      arcsCount: 50,
      spotsCount: 500,
      globeTextureUrl: '',
      colors: ['#00F4DC', '#8D41D9'],
      cameraSpeed: 0.05,
      rotationSpeed: { x: 0.00025, y: 0.001 },
      zoomSpeed: 2,
      maxZoom: 350,
      ...options,
    };

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.globe = null;
    this.animationId = null;
  }

  /**
   * Initialize three.js globe
   */
  init() {
    const arcsData = this.generateArcData(this.options.arcsCount);
    const spotsData = this.generateSpotData(this.options.spotsCount);

    this.globe = new ThreeGlobe()
      .globeImageUrl(this.options.globeTextureUrl)
      .arcsData(arcsData)
      .arcColor('color')
      .arcAltitude(0.25)
      .arcAltitudeAutoScale(1)
      .arcDashLength(0.5)
      .arcDashGap(4)
      .arcDashInitialGap(() => Math.random() * 5)
      .arcDashAnimateTime(2000)
      .arcStroke(0.5)
      .customLayerData(spotsData)
      .customThreeObject((d) => this.createCustomObject(d))
      .customThreeObjectUpdate((obj, d) => {
        Object.assign(obj.position, this.globe.getCoords(d.lat, d.lng, d.alt));
      });

    // Initialize renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(
      document.documentElement.clientWidth,
      window.innerHeight,
    );
    // 4. renderer.setPixelRatio 上限 2，避免高 DPI 裝置過度消耗
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const targetElement = document.getElementById(this.targetId);
    if (targetElement) {
      targetElement.appendChild(this.renderer.domElement);
    }

    return this;
  }

  /**
   * Create scene and add globe
   */
  setScene() {
    this.scene = new THREE.Scene();
    if (this.globe) {
      this.scene.add(this.globe);
    }
    return this;
  }

  /**
   * Create and configure camera
   */
  setCamera({ position }) {
    // new THREE.PerspectiveCamera(fov, aspect, near, far)
    this.camera = new THREE.PerspectiveCamera(
      50, // 75 is default
      document.documentElement.clientWidth / window.innerHeight,
      0.1,
      1000,
    );

    // Set initial camera position (from right)
    this.camera.position.set(...position);
    this.options.cameraPosition = position;

    return this;
  }

  /**
   * Add lighting to the scene
   */
  setLight() {
    if (!this.scene) return this;

    const ambientLight = new THREE.AmbientLight(0xcccccc, 1 * Math.PI);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 10 * Math.PI);
    directionalLight.position.set(-15, 75, -25);
    directionalLight.castShadow = true;

    this.scene.add(ambientLight);
    this.scene.add(directionalLight);

    return this;
  }

  /**
   * Start animation loop
   */
  animate() {
    const animateLoop = (currentTime) => {
      this.animationId = requestAnimationFrame(animateLoop);

      // 控制渲染頻率，避免過度渲染
      if (currentTime - this.lastRenderTime < this.renderInterval) {
        return;
      }
      this.lastRenderTime = currentTime;

      // 只有在移動時才執行相機動畫
      if (this.moving) {
        // Camera movement animation
        // Zoom out
        if (props.isZoomOut) {
          let isMoving = false;

          // x
          if (Math.abs(this.camera.position.x) > 0.1) {
            this.camera.position.x +=
              (0 - this.camera.position.x) * this.options.cameraSpeed;
            isMoving = true;
          } else {
            this.camera.position.x = 0;
          }

          // y
          if (Math.abs(this.camera.position.y) > 0.1) {
            this.camera.position.y +=
              (0 - this.camera.position.y) * this.options.cameraSpeed;
            isMoving = true;
          } else {
            this.camera.position.y = 0;
          }

          // z - 持續縮放
          this.camera.translateZ(this.options.zoomSpeed);

          // 如果 x, y 都到位且 z 超過最大縮放，停止移動
          if (!isMoving && this.camera.position.z >= this.options.maxZoom) {
            this.moving = false;
          }
        }
        // Zoom in
        else {
          const [x, y, z] = this.options.cameraPosition;
          let isMoving = false;

          // x
          if (Math.abs(this.camera.position.x - x) > 0.1) {
            this.camera.position.x +=
              (x - this.camera.position.x) * this.options.cameraSpeed;
            isMoving = true;
          } else {
            this.camera.position.x = x;
          }

          // y
          if (Math.abs(this.camera.position.y - y) > 0.1) {
            this.camera.position.y +=
              (y - this.camera.position.y) * this.options.cameraSpeed;
            isMoving = true;
          } else {
            this.camera.position.y = y;
          }

          // z
          if (Math.abs(this.camera.position.z - z) > 0.1) {
            const currentZ = this.camera.position.z;
            const dz = (z - currentZ) * this.options.cameraSpeed;
            this.camera.translateZ(
              (dz / Math.abs(dz || 1)) * this.options.zoomSpeed,
            );
            isMoving = true;
          } else {
            this.camera.position.z = z;
          }

          // 檢查是否已達到目標點
          if (!isMoving) {
            this.camera.position.set(x, y, z);
            this.moving = false;
          }
        }
      }

      // Zoom limit
      if (this.camera.position.z > this.options.maxZoom) {
        this.camera.position.z = this.options.maxZoom;
      }

      // Globe rotation - 總是執行
      if (this.globe) {
        this.globe.rotation.y += this.options.rotationSpeed.y;
        this.globe.rotation.x += this.options.rotationSpeed.x;
      }

      // Render the scene
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    };

    animateLoop();

    // emit
    emit('onReady');

    return this;
  }

  /**
   * Generate arc data
   */
  generateArcData(count) {
    return [...Array(count).keys()].map(() => ({
      startLat: (Math.random() - 0.5) * 180,
      startLng: (Math.random() - 0.5) * 360,
      endLat: (Math.random() - 0.5) * 180,
      endLng: (Math.random() - 0.5) * 360,
      color:
        this.options.colors[
          Math.floor(Math.random() * this.options.colors.length)
        ],
    }));
  }

  /**
   * Generate spot data
   */
  generateSpotData(count) {
    return [...Array(count).keys()].map(() => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      alt: Math.random() * 0.15,
      radius: Math.random() * 1,
      color:
        this.options.colors[
          Math.round(Math.random() * (this.options.colors.length - 1))
        ],
    }));
  }

  // 1. SphereGeometry 與 glowTexture 共用，減少物件數量
  static sharedSphereGeometry = new THREE.SphereGeometry(1, 8, 8); // 單一 geometry，半徑用 scale 控制
  static sharedGlowTexture = createGlowTexture();
  static sharedSpriteMaterial = new THREE.SpriteMaterial({
    map: GlobeController.sharedGlowTexture,
    color: 0xffffff,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  // 添加材質池
  static materialPool = new Map();

  static getMaterial(color) {
    const colorKey = color.toString();
    if (!this.materialPool.has(colorKey)) {
      const material = this.sharedSpriteMaterial.clone();
      material.color = new THREE.Color(color);
      this.materialPool.set(colorKey, material);
    }
    return this.materialPool.get(colorKey);
  }

  /**
   * Create custom 3D object with glow effect
   */
  createCustomObject(d) {
    // 共用 geometry，半徑用 scale 控制
    const mesh = new THREE.Mesh(
      GlobeController.sharedSphereGeometry,
      new THREE.MeshLambertMaterial({ color: d.color }),
    );
    mesh.scale.set(d.radius, d.radius, d.radius);

    // 使用材質池而不是每次 clone
    const spriteMaterial = GlobeController.getMaterial(d.color);
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(d.radius * 6, d.radius * 6, 1);

    // Group objects
    const group = new THREE.Group();
    group.add(mesh);
    group.add(sprite);
    return group;
  }

  /**
   * Control methods
   */
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
      this.moving = true; // 重置時重新啟動動畫
    }
    return this;
  }

  updateRotationSpeed(x, y) {
    this.options.rotationSpeed.x = x;
    this.options.rotationSpeed.y = y;
    return this;
  }

  resize() {
    if (this.camera && this.renderer) {
      this.camera.aspect =
        document.documentElement.clientWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(
        document.documentElement.clientWidth,
        window.innerHeight,
      );
    }
    return this;
  }

  dispose() {
    this.stop();

    // 清理場景中的物件
    if (this.scene) {
      this.scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      this.scene.clear();
    }

    // 清理材質池
    if (GlobeController.materialPool) {
      GlobeController.materialPool.forEach((material) => material.dispose());
      GlobeController.materialPool.clear();
    }

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.domElement.remove();
    }

    return this;
  }
}

onMounted(() => {
  Globe = new GlobeController(TARGET_ID, {
    arcsCount: ARCS_N,
    spotsCount: G_N,
    globeTextureUrl: GLOBE_TEXTURE_URL,
  });

  Globe.init()
    .setScene()
    .setCamera({
      position: [-100, 50, 200],
    })
    .setLight()
    .animate();

  // 監聽 props 變化，重新啟動動畫
  watch(
    () => props.isZoomOut,
    () => {
      if (Globe) {
        Globe.moving = true; // 重新啟動動畫
      }
    },
  );

  // Additional control methods:
  // globe.stop();
  // globe.resetCamera();
  // globe.updateRotationSpeed(0.001, 0.002);
  // globe.resize();
  // globe.dispose();

  window.addEventListener('resize', handleResize);

  observer = new IntersectionObserver(handleIntersectionObserver, {
    threshold: 0,
  });

  observer.observe(globeContainer.value);
});

onUnmounted(() => {
  if (Globe) {
    Globe.dispose();
    Globe = null;
  }
  window.removeEventListener('resize', handleResize);
  observer.disconnect();
});

function handleIntersectionObserver(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      Globe?.resetCamera();
      Globe?.animate();
    } else {
      Globe?.stop();
    }
  });
}

function handleResize() {
  if (!Globe) return;
  Globe.resetCamera();
  Globe.resize();
}
</script>

<template>
  <div
    :id="TARGET_ID"
    ref="globeContainer"
    class="leo-hero-earth w-full overflow-hidden"
  />
</template>
