// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import * as THREE from 'three';
// import { gsap } from 'gsap';
// import initSceneSettings from './SceneSettings';
// import '../../style/CubeScene.scss';
// import { useLoader } from '@react-three/fiber';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

// const CubeScene = ({ setSelectedObject }) => {
//    const mountRef = useRef(null);
//    const     = useRef();
//    const [isModelLoaded, setIsModelLoaded] = useState(false);
//    const [model, setModel] = useState([]);
//    const [mouseDownPosition, setMouseDownPosition] = useState({ x: null, y: null });

//    const [highlightedObject, setHighlightedObject] = useState(null);

//    const raycaster = new THREE.Raycaster();
//    const mouse = new THREE.Vector2();
//    function onModelLoaded(scene) {
//       setModel(() => {
//          console.log('onmodelloadded')
//          let result = scene.children.filter(child => child instanceof THREE.Group)[0].children
//          console.log(result)
//          return result
//       })
//       setIsModelLoaded(true)
//    }
//    useEffect(() => {


//       const scene = new THREE.Scene();
//       const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//       camera.position.set(0, 2, 5);

//       const renderer = new THREE.WebGLRenderer({ antialias: true });
//       renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);

//       renderer.shadowMap.enabled = true;
//       mountRef.current.appendChild(renderer.domElement);

//       // Направленный свет
//       const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//       directionalLight.position.set(0, 1, 2);
//       directionalLight.castShadow = true;
//       scene.add(directionalLight);
//       const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
//       directionalLight2.position.set(0, -1, -2);
//       directionalLight2.castShadow = true;
//       scene.add(directionalLight2);


//       const skyColor = new THREE.Color(0xffffff); // Цвет небесной лазури
//       scene.background = skyColor;

//       const loader = new GLTFLoader();
//       const dracoLoader = new DRACOLoader();
//       dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.1/'); // Указание пути к декодерам Draco
//       loader.setDRACOLoader(dracoLoader); // Передача экземпляра DRACOLoader в GLTFLoader

//       loader.load('skull.gltf', function (gltf) {
//          const model = gltf.scene;
//          // model.castShadow = false;
//          // model.receiveShadow = true;
//          // scene.add(model);

//          if (model) {
//             console.log('lol')
//             model.traverse((child) => {
//                if (child.isMesh && child.type === 'Mesh') {
//                   scene.add(child);
//                }
//             });

//          }

//          if (typeof onModelLoaded === "function") {
//             console.log('asdfasdf');
//             onModelLoaded(scene)
//          }
//       }, undefined, function (error) {
//          console.error(error);
//       });

//       const controls = new OrbitControls(camera, renderer.domElement);
//       controls.enableDamping = true;
//    }, []);


//    // Загрузка модели и установка состояний
//    useEffect(() => {

//       mountRef.current.appendChild(renderer.domElement);

//       const animate = () => {
//          controls.update();
//          renderer.render(scene, camera);
//          requestRef.current = requestAnimationFrame(animate);
//       };
//       animate();

//       return () => {
//          cancelAnimationFrame(requestRef.current);
//          mountRef.current.removeChild(renderer.domElement);
//       };
//    }, []);

//    // Обработчик нажатия кнопки мыши
//    const onMouseDown = useCallback((event) => {
//       const rect = mountRef.current.getBoundingClientRect();
//       const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//       const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
//       setMouseDownPosition({ x, y });
//    }, []);

//    // Обработчик отпускания кнопки мыши
//    const onMouseUp = useCallback((event) => {
//       if (camera !== null) {
//          // Логика определения "чистого" нажатия и вызова cameraFocusObject
//          const rect = mountRef.current.getBoundingClientRect();
//          const mouseUpX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//          const mouseUpY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
//          console.log(mouseDownPosition.x, mouseUpX, mouseDownPosition.x - mouseUpX)
//          // Проверка, находится ли позиция мыши при mouseup в том же месте, что и при mousedown
//          if (Math.abs(mouseDownPosition.x - mouseUpX) < 0.01 && Math.abs(mouseDownPosition.y - mouseUpY) < 0.01) {
//             // Местоположение считается одинаковым, выполняем логику нажатия
//             console.log('if true')
//             console.log(model)
//             cameraFocusObject(event, camera); // Предполагаем, что этот метод обрабатывает логику нажатия
//          }
//       }
//    }, [mouseDownPosition]);

//    // Обработчик фокусировки камеры на объекте
//    const cameraFocusObject = useCallback((event, camera) => {
//       if (isModelLoaded && camera != null && controls !== null) {
//          event.preventDefault();
//          const rect = mountRef.current.getBoundingClientRect();
//          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
//          raycaster.setFromCamera(mouse, camera);
//          const intersects = raycaster.intersectObjects(model, true);
//          if (intersects.length > 0) {
//             const targetObject = intersects[0].object;
//             console.log(targetObject.name)
//             setSelectedObject(targetObject.name)
//             const cameraDistance = camera.position.distanceTo(targetObject.position);

//             // Смена цели вращения камеры
//             controls.target.copy(targetObject.position);
//             let newPosition;
//             // Вычисление новой позиции камеры
//             const direction = new THREE.Vector3().subVectors(camera.position, targetObject.position).normalize();
//             console.log(cameraDistance)
//             // if (Math.round(cameraDistance) == 3) {
//             //    newPosition = new THREE.Vector3().addVectors(targetObject.position, direction.multiplyScalar(5));

//             // }
//             // else {
//             newPosition = new THREE.Vector3().addVectors(targetObject.position, direction.multiplyScalar(3));
//             // }
//             // Плавное перемещение камеры к новой позиции
//             gsap.to(camera.position, {
//                x: newPosition.x,
//                y: newPosition.y,
//                z: newPosition.z,
//                duration: 0.5,
//                onUpdate: () => {
//                   camera.lookAt(controls.target); // Обеспечиваем, что камера всегда смотрит на цель
//                }
//             });
//          }
//       }
//    }, [isModelLoaded, model]);

//    // Подсветка объекта
//    const hoverGlow = useCallback((event) => {
//       if (isModelLoaded && camera !== null && scene !== null) {
//          const rect = mountRef.current.getBoundingClientRect();
//          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

//          raycaster.setFromCamera(mouse, camera);
//          const intersects = raycaster.intersectObjects(model, true);

//          // Сброс подсветки у последнего подсвеченного объекта
//          if (highlightedObject) {
//             highlightedObject.material.emissive.set(0x000000);
//             setHighlightedObject(null); // Очищаем ссылку на последний подсвеченный объект
//          }

//          // Применение подсветки к новому объекту
//          scene.children.forEach(child => {
//             if (child.material && child.name) {
//                child.material.emissive.set(0x000000); // Предварительный сброс подсветки
//             }
//          });
//          if (intersects.length > 0) {
//             const firstIntersectedObject = intersects[0].object;
//             if (firstIntersectedObject.material && firstIntersectedObject.name) {
//                firstIntersectedObject.material.emissive.set(0x333333); // Подсветка нового объекта
//                setHighlightedObject(firstIntersectedObject); // Сохраняем ссылку на подсвеченный объект
//             }
//          }
//       }
//    }, [isModelLoaded, model, highlightedObject]);

//    // Установка и удаление обработчиков событий
//    useEffect(() => {
//       const mount = mountRef.current;
//       mount.addEventListener('mousedown', onMouseDown);
//       mount.addEventListener('mouseup', onMouseUp);
//       mount.addEventListener('mousemove', hoverGlow, false);

//       return () => {
//          mount.removeEventListener('mousedown', onMouseDown);
//          mount.removeEventListener('mouseup', onMouseUp);
//          mount.removeEventListener('mousemove', hoverGlow, false);

//       };
//    }, [onMouseDown, onMouseUp]);

//    return <div className='CubeScene' ref={mountRef} />;
// };

// export default CubeScene;
