import React, { useContext, useRef, useState } from 'react';
import UI from './UI';
import HideToggler from './HideToggler';

const UIWrapper = ({ hideObject, selectedObject}) => {
   const [isUiHidden, setIsUiHidden] = useState(true);
   const wrapperRef = useRef(null)

   const hideToggle = () => {
      setIsUiHidden(!isUiHidden)
   }
   return (
      <div ref = {wrapperRef} className='UIWrapper'>
         <UI isUiHidden={isUiHidden} wrapperRef={wrapperRef} hideObject={hideObject} />
         <HideToggler isUiHidden={isUiHidden} hideToggle={hideToggle} />
      </div>
   );
};

export default UIWrapper;
