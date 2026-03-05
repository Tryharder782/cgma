import React from 'react';
import { useProgress } from '@react-three/drei';
import '../../style/LoadingProgress.scss';

const LoadingProgress = () => {
   const { progress, loaded, total } = useProgress();

   return (
      <div className="loading-container">
         <div className="loading-content">
            <h2 className="loading-title">Loading 3D Model</h2>
            <div className="progress-bar-container">
               <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
               >
                  <div className="progress-bar-glow"></div>
               </div>
            </div>
            <div className="loading-info">
               <span className="progress-percentage">{progress.toFixed(0)}%</span>
               <span className="loading-items">{loaded} / {total} items</span>
            </div>
         </div>
      </div>
   );
};

export default LoadingProgress;
