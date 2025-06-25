import React from 'react';
import '../../style/About.scss'
const About = () => {
   return (
      <div className='aboutWrapper'>
         <div className="aboutContainer">
            CGMA — мой небольшой исследовательский проект, посвящённый изучению гнатологии. 
            Здесь размещена интерактивная 3D‑модель черепа, которую можно свободно вращать и рассматривать со всех сторон. 
            Проект демонстрирует возможности Three.js и React Three Fiber и служит учебным пособием для студентов-медиков. 
            В дальнейшем планируется расширять коллекцию моделей и добавлять новые материалы.
         </div>
      </div>
   );
};

export default About;
