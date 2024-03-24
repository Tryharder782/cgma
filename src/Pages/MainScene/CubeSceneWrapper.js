import React, { useContext, useEffect, useRef, useState } from 'react';
import CubeScene from './CubeScene';
import UIWrapper from './UIWrapper';
const MyContext = React.createContext();

const CubeSceneWrapper = () => {
   const selectedObjectTabRef = useRef(null)
   const [contextValue, setContextValue] = useState([]);
   const [selectedObject, setSelectedObject] = useState('');
   let model = [];

   const hideObject = (objectPassed, modelToIterate) => {
      const objectToHide = modelToIterate.find(obj => obj.name === objectPassed.name)
   }
   
   const updateContextValue = (newValue) => {
      setContextValue(newValue);
   };

   useEffect(() => {
      if (selectedObjectTabRef){
         selectedObjectTabRef.current.style.transition = '0.5s ease'
         selectedObjectTabRef.current.style.opacity = 1
         setTimeout(() => {
            selectedObjectTabRef.current.style.transition = '2s ease'
            selectedObjectTabRef.current.style.opacity = 0
         }, 5000)

      }
   }, [selectedObject]);

   return (
      <MyContext.Provider value={{ contextValue, updateContextValue }}>
         <div className='CubeSceneWrapper'>
            <UIWrapper hideObject={hideObject} MyContext={MyContext} selectedObject={selectedObject} />
            <CubeScene setSelectedObject={setSelectedObject} />
         </div>
         <div ref={selectedObjectTabRef} className="selectedObject">{selectedObject.replace(/_/g, ' ')}</div>
      </MyContext.Provider>
   );
};

export default CubeSceneWrapper;
export const useMyContext = () => useContext(MyContext);