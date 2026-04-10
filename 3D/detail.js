// detail.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// ---- ПРЕСЕТЫ ----
const PRESETS = [
  { id: 1, title: "Газета", model: "../assets/models/newspaper.glb", fallback: "newspaper" },
  { id: 3, title: "Дерево", model: "models/Big Tree.glb" },
  { id: 4, title: "Пальма", model: "models/Palm Tree.glb" },
  { id: 5, title: "Машина + Дерево", models: [
      { title: "Машина", model: "models/Range Rover.glb" },
      { title: "Дерево", model: "models/Big Tree.glb" },
    ]
  }
];

// ---- ГЛОБАЛЬНЫЕ camera и controls ----
let camera, controls;

// ---- ВЫБОР МОДЕЛИ ----
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const userId = params.get('user');
const newsMode = params.get('news');

let modelData = null;
let title = '';
let toRender = [];

if (newsMode) {
  modelData = PRESETS.find(m => m.id === 1);
  title = modelData?.title || "Газета";
  if (modelData?.model) {
    toRender = [{ model: modelData.model, fallback: modelData.fallback }];
  }
  renderModel();
} else if (id) {
  modelData = PRESETS.find(m => m.id === Number(id));
  title = modelData?.title || '';
  if (modelData?.models) {
    toRender = modelData.models.map(x => ({ model: x.model }));
  } else if (modelData?.model) {
    toRender = [{ model: modelData.model, fallback: modelData.fallback }];
  }
  renderModel();
} else if (userId) {
  getModelByIdFromDB(userId).then(userModel => {
    if (!userModel) {
      document.getElementById('model-title').textContent = "Модель не найдена";
      return;
    }
    title = userModel.title;
    toRender = [{ buffer: userModel.buffer, filename: userModel.filename }];
    renderModel();
  });
} else {
  document.getElementById('model-title').textContent = 'Нет данных';
}

// ---- ФУНКЦИЯ ОТРИСОВКИ ----
function renderModel() {
  document.getElementById('model-title').textContent = title || "3D модель";
  const modelStatus = document.getElementById('model-status');
  if (modelStatus) {
    modelStatus.textContent = 'Просмотрщик загружен';
  }
  const canvas = document.getElementById('viewer-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe6ebf5);

  // camera и controls — глобальные!
  camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.set(0, 1.6, 4.2);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableZoom = true;
  controls.target.set(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
  dirLight.position.set(4, 10, 8);
  scene.add(dirLight);

  const loader = new GLTFLoader();
  let loaded = [];
  const gap = 1.8;

  function normalizeModel(model) {
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);

    model.position.x -= center.x;
    model.position.z -= center.z;
    model.position.y -= box.min.y;

    if (maxDimension > 0) {
      model.scale.multiplyScalar(5 / maxDimension);
    }
  }

  function createFallbackNewspaper() {
    const newspaperGroup = new THREE.Group();

    const newspaperGeometry = new THREE.BoxGeometry(2.2, 0.06, 1.5);
    const newspaperMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f5f5,
      roughness: 0.9,
    });
    const newspaperMesh = new THREE.Mesh(newspaperGeometry, newspaperMaterial);
    newspaperGroup.add(newspaperMesh);

    const headlineGeometry = new THREE.PlaneGeometry(1.6, 0.22);
    const headlineMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4d4d4,
      side: THREE.DoubleSide,
    });
    const headlineMesh = new THREE.Mesh(headlineGeometry, headlineMaterial);
    headlineMesh.rotation.x = -Math.PI / 2;
    headlineMesh.position.set(0, 0.04, -0.34);
    newspaperGroup.add(headlineMesh);

    const articleGeometry = new THREE.PlaneGeometry(1.6, 0.7);
    const articleMaterial = new THREE.MeshStandardMaterial({
      color: 0xe3e3e3,
      side: THREE.DoubleSide,
    });
    const articleMesh = new THREE.Mesh(articleGeometry, articleMaterial);
    articleMesh.rotation.x = -Math.PI / 2;
    articleMesh.position.set(0, 0.04, 0.15);
    newspaperGroup.add(articleMesh);

    scene.add(newspaperGroup);
    loaded.push(newspaperGroup);
  }

  if (toRender.length === 2) {
    toRender.forEach((item, i) => {
      loader.load(item.model, gltf => {
        const model = gltf.scene;
        normalizeModel(model);
        model.position.x = i === 0 ? -gap : gap;
        scene.add(model);
        loaded.push(model);
      });
    });
  } else if (toRender.length === 1) {
    const item = toRender[0];
    if (item.model) {
      loader.load(item.model, gltf => {
        const model = gltf.scene;
        normalizeModel(model);
        scene.add(model);
        loaded.push(model);
        if (modelStatus) {
          modelStatus.textContent = 'Модель газеты загружена';
        }
      }, undefined, () => {
        if (item.fallback === "newspaper") {
          createFallbackNewspaper();
          if (modelStatus) {
            modelStatus.textContent = 'Показан резервный макет газеты';
          }
        }
      });
    } else if (item.buffer) {
      loader.parse(item.buffer, '', gltf => {
        const model = gltf.scene;
        normalizeModel(model);
        scene.add(model);
        loaded.push(model);
      }, error => {
        alert('Не удалось загрузить модель');
        console.error(error);
      });
    }
  }

  // --- КНОПКИ УПРАВЛЕНИЯ ---
  document.getElementById('zoom-in').onclick = () => {
    const vec = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
    camera.position.addScaledVector(vec, -0.5);
    controls.update();
  };
  document.getElementById('zoom-out').onclick = () => {
    const vec = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
    camera.position.addScaledVector(vec, 0.5);
    controls.update();
  };

  const distance = () => camera.position.distanceTo(controls.target);

  function setCameraDirection(dir) {
    const d = distance();
    let x = 0, y = 1.6, z = 0;
    if (dir === "front")  { x = 0; z = d; }
    if (dir === "back")   { x = 0; z = -d; }
    if (dir === "left")   { x = -d; z = 0; }
    if (dir === "right")  { x = d; z = 0; }
    camera.position.set(x, y, z);
    controls.target.set(0, 0, 0);
    controls.update();
  }

  document.getElementById('view-front').onclick = () => setCameraDirection('front');
  document.getElementById('view-back').onclick = () => setCameraDirection('back');
  document.getElementById('view-left').onclick = () => setCameraDirection('left');
  document.getElementById('view-right').onclick = () => setCameraDirection('right');

  // --- Resize и animate ---
  function resizeRendererToDisplaySize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
    return needResize;
  }

  function animate() {
    requestAnimationFrame(animate);
    loaded.forEach(model => {
      model.rotation.y += 0.005;
    });
    controls.update();
    resizeRendererToDisplaySize();
    renderer.render(scene, camera);
  }
  resizeRendererToDisplaySize();
  animate();
  window.addEventListener('resize', resizeRendererToDisplaySize);
}
