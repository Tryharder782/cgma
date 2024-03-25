import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScene } from './Scenecontext';


const UI = ({ isUiHidden, hideObject, wrapperRef }) => {
   const { model } = useScene();
   const [isModelLoaded, setIsModelLoaded] = useState(false);
   const navigate = useNavigate()
   const UIWrapperRef = useRef(null)
   const itemListRef = useRef(null)


   const menuInfoHandler = () => {
      console.log('menu info')
   }

   useEffect(() => {
      console.log('Model loaded:', model);

      if (model) {
         setIsModelLoaded(true)
      }
      else {
         setIsModelLoaded(false)
      }
   }, [model]);


   useEffect(() => {
      console.log(isUiHidden)
      if (isUiHidden) {
         UIWrapperRef.current.style.width = '0'
      }
      else {
         UIWrapperRef.current.style.width = '300px'
      }
   }, [isUiHidden]);

   return (
      <div ref={UIWrapperRef} className='UIWrapper2'>

         <div ref={itemListRef} className="List">
            {/* <div className="objectName">
                  {selectedObject !== '' && selectedObject}
               </div> */}
            {isModelLoaded && model.map((object) =>
               <div key={object.uuid} id={object.name} className="item">
                  <div className="itemDesc">
                     {object.name.replace(/_/g, ' ')}
                  </div>
                  <div className="buttons">
                     <div style={{opacity : object.visible ? 1 : 0.5}} onClick={(e) => { hideObject(e,object); console.log(object.visible) }} className="toggleHide button">
                        H
                     </div>
                     <div onClick={() => { menuInfoHandler(); /*navigate('/Chewing')*/ }} className="info button">
                        I
                     </div>
                  </div>
               </div>
            )
            }
         </div>
      </div>
   );
};

export default UI;