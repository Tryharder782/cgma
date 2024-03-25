// Scenecontext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const Scenecontext = createContext();

export const SceneProvider = ({ children }) => {
   const [model, setModel] = useState(null);
   const [selectedObject, setSelectedObject] = useState(null)
   const [user, setUser] = useState(null);

   const updateModel = (newModel) => {
      setModel(newModel);
   };
   const updateSelectedObject = (newObject, ) => {
      console.log(selectedObject)
      console.log("updateSelectedObject", newObject);
      setSelectedObject(prev => {
         if (prev){
            document.getElementById(prev.name).style.background = 'transparent'
         }
         const newElement = document.getElementById(newObject.name)
         newElement.style.background = 'rgba(256,256,256,0.3)'
         newElement.scrollIntoView({behavior: 'smooth', block: 'center'})
         return newObject
      });
   }

   const updateUser = (newUser) => {
      console.log(newUser)
      setUser(newUser)
   } 

   return (
      <Scenecontext.Provider value={{ model, selectedObject, user, updateSelectedObject, updateModel, updateUser }}>
         {children}
      </Scenecontext.Provider>
   );
};

export const useScene = () => useContext(Scenecontext);
