import React, { useContext, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import CubeScene from './CubeScene';
import UIWrapper from './UIWrapper';
import { context } from '@react-three/fiber';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { SceneProvider, useScene } from './Scenecontext';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const CubeSceneWrapper = () => {
   const { updateModel } = useScene();
   const selectedObjectTabRef = useRef(null)
   const selectedObject = useRef('')

   const sceneRef = useRef(new THREE.Scene())
   // console.log(sceneRef)

   const modelRef = useRef(null); // Add this line
   const isModelLoadedRef = useRef(false);
   const navigate = useNavigate()
   let token;
   let accessToken;
   let user;
   useEffect(() => {
      token = localStorage.getItem('token')
      accessToken = localStorage.getItem('accessToken')
      console.log(token)
      if (token && !accessToken) {
         user = jwtDecode(token)
         console.log(user)
         if (user) {
            if (user.role === 'BASIC')
               navigate('/Profile')
         }
      }
      else if (!token && !accessToken){
         navigate('/Login')
      }
      
   }, [localStorage]);
   // const geometry = new THREE.PlaneGeometry(5, 5); // Width and height of the plane
   // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide }); // Green plane
   // const plane = new THREE.Mesh(geometry, material);
   // plane.rotation.x = -Math.PI / 2; // Rotate to lay flat
   // sceneRef.current.add(plane); // Assuming you have a `scene` object already created

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
   // Загрузка модели
   const loadModel = () => {
      if (user || accessToken) {
         if (user) {
            if (sceneRef.current && user.role !== 'BASIC') {
               const loader = new GLTFLoader();
               const dracoLoader = new DRACOLoader();
               dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.1/');
               loader.setDRACOLoader(dracoLoader);
               loader.load('skull.gltf', (gltf) => {
                  updateModel(gltf.scene.children)
                  modelRef.current = gltf.scene
                  sceneRef.current.add(modelRef.current)
                  isModelLoadedRef.current = true;
               }, undefined, (error) => {
                  console.error(error);
               });
            }
         }
         else if (accessToken) {
            const loader = new GLTFLoader();
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.1/');
            loader.setDRACOLoader(dracoLoader);
            loader.load('skull.gltf', (gltf) => {
               updateModel(gltf.scene.children)
               modelRef.current = gltf.scene
               sceneRef.current.add(modelRef.current)
               isModelLoadedRef.current = true;
            }, undefined, (error) => {
               console.error(error);
            });
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
      if (sceneRef.current.children.filter(obj => obj instanceof THREE.Group)) {
         addLights();
         loadModel();
      }
   }, []);
   



   return (
      // Adjust the Scenecontext.Provider in your return statement
      <div className="idk">
         <div className='CubeSceneWrapper'>
            <UIWrapper hideObject={hideModel}  />
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