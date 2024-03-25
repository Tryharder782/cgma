import React, { useEffect, useRef } from 'react';

const HideToggler = ({isUiHidden, hideToggle}) => {
   const buttonRef = useRef(null) 
   // useEffect(() => {
   //    if (isUiHidden && buttonRef){
   //       buttonRef.current.style.transform = `translateX(-100px)`
   //    }
   //    else {
   //       buttonRef.current.style.transform = `translateX(0)`
   //    }
   // }, [isUiHidden]);
   
   return (
      <div ref={buttonRef} onClick={hideToggle} className='hideToggler'>
         {  isUiHidden && <div className="showUiButton button">{'>'}</div>
         }
         {  !isUiHidden && <div className="hideUiButton button">{'<'}</div>
         }
      </div>
   );
};

export default HideToggler;