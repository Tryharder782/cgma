import React from 'react';
import UI from './UI';

const UIWrapper = ({selectedObject}) => {
   return (
      <div className='UIWrapper'>
         <UI selectedObject={selectedObject} />
      </div>
   );
};

export default UIWrapper;