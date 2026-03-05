import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import '../../style/CubeScene.scss';
import { useScene } from './Scenecontext';

const CubeScene = ({ refs }) => {
   const { updateSelectedObject, selectedObject } = useScene();
   const { sceneRef, modelRef, isModelLoadedRef } = refs;

   const mountRef = useRef(null);
   const requestRef = useRef();
   const controlsRef = useRef(null);
   const updateSelectedObjectRef = useRef(updateSelectedObject);

   useEffect(() => {
      updateSelectedObjectRef.current = updateSelectedObject;
   }, [updateSelectedObject]);

   const blinkEmissiveAnimation = (object, duration = 1) => {
      const newMaterial = object.material.clone();
      object.material = newMaterial;

      const originalEmissive = newMaterial.emissive.clone();
      const targetEmissive = new THREE.Color(0x333333);

      const tl = gsap.timeline({
         repeat: 1,
         yoyo: true,
         onComplete: () => {
            newMaterial.emissive.copy(originalEmissive);
         }
      });

      tl.to(newMaterial.emissive, {
         r: targetEmissive.r,
         g: targetEmissive.g,
         b: targetEmissive.b,
         duration: duration / 4,
         repeat: 1,
         yoyo: true,
         ease: 'power1.inOut'
      });
   };

   useEffect(() => {
      if (!selectedObject || !controlsRef.current) {
         return;
      }

      blinkEmissiveAnimation(selectedObject);

      const newTarget = selectedObject.position;
      const startTarget = {
         x: controlsRef.current.target.x,
         y: controlsRef.current.target.y,
         z: controlsRef.current.target.z
      };

      gsap.to(startTarget, {
         x: newTarget.x,
         y: newTarget.y,
         z: newTarget.z,
         duration: 0.5,
         onUpdate: () => {
            if (controlsRef.current) {
               controlsRef.current.target.set(startTarget.x, startTarget.y, startTarget.z);
               controlsRef.current.update();
            }
         }
      });
   }, [selectedObject]);

   useEffect(() => {
      const mount = mountRef.current;
      const scene = sceneRef?.current;
      if (!mount || !scene) {
         return undefined;
      }

      const renderer = new THREE.WebGLRenderer();
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      const mouse = new THREE.Vector2();
      const raycaster = new THREE.Raycaster();

      const controls = new OrbitControls(camera, renderer.domElement);
      controlsRef.current = controls;
      scene.background = new THREE.Color(0xffffff);

      camera.position.set(0, 1, -5);

      const updateRendererSize = () => {
         const width = mount.clientWidth || window.innerWidth;
         const height = mount.clientHeight || window.innerHeight;

         renderer.setSize(width, height);
         camera.aspect = width / height;
         camera.updateProjectionMatrix();
      };

      updateRendererSize();
      mount.appendChild(renderer.domElement);

      controls.enableDamping = true;
      controls.target.set(1, 0, 0);
      controls.mouseButtons = {
         LEFT: THREE.MOUSE.ROTATE,
         MIDDLE: THREE.MOUSE.DOLLY,
         RIGHT: THREE.MOUSE.PAN
      };

      let mouseDownPosition = { x: null, y: null };

      const onMouseDown = (event) => {
         const rect = mount.getBoundingClientRect();
         mouseDownPosition = {
            x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
            y: -((event.clientY - rect.top) / rect.height) * 2 + 1
         };
      };

      const cameraFocusObject = (event, model) => {
         if (!isModelLoadedRef.current || !camera || !controls) {
            return;
         }

         event.preventDefault();
         const rect = mount.getBoundingClientRect();
         mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
         mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
         raycaster.setFromCamera(mouse, camera);

         const intersects = raycaster.intersectObjects(model);
         if (intersects.length > 0) {
            updateSelectedObjectRef.current(intersects[0].object);
         }
      };

      const onMouseUp = (event) => {
         const rect = mount.getBoundingClientRect();
         const mouseUpX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
         const mouseUpY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

         if (
            Math.abs(mouseDownPosition.x - mouseUpX) < 0.01 &&
            Math.abs(mouseDownPosition.y - mouseUpY) < 0.01 &&
            modelRef.current
         ) {
            cameraFocusObject(event, modelRef.current.children);
         }
      };

      mount.addEventListener('mousedown', onMouseDown);
      mount.addEventListener('mouseup', onMouseUp);
      window.addEventListener('resize', updateRendererSize);

      const animate = () => {
         controls.update();
         renderer.render(scene, camera);
         requestRef.current = requestAnimationFrame(animate);
      };

      animate();

      return () => {
         cancelAnimationFrame(requestRef.current);

         mount.removeEventListener('mousedown', onMouseDown);
         mount.removeEventListener('mouseup', onMouseUp);
         window.removeEventListener('resize', updateRendererSize);

         if (renderer.domElement.parentNode === mount) {
            mount.removeChild(renderer.domElement);
         }

         scene.traverse((object) => {
            if (object.isMesh) {
               object.geometry.dispose();
               if (object.material.isMaterial) {
                  if (object.material.map) {
                     object.material.map.dispose();
                  }
                  object.material.dispose();
               }
            }
         });

         controls.dispose();
         renderer.dispose();
         scene.children = [];
      };
   }, [isModelLoadedRef, modelRef, sceneRef]);

   return <div className='CubeScene' ref={mountRef} />;
};

export default CubeScene;
