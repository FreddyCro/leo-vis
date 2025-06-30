<!-- ref: https://github.com/vasturiano/three-globe -->
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
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
    this.moving = true;
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
    const animateLoop = () => {
      this.animationId = requestAnimationFrame(animateLoop);

      // Camera movement animation
      // Zoom out
      if (props.isZoomOut && this.moving) {
        // x
        this.camera.position.x +=
          (0 - this.camera.position.x) * this.options.cameraSpeed;
        if (Math.abs(this.camera.position.x) < 0.1) {
          this.camera.position.x = 0;
          this.moving = false;
        }

        // y
        this.camera.position.y +=
          (0 - this.camera.position.y) * this.options.cameraSpeed;
        if (Math.abs(this.camera.position.y) < 0.1) {
          this.camera.position.y = 0;
        }

        // if (
        //   Math.abs(this.camera.position.x) < 0.1 &&
        //   Math.abs(this.camera.position.y) < 0.1
        // ) {
        //   this.moving = false;
        // }

        // z
        this.camera.translateZ(this.options.zoomSpeed);
      }

      // Zoom in
      else if (!props.isZoomOut && this.moving) {
        const [x, y, z] = this.options.cameraPosition;

        // x
        this.camera.position.x +=
          (x - this.camera.position.x) * this.options.cameraSpeed;
        if (Math.abs(this.camera.position.x - x) < 0.1) {
          this.camera.position.x = x;
        }

        // y
        this.camera.position.y +=
          (y - this.camera.position.y) * this.options.cameraSpeed;
        if (Math.abs(this.camera.position.y - y) < 0.1) {
          this.camera.position.y = y;
        }

        // z
        const currentZ = this.camera.position.z;
        const dz = (z - currentZ) * this.options.cameraSpeed;
        this.camera.translateZ(
          (dz / Math.abs(dz || 1)) * this.options.zoomSpeed,
        );

        // TODO: 研究怎麼樣讓 moving = false
        // 檢查是否已達到目標點
        if (
          Math.abs(this.camera.position.x - x) < 0.1 &&
          Math.abs(this.camera.position.y - y) < 0.1 &&
          Math.abs(this.camera.position.z - z) < 0.1
        ) {
          this.camera.position.set(x, y, z); // snap 精確
          // this.moving = false;
        }
      }

      // Zoom limit
      if (this.camera.position.z > this.options.maxZoom) {
        this.camera.position.z = this.options.maxZoom;
      }

      // Globe rotation
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

    // 共用 glow texture/material，顏色用 SpriteMaterial color 設定
    const spriteMaterial = GlobeController.sharedSpriteMaterial.clone();
    spriteMaterial.color = new THREE.Color(d.color);
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
      this.moving = true;
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
    if (this.renderer) {
      this.renderer.dispose();
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
