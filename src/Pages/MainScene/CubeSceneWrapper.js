import React, { useContext, useEffect, useRef, useState, Suspense } from 'react';
import * as THREE from 'three';
import CubeScene from './CubeScene';
import UIWrapper from './UIWrapper';
import { context } from '@react-three/fiber';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { SceneProvider, useScene } from './Scenecontext';
import { useGLTF } from '@react-three/drei';

// Component to handle model loading with Suspense
const ModelLoader = ({ onLoad }) => {
   const { scene } = useGLTF('/skull-v1.glb');

   useEffect(() => {
      if (scene) {
         onLoad(scene);
      }
   }, [scene, onLoad]);

   return null;
};

// Preload the model
useGLTF.preload('/skull-v1.glb');

const CubeSceneWrapper = () => {
   const { updateModel } = useScene();
   const selectedObjectTabRef = useRef(null)
   const selectedObject = useRef('')

   const sceneRef = useRef(new THREE.Scene())
   // console.log(sceneRef)

   const modelRef = useRef(null);
   const isModelLoadedRef = useRef(false);

   const addLights = () => {
      if (sceneRef.current) {
         const light = new THREE.DirectionalLight(0xffffff, 1);
         light.position.set(-2, 0, 0);
         const light2 = new THREE.DirectionalLight(0xffffff, 1);
         light2.position.set(2, 0, 0);
         const light3 = new THREE.DirectionalLight(0xffffff, 1);
         light3.position.set(0, 2, 0);
         const light4 = new THREE.DirectionalLight(0xffffff, 1);
         light3.position.set(0, -2, 0);

         sceneRef.current.add(light);
         sceneRef.current.add(light2);
         sceneRef.current.add(light3);
         sceneRef.current.add(light4);

      }
   }

   const handleModelLoad = (scene) => {
      if (sceneRef.current && !isModelLoadedRef.current) {
         modelRef.current = scene;
         sceneRef.current.add(modelRef.current);
         updateModel(scene.children);
         isModelLoadedRef.current = true;
         // Ensure lights are added
         if (sceneRef.current.children.filter(obj => obj instanceof THREE.DirectionalLight).length === 0) {
            addLights();
         }
      }
   };

   const hideModel = (e, target) => {
      console.log(modelRef.current.children.find(obj => obj.name === target.name))
      const objectToChange = modelRef.current.children.find(obj => obj.name === target.name)
      objectToChange.visible = !objectToChange.visible
      console.log(e.target.style)
      e.target.style.opacity = objectToChange.visible ? 1 : 0.5
   }

   useEffect(() => {
      // Initial setup if needed, but mostly handled by ModelLoader now
      if (sceneRef.current) {
         addLights();
      }
   }, []);

   return (
      <div className="idk">
         <div className='CubeSceneWrapper'>
            <UIWrapper hideObject={hideModel} />
            <Suspense fallback={null}>
               <ModelLoader onLoad={handleModelLoad} />
            </Suspense>
            <CubeScene refs={{
               sceneRef,
               modelRef,
               isModelLoadedRef,
               selectedObject,
               selectedObjectTabRef,
            }} />
         </div>
         <div className="selectedObjectWrapper">
            <div ref={selectedObjectTabRef} className="selectedObject"></div>
         </div>
      </div>
   );
};

export default CubeSceneWrapper;