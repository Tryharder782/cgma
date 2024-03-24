import React, { useContext, useRef, useState } from 'react';
import UI from './UI';
import HideToggler from './HideToggler';

const UIWrapper = ({hideObject, MyContext, selectedObject}) => {
   const [isUiHidden, setIsUiHidden] = useState(false);
   const wrapperRef = useRef(null)

   const hideToggle = () => {
      setIsUiHidden(!isUiHidden)
   }
   return (
      <div ref = {wrapperRef} className='UIWrapper'>
         <UI MyContext={MyContext} isUiHidden={isUiHidden} wrapperRef={wrapperRef} selectedObject={selectedObject} hideObject={hideObject} />
         <HideToggler isUiHidden={isUiHidden} hideToggle={hideToggle} />
      </div>
   );
};

export default UIWrapper;
