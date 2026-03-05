import React, { useEffect, useRef, useState } from 'react';
import '../../style/Registration.scss';
import Input from './../Components/Input';
import { login, registration, loginGuest } from './../../http/userApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useScene } from '../MainScene/Scenecontext';
import { checkToken } from '../../http/accessTokenApi';

const Registration = () => {
   const { updateUser } = useScene();
   const warningRef = useRef(null);
   const tokenWindowRef = useRef(null);
   const stepOneRef = useRef(null);
   const stepTwoRef = useRef(null);

   const [usernameText, setUsernameText] = useState('');
   const [passwordText, setPasswordText] = useState('');
   const [warningShown, setWarningShown] = useState(false);
   const [name, setName] = useState('');
   const [surname, setSurname] = useState('');
   const [regStep, setRegStep] = useState(1);
   const [detailsInput, setDetailsInput] = useState('');
   const [isLoginPage, setIsLoginPage] = useState(false);
   const [isTokenWindowShown, setIsTokenWindowShown] = useState(false);
   const [tokenInputText, setTokenInputText] = useState('');

   const location = useLocation();
   const navigate = useNavigate();

   useEffect(() => {
      setIsLoginPage(location.pathname.split('/')[1] === 'Login');
   }, [location.pathname]);

   const submitAccessToken = async () => {
      await checkToken(tokenInputText);
      if (localStorage.getItem('accessToken')) {
         navigate('/');
      }
   };

   const guestLoginHandler = async () => {
      const data = await loginGuest();
      updateUser(data);
      navigate('/');
   };

   const nextButtonHandler = () => {
      if (!isLoginPage && !warningShown) {
         warningRef.current.style.opacity = 1;
         warningRef.current.style.transform = 'translateX(0)';
         setWarningShown(true);
         return;
      }

      if (!isLoginPage) {
         setRegStep(2);
         return;
      }

      if (usernameText && passwordText) {
         submithandler();
      }
   };

   const confirmButtonHandler = () => {
      warningRef.current.style.opacity = 0;
      setTimeout(() => {
         warningRef.current.style.transform = 'translateX(100vw)';
      }, 300);
      setRegStep(2);
   };

   const submithandler = async () => {
      const formData = new FormData();
      formData.append('username', usernameText);
      formData.append('password', passwordText);

      const data = isLoginPage
         ? await login(formData)
         : await registration(formData);

      updateUser(data);
      navigate('/');
   };

   const toggleTokenWindowHide = () => {
      setIsTokenWindowShown(!isTokenWindowShown);
   };

   useEffect(() => {
      if (isTokenWindowShown) {
         tokenWindowRef.current.style.opacity = 1;
         tokenWindowRef.current.style.transform = 'translateX(0)';
      } else {
         tokenWindowRef.current.style.opacity = 0;
         setTimeout(() => {
            tokenWindowRef.current.style.transform = 'translateX(-100vw)';
         }, 300);
      }
   }, [isTokenWindowShown]);

   useEffect(() => {
      if (regStep === 1) {
         stepOneRef.current.style.transform = 'translateX(0)';
         stepTwoRef.current.style.transform = 'translateX(100vw)';
      } else {
         stepOneRef.current.style.transform = 'translateX(-100vw)';
         stepTwoRef.current.style.transform = 'translateX(0)';
      }
   }, [regStep]);

   return (
      <div className='RegistrationWrapper'>
         <div ref={stepOneRef} className="RegistrationContainer">
            <div className="title">
               <div className="mainTitle">Gnathology Knowledge Base</div>
               <div className="page">{!isLoginPage ? 'Registration' : 'Login'}</div>
               <div className="subText">{!isLoginPage ? 'Welcome!' : 'Welcome back!'}</div>
            </div>
            <div className="inputs">
               <div className="row1 row">
                  <div className="inputName">Username</div>
                  <div className="Input username">
                     <Input type={'text'} text={usernameText} setText={setUsernameText} />
                  </div>
               </div>
               <div className="row2 row">
                  <div className="inputName">Password</div>
                  <div className="Input password">
                     <Input type={'password'} text={passwordText} setText={setPasswordText} />
                  </div>
               </div>
            </div>
            <div className="links">
               <div className="row row1">
                  <div onClick={nextButtonHandler} className="button linksButton">{!isLoginPage ? 'Next' : 'Sign In'}</div>
               </div>
               <div className="row row2">
                  <div className="helpLinks">
                     <div onClick={() => navigate(isLoginPage ? '/Registration' : '/Login')} className="link">
                        {isLoginPage ? 'No account? Register' : 'Already have an account? Sign in'}
                     </div>
                     <div onClick={toggleTokenWindowHide} className="link">Sign in with access token</div>
                     <div onClick={guestLoginHandler} className="link">Continue as guest</div>
                  </div>
               </div>
            </div>
         </div>
         <div ref={warningRef} className="warningWrapper">
            <div className="warningContainer">
               <div className="warningText">
                  Warning
                  <div className="wraningSubText">
                     By using the materials on this website, you confirm that they are intended for educational and reference use only. The project author is not responsible for any incorrect application of the information.
                  </div>
               </div>
               <div onClick={confirmButtonHandler} className="confirmButton">
                  Accept
               </div>
            </div>
         </div>
         <div ref={stepTwoRef} className='accessRequestWrapper'>
            <div className="accessRequestContainer">
               <div className="title">
                  <div className="mainTitle">Request Access</div>
                  <div className="subTitle">To get access to this website's materials, please contact the administration.</div>
               </div>
               <div className="inputs">
                  <div className="row1 row">
                     <div className="inputName">First name</div>
                     <div className="Input username">
                        <Input type={'text'} text={name} setText={setName} />
                     </div>
                  </div>
                  <div className="row2 row">
                     <div className="inputName">Last name</div>
                     <div className="Input password">
                        <Input type={'text'} text={surname} setText={setSurname} />
                     </div>
                  </div>
               </div>
               <div className="details">
                  <div className="detailsInput">
                     <textarea
                        placeholder='Add details here...'
                        className='textarea'
                        wrap={'hard'}
                        name="details"
                        id="details"
                        cols="90"
                        rows="13"
                        value={detailsInput}
                        onChange={(event) => setDetailsInput(event.target.value)}
                     />
                  </div>
               </div>
               <div className="buttons">
                  <div onClick={() => setRegStep(1)} className="backButton button">Back</div>
                  <div onClick={submithandler} className={`submitButton button ${name === '' || surname === '' || usernameText === '' || passwordText === '' ? 'locked' : ''}`}>Submit</div>
               </div>
            </div>
         </div>
         <div ref={tokenWindowRef} className="tokenWindowWrapper">
            <div className="tokenWindowContainer">
               <div className="tokenWindowText">
                  Enter access token:
               </div>
               <div className="tokenWindowInput">
                  <Input type={'text'} text={tokenInputText} setText={setTokenInputText} />
               </div>

               <div className="buttons">
                  <div onClick={toggleTokenWindowHide} className="hideButton button">
                     Close
                  </div>
                  <div onClick={submitAccessToken} className="submitButton button">
                     Confirm
                  </div>
               </div>

            </div>
         </div>
      </div>
   );
};

export default Registration;
