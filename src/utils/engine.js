import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { earthRadius } from 'satellite.js/lib/constants';
import * as satellite from 'satellite.js/lib/index';
import { getPositionFromTle, parseTleFile } from './tle';
import circle from '@/assets/3d/circle.png';

const EARTH_IMG_PATH = './img/earth_night.jpg';
const SatelliteSize = 50;
const MinutesPerDay = 1440;
const ixpdotp = MinutesPerDay / (2.0 * 3.141592654);

const TargetDate = new Date();

const defaultOptions = {
  // backgroundColor: 0x041119,
  defaultSatelliteColor: 0xff0000,
  onStationClicked: null,
};

const defaultStationOptions = {
  orbitMinutes: 0,
  satelliteSize: SatelliteSize,
};

export class Engine {
  stations = [];
  referenceFrame = 1;

  initialize(container, options = {}) {
    this.el = container;
    this.raycaster = new THREE.Raycaster();
    this.options = { ...defaultOptions, ...options };

    this._setupScene();
    this._setupLights();
    this._addBaseObjects();

    this.render();

    window.addEventListener('resize', this.handleWindowResize);
    window.addEventListener('pointerdown', this.handleMouseDown);
  }

  dispose() {
    window.removeEventListener('pointerdown', this.handleMouseDown);
    window.removeEventListener('resize', this.handleWindowResize);
    // window.cancelAnimationFrame(this.requestID);

    this.raycaster = null;
    this.el = null;

    this.controls.dispose();
  }

  handleWindowResize = () => {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.render();
  };

  handleMouseDown = (e) => {
    const mouse = new THREE.Vector2(
      (e.clientX / this.el.clientWidth) * 2 - 1,
      -(e.clientY / this.el.clientHeight) * 2 + 1,
    );

    this.raycaster.setFromCamera(mouse, this.camera);

    let station = null;

    const intersects = this.raycaster.intersectObjects(
      this.scene.children,
      true,
    );
    if (intersects && intersects.length > 0) {
      const picked = intersects[0].object;
      if (picked) {
        station = this._findStationFromMesh(picked);
      }
    }

    const cb = this.options.onStationClicked;
    if (cb) cb(station);
  };

  // __ API _________________________________________________________________

  addSatellite = (station, color, size) => {
    // const sat = this._getSatelliteMesh(color, size);
    const sat = this._getSatelliteSprite(color, size);
    const pos = this._getSatellitePositionFromTle(station);
    if (!pos) return;
    // const pos = { x: Math.random() * 20000 - 10000, y: Math.random() * 20000 - 10000 , z: Math.random() * 20000 - 10000, }

    const apogee = this._getSatelliteApogeeHeight(station);

    sat.position.set(pos.x, pos.y, pos.z);
    station.mesh = sat;
    station.mesh.apogee = apogee;

    this.stations.push(station);

    if (station.orbitMinutes > 0) this.addOrbit(station);

    this.earth.add(sat);
    // this.earth.remove(sat);
  };

  loadLteFileStations = (url, color, stationOptions) => {
    const options = { ...defaultStationOptions, ...stationOptions };

    return fetch(url).then((res) => {
      if (res.ok) {
        return res.text().then((text) => {
          return this._addTleFileStations(text, color, options);
        });
      }
    });
  };

  addOrbit = (station) => {
    if (station.orbitMinutes > 0) return;

    const revsPerDay = station.satrec.no * ixpdotp;
    const intervalMinutes = 1;
    const minutes = station.orbitMinutes || MinutesPerDay / revsPerDay;
    const initialDate = new Date();

    // console.log('revsPerDay', revsPerDay, 'minutes', minutes);

    if (!this.orbitMaterial) {
      this.orbitMaterial = new THREE.LineBasicMaterial({
        color: 0x999999,
        opacity: 1.0,
        transparent: true,
      });
    }

    const points = [];

    for (let i = 0; i <= minutes; i += intervalMinutes) {
      const date = new Date(initialDate.getTime() + i * 60000);

      const pos = getPositionFromTle(station, date, this.referenceFrame);
      if (!pos) continue;

      points.push(new THREE.Vector3(pos.x, pos.y, pos.z));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const orbitCurve = new THREE.Line(geometry, this.orbitMaterial);
    station.orbit = orbitCurve;
    station.mesh.material = this.selectedMaterial;

    this.earth.add(orbitCurve);
    this.render();
  };

  removeOrbit = (station) => {
    if (!station || !station.orbit) return;

    this.earth.remove(station.orbit);
    station.orbit.geometry.dispose();
    station.orbit = null;
    station.mesh.material = this.material;
    this.render();
  };

  highlightStation = (station) => {
    station.mesh.material = this.highlightedMaterial;
  };

  clearStationHighlight = (station) => {
    station.mesh.material = this.material;
  };

  setReferenceFrame = (type) => {
    this.referenceFrame = type;
  };

  _addTleFileStations = (lteFileContent, color, stationOptions) => {
    const stations = parseTleFile(lteFileContent, stationOptions);
    const { satelliteSize } = stationOptions;
    stations.forEach((s) => {
      this.addSatellite(s, color, satelliteSize);
    });

    this.render();

    return stations;
  };

  _getSatelliteMesh = (color, size) => {
    color = color || this.options.defaultSatelliteColor;
    size = size || SatelliteSize;

    if (!this.geometry) {
      this.geometry = new THREE.BoxBufferGeometry(size, size, size);
      this.material = new THREE.MeshPhongMaterial({
        color,
        emissive: 0xff4040,
        flatShading: false,
        side: THREE.DoubleSide,
      });
    }

    return new THREE.Mesh(this.geometry, this.material);
  };

  _setupSpriteMaterials = (color) => {
    if (this.material && this.lastColor === color) return;

    this._satelliteSprite = new THREE.TextureLoader().load(circle, this.render);
    this.selectedMaterial = new THREE.SpriteMaterial({
      map: this._satelliteSprite,
      color: 0xff0000,
      sizeAttenuation: false,
    });
    this.highlightedMaterial = new THREE.SpriteMaterial({
      map: this._satelliteSprite,
      color: 0xfca300,
      sizeAttenuation: false,
    });
    this.material = new THREE.SpriteMaterial({
      map: this._satelliteSprite,
      color,
      sizeAttenuation: false,
    });
    this.lastColor = color;
  };

  _getSatelliteSprite = (color, size) => {
    const SpriteScaleFactor = 5000;

    this._setupSpriteMaterials(color);

    const result = new THREE.Sprite(this.material);
    result.scale.set(size / SpriteScaleFactor, size / SpriteScaleFactor, 1);
    return result;
  };

  _getSatellitePositionFromTle = (station, date) => {
    date = date || TargetDate;
    return getPositionFromTle(station, date, this.referenceFrame);
  };

  _getSatelliteApogeeHeight = (station) => {
    if (!station.satrec) {
      const { tle1, tle2 } = station;
      if (!tle1 || !tle2) return null;
      station.satrec = satellite.twoline2satrec(tle1, tle2);
    }

    const satrec = station.satrec;
    const mu = 398600.4418; // 地心引力常數 (km^3/s^2)
    const earthRadius = 6378.137; // 地球半徑 (km)

    // 單位是 radians/minute
    const meanMotion = satrec.no;
    const e = satrec.ecco;

    if (!meanMotion || !e || Number.isNaN(meanMotion) || Number.isNaN(e)) {
      return null;
    }

    // mean motion: revs per day
    const n = meanMotion * (1440 / (2 * Math.PI)); // 1440 = 分鐘/天
    const a = (mu / ((n * 2 * Math.PI) / 86400) ** 2) ** (1 / 3); // km
    const r_apogee = a * (1 + e);
    const apogeeHeight = r_apogee - earthRadius;

    // console.log('satrec.no:', satrec.no);
    // console.log('satrec.ecco:', satrec.ecco);
    // console.log('apogeeHeight:', satrec.no, apogeeHeight);
    // if station name include 'STARLINK', log the apogee height
    // if (station.name && station.name.includes('STARLINK')) {
    //   console.log(`Starlink ${station.name} apogee height:`, apogeeHeight);
    // }

    return apogeeHeight;
  };

  updateSatellitePosition = (station, date) => {
    date = date || TargetDate;

    const pos = getPositionFromTle(station, date, this.referenceFrame);
    if (!pos) return;

    station.mesh.position.set(pos.x, pos.y, pos.z);
  };

  updateAllPositions = (date) => {
    if (!this.stations) return;

    this.stations.forEach((station) => {
      this.updateSatellitePosition(station, date);
    });

    if (this.referenceFrame === 2) this._updateEarthRotation(date);
    else this.render();
  };

  _updateEarthRotation = (date) => {
    const gst = satellite.gstime(date);
    this.earthMesh.setRotationFromEuler(new THREE.Euler(0, gst, 0));

    this.render();
  };

  // __ Scene _______________________________________________________________

  _setupScene = () => {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.scene = new THREE.Scene();

    this._setupCamera(width, height);

    this.renderer = new THREE.WebGLRenderer({
      logarithmicDepthBuffer: true,
      antialias: true,
    });

    // this.renderer.setClearColor(new THREE.Color(this.options.backgroundColor));
    // transparent background
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(width, height);

    this.el.appendChild(this.renderer.domElement);
  };

  _setupCamera(width, height) {
    const NEAR = 1e-6;
    const FAR = 1e27;
    this.camera = new THREE.PerspectiveCamera(54, width / height, NEAR, FAR);
    this.controls = new OrbitControls(this.camera, this.el);
    this.controls.enablePan = false;
    this.controls.enableZoom = false;
    this.controls.addEventListener('change', () => this.render());
    this.camera.position.z = -15000;
    this.camera.position.x = 15000;
    this.camera.lookAt(0, 0, 0);
  }

  _setupLights = () => {
    const sun = new THREE.PointLight(0xffffff, 1, 0);
    // sun.position.set(0, 0, -149400000);
    sun.position.set(0, 59333894, -137112541);

    const ambient = new THREE.AmbientLight(0x909090);

    this.scene.add(sun);
    this.scene.add(ambient);
  };

  _addBaseObjects = () => {
    this._addEarth();
  };

  render = () => {
    this.renderer.render(this.scene, this.camera);
    // this.requestID = window.requestAnimationFrame(this._animationLoop);
  };

  // __ Scene contents ______________________________________________________

  _addEarth = () => {
    const textLoader = new THREE.TextureLoader();

    const group = new THREE.Group();

    // TODO: remove this when THREE.Group is fixed
    const originalRemove = group.remove;
    group.remove = function (...objects) {
      objects.forEach((obj) => {
        if (this.children.includes(obj)) {
          console.log('Removing from group:', obj);
        } else {
          console.warn('Object not in group:', obj);
        }
      });
      return originalRemove.apply(this, objects);
    };

    // Planet
    const geometry = new THREE.SphereGeometry(earthRadius, 50, 50);
    const material = new THREE.MeshPhongMaterial({
      // color: 0x156289,
      // emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: false,
      map: textLoader.load(EARTH_IMG_PATH, this.render),
    });

    this.earthMesh = new THREE.Mesh(geometry, material);
    group.add(this.earthMesh);

    // // Axis
    // material = new THREE.LineBasicMaterial({color: 0xffffff});
    // geometry = new THREE.Geometry();
    // geometry.vertices.push(
    //     new THREE.Vector3(0, -7000, 0),
    //     new THREE.Vector3(0, 7000, 0)
    // );

    // var earthRotationAxis = new THREE.Line(geometry, material);
    // group.add(earthRotationAxis);

    this.earth = group;
    this.scene.add(this.earth);
  };

  _findStationFromMesh = (threeObject) => {
    for (let i = 0; i < this.stations.length; ++i) {
      const s = this.stations[i];

      if (s.mesh === threeObject) return s;
    }

    return null;
  };
}
