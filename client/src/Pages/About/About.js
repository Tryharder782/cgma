import React from 'react';
import '../../style/Page.scss';

const About = () => {
   return (
      <div className='pageWrapper'>
         <div className="pageContainer">
            <h1>About the Project</h1>
            <p>
               CGMA (Computer Generated Muscle Anatomy) is an interactive educational project dedicated to the study of gnathology and the anatomy of the masticatory apparatus.
            </p>
            <p>
               At the core of the project is a detailed 3D skull model that users can freely rotate, zoom, and examine from any angle. The project is designed to visually demonstrate anatomical structures, making it a useful tool for both medical students and practicing specialists.
            </p>
            <h2>Features</h2>
            <ul>
               <li>Interactive real-time 3D viewing.</li>
               <li>Detailed descriptions of muscles and ligaments (origin, insertion, function).</li>
               <li>Ability to hide individual elements to study deep structures.</li>
            </ul>
            <h2>Technologies</h2>
            <p>
               The application is developed using modern web technologies: React for the interface and React Three Fiber (Three.js) for 3D graphics rendering. This ensures high performance and accessibility directly in the browser without the need to install additional software.
            </p>
         </div>
      </div>
   );
};

export default About;
