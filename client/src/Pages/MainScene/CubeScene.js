import React, { useContext, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import '../../style/CubeScene.scss';
import { useScene } from './Scenecontext';

const CubeScene = ({ refs }) => {
   // console.log('rerender', refs.sceneRef)
   const { updateSelectedObject, selectedObject } = useScene();
   const mountRef = useRef(null);
   const requestRef = useRef();
   const controlsRef = useRef(null);

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

   useEffect(() => {
      if (selectedObject && controlsRef.current) {
         const targetObject = selectedObject;
         blinkEmissiveAnimation(targetObject);

         const newTarget = targetObject.position;
         const startTarget = {
            x: controlsRef.current.target.x,
            y: controlsRef.current.target.y,
            z: controlsRef.current.target.z
         };

         // Use GSAP to animate from startTarget to newTarget
         gsap.to(startTarget, {
            x: newTarget.x,
            y: newTarget.y,
            z: newTarget.z,
            duration: 0.5, // Duration of the animation in seconds
            onUpdate: () => {
               // Update controls.target on each tick of the animation
               if (controlsRef.current) {
                  controlsRef.current.target.set(startTarget.x, startTarget.y, startTarget.z);
                  controlsRef.current.update(); // Required if damping is enabled or if you want to ensure the camera moves smoothly
               }
            }
         });
      }
   }, [selectedObject]);

   useEffect(() => {
      // console.log(refs.mountRef, renderer.current.domElement.style)
      const renderer = new THREE.WebGLRenderer()
      const skyColor = new THREE.Color(0xffffff);
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      const mouse = new THREE.Vector2()
      const raycaster = new THREE.Raycaster()

      const controls = new OrbitControls(camera, renderer.domElement)
      controlsRef.current = controls;
      refs.sceneRef.current.background = skyColor;



      camera.position.set(0, 1, -5);
      // camera.up.set(0, 1 , 0);

      renderer.setSize(window.innerWidth, window.innerHeight - 61);
      console.log(mountRef)
      mountRef.current.appendChild(renderer.domElement);

      controls.enableDamping = true;
      controls.target.set(1, 0, 0)
      controls.mouseButtons = {
         LEFT: THREE.MOUSE.ROTATE,
         MIDDLE: THREE.MOUSE.DOLLY,
         RIGHT: THREE.MOUSE.PAN
      }
      console.log(controls)


      let mouseDownPosition = { x: null, y: null }; // Use a local variable instead of state

      const onResize = () => {
         if (renderer.domElement) {
            console.log(renderer.domElement.clientWidth)
         }

      }
      // Добавление освещения

      const onMouseDown = (event) => {
         const rect = mountRef.current.getBoundingClientRect();

         mouseDownPosition = { // Update the local variable directly
            x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
            y: -((event.clientY - rect.top) / rect.height) * 2 + 1
         };
      };
      // Обработчик отпускания кнопки мыши
      const onMouseUp = (event) => {
         if (camera !== null) {
            const rect = mountRef.current.getBoundingClientRect();
            const mouseUpX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const mouseUpY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            if (Math.abs(mouseDownPosition.x - mouseUpX) < 0.01 && Math.abs(mouseDownPosition.y - mouseUpY) < 0.01) {
               cameraFocusObject(event, refs.modelRef.current.children); // Assumes cameraFocusObject method handles the logic
            }
         }
      }

      const cameraFocusObject = (event, model) => {
         if (refs.isModelLoadedRef && camera !== null && controls !== null) {
            event.preventDefault();
            const rect = mountRef.current.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(model);

            if (intersects.length > 0) {
               const targetObject = intersects[0].object;
               updateSelectedObject(targetObject);
            }
         }
      }

      mountRef.current.addEventListener('mousedown', onMouseDown);
      mountRef.current.addEventListener('mouseup', onMouseUp);
      // mountRef.addEventListener('click', (event) => cameraFocusObject(event, refs.modelRef.current.children));

      const resizeObserver = new ResizeObserver(entries => {
         onResize();
      });

      if (mountRef.current) {
         resizeObserver.observe(mountRef.current);
      }

      // mountRef.addEventListener('mousemove', hoverGlow, false);

      const animate = () => {
         controls.update();
         renderer.render(refs.sceneRef.current, camera);
         requestRef.current = requestAnimationFrame(animate);
      };

      animate();



      return () => {
         cancelAnimationFrame(requestRef.current);
         if (mountRef.current) {
            mountRef.current.removeChild(renderer.domElement);
            mountRef.current.removeEventListener('mousedown', onMouseDown);
            mountRef.current.removeEventListener('mouseup', onMouseUp);
            // mountRef.removeEventListener('click', (event) => cameraFocusObject(event, refs.modelRef.current.children));
            resizeObserver.unobserve(mountRef.current);
            refs.sceneRef.current.traverse(function (object) {
               if (object.isMesh) {
                  object.geometry.dispose();
                  if (object.material.isMaterial) {
                     // For materials with a map, dispose of the map
                     if (object.material.map) object.material.map.dispose();
                     // Dispose of any material properties that need to be cleaned up
                     object.material.dispose();
                  }
               }
            });
            controls.dispose();
            renderer.dispose(); // Dispose of the renderer and any associated resources

            // Optionally reset the sceneRef if needed
            refs.sceneRef.current.children = [];
         }
         // mountRef.removeEventListener('mousemove', hoverGlow, false);
      };
   }, []);
   return <div className='CubeScene' ref={mountRef} />;
};

export default CubeScene;
