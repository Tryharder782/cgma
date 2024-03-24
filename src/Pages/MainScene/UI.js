import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UI = ({ MyContext, isUiHidden, hideObject, wrapperRef, selectedObject }) => {
   const context = useContext(MyContext)
   let model = context.contextValue
   const [isModelLoaded, setIsModelLoaded] = useState(false);
   const [highlightedObject, setHighlightedObject] = useState(null);
   const navigate = useNavigate()
   const UIWrapperRef = useRef(null)
   const itemListRef = useRef(null)
   const hideBtnRef = useRef(null)

   const menuInfoHandler = () => {
      console.log('menu info')
   }

   useEffect(() => {
      if (model.length > 0) {
         setIsModelLoaded(true)
      }
      else {
         setIsModelLoaded(false)
      }
   }, [model]);

   useEffect(() => {
      if (isUiHidden) {
         UIWrapperRef.current.style.width = '0'
      }
      else {
         UIWrapperRef.current.style.width = '300px'
      }
   }, [isUiHidden]);

   useEffect(() => {
      const asdf = model.find(obj => obj.name === selectedObject)
      if (asdf) {
         const hObject = document.getElementById(asdf.uuid)
         if (hObject) {
            if (highlightedObject) {
               highlightedObject.style.background = 'transparent'
            }
            hObject.style.background = 'rgba(256,256,256,0.3)'
            hObject.scrollIntoView({ behavior: "smooth", block: "center" })
            setHighlightedObject(hObject)
         }
      }
   }, [selectedObject]);

   return (
      <div ref={UIWrapperRef} className='UIWrapper2'>

         <div ref={itemListRef} className="List">
            {/* <div className="objectName">
                  {selectedObject !== '' && selectedObject}
               </div> */}
            {isModelLoaded && model.map((object) =>
               <div key={object.uuid} id={object.uuid} className="item">
                  <div className="itemDesc">
                     {object.name.replace(/_/g, ' ')}
                  </div>
                  <div className="buttons">
                     <div onClick={() => { hideObject(object) }} className="toggleHide button">
                        H
                     </div>
                     <div onClick={() => { menuInfoHandler(); navigate('/Chewing') }} className="info button">
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