import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import initSceneSettings from './SceneSettings';
import '../../style/CubeScene.scss'
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const CubeScene = ({ setSelectedObject }) => {
   const mountRef = useRef(null);
   const requestRef = useRef(); // Хранение идентификатора для requestAnimationFrame

   // const gltf = useLoader(GLTFLoader, 'skull.glb')

   // gltf.position.set(0, 0, 0); // Задайте нужное положение модели
   // gltf.castShadow = true;
   // gltf.receiveShadow = true;

   useEffect(() => {

      const { scene, camera, renderer, controls } = initSceneSettings(mountRef)
      mountRef.current.appendChild(renderer.domElement);
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      // scene.add(gltf)


      function cameraFocusObject(event) {
         event.preventDefault();

         const rect = mountRef.current.getBoundingClientRect();
         mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
         mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

         raycaster.setFromCamera(mouse, camera);
         const intersects = raycaster.intersectObjects([0], true);
         if (intersects.length > 0) {
            const targetObject = intersects[0].object;
            setSelectedObject(targetObject.name)
            const cameraDistance = camera.position.distanceTo(targetObject.position);

            // Смена цели вращения камеры
            controls.target.copy(targetObject.position);
            let newPosition;
            // Вычисление новой позиции камеры
            const direction = new THREE.Vector3().subVectors(camera.position, targetObject.position).normalize();
            console.log(cameraDistance)
            if (Math.round(cameraDistance) == 3) {
               newPosition = new THREE.Vector3().addVectors(targetObject.position, direction.multiplyScalar(5));

            }
            else {
               newPosition = new THREE.Vector3().addVectors(targetObject.position, direction.multiplyScalar(3));
            }
            // Плавное перемещение камеры к новой позиции
            gsap.to(camera.position, {
               x: newPosition.x,
               y: newPosition.y,
               z: newPosition.z,
               duration: 0.5,
               onUpdate: () => {
                  camera.lookAt(controls.target); // Обеспечиваем, что камера всегда смотрит на цель
               }
            });
         }
      }
      function onDocumentMouseUp(event) {
         // cameraFocusObject(event);
      }
      function hoverGlow(event) {

         const rect = mountRef.current.getBoundingClientRect();
         mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
         mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

         raycaster.setFromCamera(mouse, camera);
         const intersects = raycaster.intersectObjects(scene.children, true);

         scene.children.forEach(child => {
            if (child.material && child.name) { // Убедитесь, что у объекта есть материал и имя
               child.material.emissive.set(0x000000); // Сброс подсветки
            }
         });

         for (let i = 0; i < intersects.length; i++) {
            if (intersects[i].object.material && intersects[i].object.name) {
               intersects[i].object.material.emissive.set(0x333333); // Подсветка объекта
               break; // Подсвечиваем только первый объект под курсором
            }
         }
      }



      // window.addEventListener('mouseup', onDocumentMouseUp, false);

      // window.addEventListener('mousemove', hoverGlow, false);
      const animate = () => {
         controls.update();
         renderer.render(scene, camera);
         requestRef.current = requestAnimationFrame(animate); // Обновление идентификатора
     };

      // При возникновении события (например, щелчок мыши), начать анимацию перемещения камеры к объекту
      function moveCameraToObject(object) {
         // Определите начальную позицию камеры и направление
         const initialDirection = camera.getWorldDirection(new THREE.Vector3()).clone();

         // Определите конечную позицию камеры
         const targetDirection = new THREE.Vector3(3, 3, 3);
         console.log(object)
         // Продолжительность анимации и переменные для отслеживания времени
         const duration = 1000; // в миллисекундах
         let startTime = null;

         // Функция анимации, вызываемая на каждом кадре
         function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsedTime = currentTime - startTime;

            // Вычислить прогресс анимации (от 0 до 1)
            const progress = Math.min(elapsedTime / duration, 1);

            // Интерполировать положение и направление камеры между начальной и конечной точками

            const newDirection = initialDirection.clone().lerp(targetDirection, progress);

            // Установить новую позицию и направление камеры
            camera.lookAt(newDirection);
            console.log(newDirection)
            // Если анимация не завершена, продолжить анимацию на следующем кадре
            if (progress < 1) {
               requestAnimationFrame(animate);
            }
         }

         // Начать анимацию
         requestAnimationFrame(animate);
      }


      animate();

      return () => {
         cancelAnimationFrame(requestRef.current); // Остановка анимационного цикла
         scene.children.forEach(child => {
            if (child.material) {
               child.material.dispose(); // Освобождение материала
            }
            if (child.geometry) {
               child.geometry.dispose(); // Освобождение геометрии
            }
            if (child.texture) {
               child.texture.dispose(); // Освобождение текстуры
            }
            scene.remove(child); // Удаление объекта из сцены
         });
         if (renderer) {
            renderer.dispose(); // Освобождение рендерера
         }
         if (mountRef.current) {
            mountRef.current.removeChild(renderer.domElement); // Удаление элемента рендерера из DOM
         }
         window.removeEventListener('mouseup', onDocumentMouseUp, false);
         window.removeEventListener('mousemove', hoverGlow, false);
      };
   }, []);

   return <div className='CubeScene' ref={mountRef} />;
};

export default CubeScene;
