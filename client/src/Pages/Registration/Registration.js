import React, { useEffect, useRef, useState } from 'react';
import '../../style/Registration.scss'
import Input from './../Components/Input';
import { login, registration } from './../../http/userApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useScene } from '../MainScene/Scenecontext';
import { checkToken } from '../../http/accessTokenApi';

const Registration = ({ }) => {
   const { updateUser } = useScene()
   const warningRef = useRef(null)
   const tokenWindowRef = useRef(null)
   const stepOneRef = useRef(null)
   const stepTwoRef = useRef(null)
   const [usernameText, setUsernameText] = useState('');
   const [passwordText, setPasswordText] = useState('');
   const [showWarning, setShowWarning] = useState(false)
   const [warningShown, setWarningShown] = useState(false);
   const [name, setName] = useState('')
   const [surname, setSurname] = useState('')
   const [regStep, setRegStep] = useState(1);
   const [detailsInput, setDetailsInput] = useState('');
   const [isLoginPage, setIsLoginPage] = useState(false);
   const [isTokenWindowShown, setIsTokenWindowShown] = useState(false);
   const [tokenInputText, setTokenInputText] = useState('');


   const location = useLocation()

   useEffect(() => {
      switch (location.pathname.split('/')[1]) {
         case 'Login':
            setIsLoginPage(true)
            break;
         default:
            setIsLoginPage(false)
            break;
      }
   }, [location]);

   useEffect(() => {
      console.log(isLoginPage)
   }, [isLoginPage]);

   const navigate = useNavigate()

   const submitAccessToken = async () => {
      const data = await checkToken(tokenInputText)
      if (localStorage.getItem('accessToken')){
         navigate('/Main')
      }
   }
   
   const nextButtonHandler = () => {
      if (!warningShown && !isLoginPage) {
         setShowWarning(true)
         warningRef.current.style.opacity = 1
         warningRef.current.style.transform = `translateX(0)`
         setWarningShown(true)
      }
      else {
         if (!isLoginPage) {
            setRegStep(2)
         }
         else {
            if (usernameText && passwordText) {
               submithandler()
            }
         }
      }
   }
   const confirmButtonHandler = () => {
      setShowWarning(false)
      warningRef.current.style.opacity = 0
      setTimeout(() => {
         warningRef.current.style.transform = `translateX(100vw)`

      }, 300)
      setRegStep(2)
   }

   const submithandler = async () => {
      let data;
      const formData = new FormData()
      formData.append('username', usernameText)
      formData.append('password', passwordText)
      if (isLoginPage) {
         data = await login(formData)
      }
      else {
         data = await registration(formData)
      }
      updateUser(data)
      console.log('navigate')
      navigate('/Main')
      console.log('submi')
   }
   const toggleTokenWindowHide = () => {
      setIsTokenWindowShown(!isTokenWindowShown)
   }
   useEffect(() => {
      console.log(isTokenWindowShown)
      if (isTokenWindowShown) {
         tokenWindowRef.current.style.opacity = 1
         tokenWindowRef.current.style.transform = `translateX(0)`
      }
      else if (!isTokenWindowShown) {
         tokenWindowRef.current.style.opacity = 0
         setTimeout(() => {
            tokenWindowRef.current.style.transform = `translateX(-100vw)`
         }, 300)
      }
   }, [isTokenWindowShown]);
   useEffect(() => {
      if (regStep === 1) {
         stepOneRef.current.style.transform = `translateX(0)`
         stepTwoRef.current.style.transform = `translateX(100vw)`
      }
      else {
         stepOneRef.current.style.transform = `translateX(-100vw)`
         stepTwoRef.current.style.transform = `translateX(0)`
      }
   }, [regStep]);

   useEffect(() => {
      let token = localStorage.getItem('token')
      if (token) {
         // navigate('/Main')
      }
   }, [localStorage]);

   return (
      <div className='RegistrationWrapper'>
         <div ref={stepOneRef} className="RegistrationContainer">
            <div className="title">
               <div className="mainTitle">Gnathology</div>
               <div className="page">{!isLoginPage ? "Registration" : "Login"}</div>
               <div className="subText">{!isLoginPage ? "Welcome, new user!" : "Welcome back!"}</div>
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
                  <div onClick={nextButtonHandler} className="button linksButton">{!isLoginPage ? 'next' : 'Login'}</div>
               </div>
               <div className="row row2">
                  <div className="helpLinks">
                     <div onClick={() => navigate(isLoginPage ? '/Registration' : '/Login')} className="link">{isLoginPage ? 'Don\'t have an account? register' : 'Have an account? Log in'}</div>
                     <div onClick={(toggleTokenWindowHide)} className="link">Insert token here</div>
                  </div>
               </div>
            </div>
         </div>
         <div ref={warningRef} className="warningWrapper">
            <div className="warningContainer">
               <div className="warningText">
                  Wraning!
                  <div className="wraningSubText">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, velit! Aspernatur non suscipit repudiandae reprehenderit est similique deleniti cumque hic voluptas nihil, itaque alias laudantium omnis vitae corporis, rem doloremque assumenda sequi nobis laborum quae dolore quo? Optio consectetur fugiat labore, ipsa cupiditate tenetur soluta, rerum beatae iure, praesentium magnam.
                  </div>
               </div>
               <div onClick={confirmButtonHandler} className="confirmButton">
                  confirm
               </div>
            </div>
         </div>
         <div ref={stepTwoRef} className='accessRequestWrapper'>
            <div className="accessRequestContainer">
               <div className="title">
                  <div className="mainTitle">Access Request</div>
                  <div className="subTitle">In order to gain access to this site, you need to make a request to the administraion</div>
               </div>
               <div className="inputs">
                  <div className="row1 row">
                     <div className="inputName">First name</div>
                     <div className="Input username">
                        <Input type={'text'} text={name} setText={setName} />
                     </div>
                  </div>
                  <div className="row2 row">
                     <div className="inputName">Second name</div>
                     <div className="Input password">
                        <Input type={'text'} text={surname} setText={setSurname} />
                     </div>
                  </div>
               </div>
               <div className="details">
                  <div className="detailsInput">
                     <textarea placeholder='Details here...' className='textarea' wrap={'hard'} name="details" id="details" cols="90" rows="13" value={detailsInput} onChange={e => setDetailsInput(e.value)}></textarea>
                  </div>
               </div>
               <div className="buttons">
                  <div onClick={() => setRegStep(1)} className="backButton button">Back</div>
                  <div onClick={submithandler} className={`submitButton button ${name === '' || surname === '' || usernameText === '' || passwordText === '' ? 'locked' : ''}`}> Submit</div>
               </div>
            </div>
         </div>
         <div ref={tokenWindowRef} className="tokenWindowWrapper">
            <div className="tokenWindowContainer">
               <div className="tokenWindowText">
                  Insert access token here:
               </div>
               <div className="tokenWindowInput">
                  <Input type={'text'} text={tokenInputText} setText={setTokenInputText} />
               </div>

               <div className="buttons">
                  <div onClick={toggleTokenWindowHide} className="hideButton button">
                     hide
                  </div>
                  <div onClick={submitAccessToken} className="submitButton button">
                     submit
                  </div>
               </div>

            </div>
         </div>
      </div>
   );
};

export default Registration;