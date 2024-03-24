import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import '../../style/CubeScene.scss';
import { useMyContext } from './CubeSceneWrapper';


const CubeScene = ({ setModel, setSelectedObject }) => {
   const mountRef = useRef(null);
   const requestRef = useRef();
   const { contextValue, updateContextValue } = useMyContext();

   useEffect(() => {
      const scene = new THREE.Scene();
      const skyColor = new THREE.Color(0xffffff);
      scene.background = skyColor;

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(-5, 0, 0);
      
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      mountRef.current.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.target.set(1,0,0)
      
      const mouse = new THREE.Vector2();
      const raycaster = new THREE.Raycaster();
      
      let isModelLoaded = false;
      let model = []
      let mouseDownPosition = { x: null, y: null }; // Use a local variable instead of state
      let selectedObject = null;
      
      function blinkEmissiveAnimation(object, duration = 1) {
         // Clone the material and apply it to the object
         const newMaterial = object.material.clone();
         object.material = newMaterial;

         // Store the original emissive color of the new material
         const originalEmissive = newMaterial.emissive.clone();

         // Convert the target emissive color from hex to a THREE.Color
         const targetEmissive = new THREE.Color(0x333333);

         // Create a timeline for the animation
         const tl = gsap.timeline({
            repeat: 1, // Repeat the sequence once for a total of two blinks
            yoyo: true, // Reverse the animation back to the original state
            onComplete: () => {
               // Restore the original emissive color for accuracy
               newMaterial.emissive.copy(originalEmissive);
               // Optional: Dispose of the cloned material if it's no longer needed
               // to free up memory.
            }
         });

         // Animate the emissive property of the new material
         tl.to(newMaterial.emissive, {
            r: targetEmissive.r,
            g: targetEmissive.g,
            b: targetEmissive.b,
            duration: duration / 4, // Adjust the duration to fit the blinking effect
            repeat: 1, // Make it blink twice
            yoyo: true, // Ensure it returns to the original state after each blink
            ease: "power1.inOut", // Smooth transition for the animation
         });
      }
      const onResize = () => {
         let x = mountRef.current.clientWidth-renderer.domElement.width
         renderer.domElement.style.transform = `translateX(${0}px)`;
      }
      // Добавление освещения
      const addLights = () => {
         const light = new THREE.DirectionalLight(0xffffff, 1);
         light.position.set(-2, 0, 0);
         const light2 = new THREE.DirectionalLight(0xffffff, 1);
         light2.position.set(2, 0, 0);
         const light3 = new THREE.DirectionalLight(0xffffff, 1);
         light3.position.set(0, 2, 0);
         scene.add(light);
         scene.add(light2);
         scene.add(light3);
      }

      const onMouseDown = (event) => {
         const rect = mountRef.current.getBoundingClientRect();

         mouseDownPosition = { // Update the local variable directly
            x : ((event.clientX - rect.left) / rect.width) * 2 - 1,
            y : -((event.clientY - rect.top) / rect.height) * 2 + 1
         };
      };
      // Обработчик отпускания кнопки мыши
      const onMouseUp = (event) => {
         if (camera !== null) {
            const rect = mountRef.current.getBoundingClientRect();
            const mouseUpX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const mouseUpY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            if (Math.abs(mouseDownPosition.x - mouseUpX) < 0.01 && Math.abs(mouseDownPosition.y - mouseUpY) < 0.01) {
               cameraFocusObject(event, camera); // Assumes cameraFocusObject method handles the logic
            }
         }
      }
      const cameraFocusObject = (event, camera) => {
         if (isModelLoaded && camera !== null && controls !== null) {
            event.preventDefault();
            const rect = mountRef.current.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(model);
            if (intersects.length > 0) {
               const targetObject = intersects[0].object;
               selectedObject = targetObject
               blinkEmissiveAnimation(targetObject);
               setSelectedObject(targetObject.name)
               const newTarget = targetObject.position;

               const startTarget = {
                  x: controls.target.x,
                  y: controls.target.y,
                  z: controls.target.z
               };
               // Use GSAP to animate from startTarget to newTarget
               gsap.to(startTarget, {
                  x: newTarget.x,
                  y: newTarget.y,
                  z: newTarget.z,
                  duration: 0.5  , // Duration of the animation in seconds
                  onUpdate: () => {
                     // Update controls.target on each tick of the animation
                     controls.target.set(startTarget.x, startTarget.y, startTarget.z);
                     controls.update(); // Required if damping is enabled or if you want to ensure the camera moves smoothly
                  }
               });
               camera.lookAt(controls.target)
            }
         }
      }
      // Подсветка объекта
      // const hoverGlow = (event) => {
      //    if (isModelLoaded && camera !== null && scene !== null) {
      //       const rect = mountRef.current.getBoundingClientRect();
      //       mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      //       mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      //       raycaster.setFromCamera(mouse, camera);
      //       const intersects = raycaster.intersectObjects(model, true);
      //       if (intersects.length>0 && intersects[0].object !== highlightedObject) {
      //          // console.log('before\nstoredMaterial : ', storedMaterial, 'highLightedObject : ', highlightedObject)
      //          if (highlightedObject !== null && storedMaterial !== null) {
      //             highlightedObject.material = storedMaterial
      //          }
      //          highlightedObject = intersects[0].object
      //          const newMaterial = highlightedObject.material.clone()
      //          storedMaterial = newMaterial
      //          newMaterial.emissive.set(0x333333)
      //          highlightedObject.material = newMaterial
      //          // console.log('after\nstoredMaterial : ', storedMaterial, 'highLightedObject : ', highlightedObject)
      //       }
      //       else if (intersects.length === 0){
      //          if (highlightedObject && storedMaterial){
      //             highlightedObject.material = storedMaterial
      //          }
      //          highlightedObject = null
      //          storedMaterial = null
      //       }
      //    }
      // }


      // Загрузка модели
      const loadModel = () => {
         const loader = new GLTFLoader();
         const dracoLoader = new DRACOLoader();
         dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.1/');
         loader.setDRACOLoader(dracoLoader);
         
         loader.load('skull.gltf', (gltf) => {
         model = gltf.scene.children
         // const degrees = 90;
         // model.rotation.y = degrees * (Math.PI / 180);
         scene.add(gltf.scene)
         console.log(scene)
         isModelLoaded = true;
         updateContextValue(model)
         }, undefined, (error) => {
            console.error(error);
         });
      };

      addLights();
      loadModel();

      mountRef.current.addEventListener('mousedown', onMouseDown);
      mountRef.current.addEventListener('mouseup', onMouseUp);
      const resizeObserver = new ResizeObserver(entries => {
         onResize();
      });

      if (mountRef.current) {
         resizeObserver.observe(mountRef.current);
      }

      // mountRef.current.addEventListener('mousemove', hoverGlow, false);

      const animate = () => {
         controls.update();
         renderer.render(scene, camera);
         requestRef.current = requestAnimationFrame(animate);
      };

      animate();

      return () => {
         cancelAnimationFrame(requestRef.current);
         if (mountRef.current){
            mountRef.current.removeChild(renderer.domElement);
            mountRef.current.removeEventListener('mousedown', onMouseDown);
            mountRef.current.removeEventListener('mouseup', onMouseUp);
            resizeObserver.unobserve(mountRef.current);
         }
         // mountRef.current.removeEventListener('mousemove', hoverGlow, false);
      };
   }, []);

   return <div className='CubeScene' ref={mountRef} />;
};

export default CubeScene;
