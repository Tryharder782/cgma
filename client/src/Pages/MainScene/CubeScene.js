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

   useEffect(() => {
      // console.log(refs.mountRef, renderer.current.domElement.style)
      const renderer = new THREE.WebGLRenderer()
      const skyColor = new THREE.Color(0xffffff);
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      const mouse = new THREE.Vector2()
      const raycaster = new THREE.Raycaster()
      
      const controls = new OrbitControls(camera, renderer.domElement)
      refs.sceneRef.current.background = skyColor;



      camera.position.set(0, 1   , -5);
      // camera.up.set(0, 1 , 0);

      renderer.setSize(window.innerWidth, window.innerHeight-61);
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
            console.log('asdf')
            event.preventDefault();
            const rect = mountRef.current.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(model);
            console.log(mouse, camera)
            if (intersects.length > 0) {
               const targetObject = intersects[0].object;
               blinkEmissiveAnimation(targetObject);
               refs.selectedObject.current = targetObject
               updateSelectedObject(targetObject)
               const newTarget = targetObject.position;
               console.log(newTarget)
               const startTarget = {
                  x: controls.target.x,
                  y: controls.target.y,
                  z: controls.target.z
               };
               if (refs.selectedObjectTabRef) {
                  refs.selectedObjectTabRef.current.style.transition = '0.5s ease'
                  refs.selectedObjectTabRef.current.style.opacity = 1
                  refs.selectedObjectTabRef.current.innerText = refs.selectedObject.current.name.replace(/_/g, ' ')
                  setTimeout(() => {
                     refs.selectedObjectTabRef.current.style.transition = '2s ease'
                     refs.selectedObjectTabRef.current.style.opacity = 0
                  }, 5000)
               }

               // Use GSAP to animate from startTarget to newTarget
               gsap.to(startTarget, {
                  x: newTarget.x,
                  y: newTarget.y,
                  z: newTarget.z,
                  duration: 0.5, // Duration of the animation in seconds
                  onUpdate: () => {
                     // Update controls.target on each tick of the animation
                     controls.target.set(startTarget.x, startTarget.y, startTarget.z);
                     controls.update(); // Required if damping is enabled or if you want to ensure the camera moves smoothly
                  }
               });
               camera.lookAt(controls.target)
               window.target = controls.target
            }
         }
      }
      // Подсветка объекта
      // const hoverGlow = (event) => {
      //    if (isModelLoaded && camera !== null && refs.sceneRef.current !== null) {
      //       const rect = mountRef.getBoundingClientRect();
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
