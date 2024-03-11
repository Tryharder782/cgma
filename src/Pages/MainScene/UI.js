import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UI = ({ selectedObject }) => {
   const navigate = useNavigate()

   const [isUIHidden, setIsUIHidden] = useState(false);

   const UIWrapperRef = useRef(null)
   const hideBtnRef = useRef(null)
   const menuInfoHandler = () => {
      console.log('menu info')
   }
   const hideMenu = () => {
      console.log('hide menu')
      if (!isUIHidden) {
         UIWrapperRef.current.style.opacity = '0'
         hideBtnRef.current.style.borderRadius = '3px'
         setIsUIHidden(true)
      }
      else {
         UIWrapperRef.current.style.opacity = '1'
         console.log(hideBtnRef)
         setIsUIHidden(false)
      }

   }
   return (
      <div className='UIWrapper2'>
         <div>
         </div>
         <div ref={UIWrapperRef} className="UI">
            <div ref={hideBtnRef} className="buttonWrapper">
               <div onClick={() => hideMenu()} className="button hideMenu">
                  hide
               </div>
            </div>
            {/* <div className="objectName">
                  {selectedObject !== '' && selectedObject}
               </div> */}
            <div className="UIMenu">
               <div onClick={() => {
                  menuInfoHandler();
                  navigate('/Chewing')
                  }} className="button info">
                  1
               </div>
            </div>
            <div className="UIMenu">
               <div onClick={() => menuInfoHandler()} className="button info">
                  2
               </div>
            </div>
            <div className="UIMenu last">
               <div onClick={() => menuInfoHandler()} className="button info">
                  3
               </div>
            </div>

         </div>

      </div>
   );
};

export default UI;