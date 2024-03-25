import React from 'react';
import '../../style/Registration.scss'

const Registration = () => {
   return (
      <div className='RegistrationWrapper'>
         <div className="title">
            <div className="mainTitle">Gnathology</div>
            <div className="page">Registration</div>
            <div className="subText">Welcome, new user!</div>
         </div>
         <div className="inputs">
            <div className="row1 row">
               <div className="inputName">Username</div>
               <div className="Input">
                  <div className="username"></div>
               </div>
            </div>
            <div className="row2 row">
               <div className="inputName">Password</div>
               <div className="Input">
                  <div className="password"></div>
               </div>
            </div>
         </div>
         <div className="links">
            <div className="row row1">
               <div className="button linksButton">next</div>
            </div>
            <div className="row row2">
               <div className="helpLinks">
                  <div className="link">Have an account? Log in</div>
                  <div className="link">Insert token here</div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Registration;