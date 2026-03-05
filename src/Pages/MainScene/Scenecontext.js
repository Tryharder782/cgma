// Scenecontext.js
import React, { createContext, useState, useContext } from 'react';

const Scenecontext = createContext();

export const SceneProvider = ({ children }) => {
   const [model, setModel] = useState(null);
   const [selectedObject, setSelectedObject] = useState(null)
   const [user, setUser] = useState(null);

   const updateModel = (newModel) => {
      setModel(newModel);
   };
   const updateSelectedObject = (newObject) => {
      console.log("updateSelectedObject", newObject);
      setSelectedObject(newObject);
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
