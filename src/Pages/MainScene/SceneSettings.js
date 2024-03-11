import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';


function initSceneSettings(mountRef) {
   const scene = new THREE.Scene();
   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
   camera.position.set(0, 2, 5);

   const renderer = new THREE.WebGLRenderer({ antialias: true });
   renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);

   renderer.shadowMap.enabled = true;
   mountRef.current.appendChild(renderer.domElement);

   // Направленный свет
   const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
   directionalLight.position.set(0, 1, 2);
   directionalLight.castShadow = true;
   scene.add(directionalLight);
   const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
   directionalLight2.position.set(0, -1, -2);
   directionalLight2.castShadow = true;
   scene.add(directionalLight2);


   const skyColor = new THREE.Color(0xffffff); // Цвет небесной лазури
   scene.background = skyColor;

   const loader = new GLTFLoader();
   const dracoLoader = new DRACOLoader();
   dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.1/'); // Указание пути к декодерам Draco
   loader.setDRACOLoader(dracoLoader); // Передача экземпляра DRACOLoader в GLTFLoader

   loader.load('skull.glb', function (gltf) {
      const model = gltf.scene;
      model.position.set(0, 0, 0); // Задайте нужное положение модели
      model.castShadow = false;
      model.receiveShadow = true;
      scene.add(model);
   }, undefined, function (error) {
      console.error(error);
   });

   const controls = new OrbitControls(camera, renderer.domElement);
   controls.enableDamping = true;

   return { scene, camera, renderer, directionalLight, controls };
}

export default initSceneSettings;