import React, { useState } from 'react';
import '../../style/Page.scss';
import '../../style/ChewingMuscle.scss';

const ChewingMuscle = () => {
   const [sliderValue, setSliderValue] = useState(50);

   const handleSliderChange = (e) => {
      setSliderValue(e.target.value);
   };

   return (
      <div className='pageWrapper'>
         <div className="pageContainer">
            <h1>Masseter Muscle</h1>
            
            <div className="chewingMuscleContent">
               <img className='chewingImg' src="chewing.jpeg" alt="Masseter muscle" />
               <div className="text">
                  <p>The masseter muscle raises the mandible and is responsible for the force of the bite. It is one of the strongest muscles in the human body.</p>
               </div>
               
               <h2>Radiography Comparison</h2>
               <div className="slider-container">
                  <div className="image-wrapper">
                     <img 
                        src="xray.png" 
                        alt="X-ray" 
                        className="slider-image bottom-image"
                     />
                     <img 
                        src="chewing.jpeg" 
                        alt="Muscle" 
                        className="slider-image top-image"
                        style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
                     />
                     <div 
                        className="slider-line" 
                        style={{ left: `${sliderValue}%` }}
                     >
                        <div className="slider-handle"></div>
                     </div>
                  </div>
                  <input 
                     type="range" 
                     min="0" 
                     max="100" 
                     value={sliderValue} 
                     onChange={handleSliderChange} 
                     className="slider-input"
                  />
                  <div className="slider-labels">
                     <span>Muscle</span>
                     <span>X-Ray</span>
                  </div>
               </div>
               
               <div className="text">
                  <p>The X-ray image shows the direction of the fibers and their attachment points to the mandible, which is important for understanding the biomechanics of movement.</p>
               </div>
               
               <h2>Video Materials</h2>
               <img className='videoImg' src="video.png" alt="Video" />
            </div>
         </div>
      </div>
   );
};

export default ChewingMuscle;
