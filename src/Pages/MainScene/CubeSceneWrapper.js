import React, { useState } from 'react';
import CubeScene from './CubeScene';
import UIWrapper from './UIWrapper';

const CubeSceneWrapper = () => {

   const [selectedObject, setSelectedObject] = useState('');
   
   return (
      <div className='CubeSceneWrapper'>
         <UIWrapper selectedObject={selectedObject} />
         <CubeScene setSelectedObject={setSelectedObject} />
      </div>
   );
};

export default CubeSceneWrapper;