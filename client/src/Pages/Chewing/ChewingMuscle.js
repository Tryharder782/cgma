import React from 'react';
import '../../style/ChewingMuscle.scss'
const ChewingMuscle = () => {
   return (
      <div className='chewingMuscleWrapper'>
         <div className="chewingMuscle">
            <img className='chewingImg' src="chewing.jpeg" alt="" />
            <div className="text">
               Жевательная мышца поднимает нижнюю челюсть и отвечает за силу укуса.
            </div>
            <img className='xrayImg' src="xray.png" alt="" />
            <div className="text">
               На рентгеновском снимке видно направление волокон и места их прикрепления к нижней челюсти.
            </div>
            <img className='videoImg' src="video.png" alt="" />
         </div>
      </div>
   );
};

export default ChewingMuscle;
