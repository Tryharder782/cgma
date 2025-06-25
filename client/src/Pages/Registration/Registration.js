import React, { useEffect, useRef, useState } from 'react';
import '../../style/Registration.scss'
import Input from './../Components/Input';
import { login, registration, loginGuest } from './../../http/userApi';
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

   const guestLoginHandler = async () => {
      const data = await loginGuest()
      updateUser(data)
      navigate('/Main')
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
               <div className="mainTitle">Кладовая знаний по гнатологии</div>
               <div className="page">{!isLoginPage ? "Регистрация" : "Логин"}</div>
               <div className="subText">{!isLoginPage ? "Добро пожаловать!" : "С возвращением!"}</div>
            </div>
            <div className="inputs">
               <div className="row1 row">
                  <div className="inputName">Логин</div>
                  <div className="Input username">
                     <Input type={'text'} text={usernameText} setText={setUsernameText} />
                  </div>
               </div>
               <div className="row2 row">
                  <div className="inputName">Пароль</div>
                  <div className="Input password">
                     <Input type={'password'} text={passwordText} setText={setPasswordText} />
                  </div>
               </div>
            </div>
            <div className="links">
               <div className="row row1">
                  <div onClick={nextButtonHandler} className="button linksButton">{!isLoginPage ? 'Далее' : 'Вход'}</div>
               </div>
               <div className="row row2">
                  <div className="helpLinks">
                     <div onClick={() => navigate(isLoginPage ? '/Registration' : '/Login')} className="link">{isLoginPage ? 'Нет аккаунта? Регистрация' : 'Уже есть акканут? Вход'}</div>
                     <div onClick={(toggleTokenWindowHide)} className="link">Вход по токену доступа</div>
                     <div onClick={guestLoginHandler} className="link">Войти как гость</div>
                  </div>
               </div>
            </div>
         </div>
         <div ref={warningRef} className="warningWrapper">
            <div className="warningContainer">
               <div className="warningText">
                  Предупреждение
                  <div className="wraningSubText">
                     Используя материалы данного сайта, вы подтверждаете, что они предназначены исключительно для ознакомительных и учебных целей. Автор проекта не несёт ответственности за возможное неверное применение информации.
                  </div>
               </div>
               <div onClick={confirmButtonHandler} className="confirmButton">
                  принять
               </div>
            </div>
         </div>
         <div ref={stepTwoRef} className='accessRequestWrapper'>
            <div className="accessRequestContainer">
               <div className="title">
                  <div className="mainTitle">Запросить доступ</div>
                  <div className="subTitle">Для того, чтобы получить доступ к материалам этого сайта, вам необходимо обратиться к администрации</div>
               </div>
               <div className="inputs">
                  <div className="row1 row">
                     <div className="inputName">Имя</div>
                     <div className="Input username">
                        <Input type={'text'} text={name} setText={setName} />
                     </div>
                  </div>
                  <div className="row2 row">
                     <div className="inputName">Фамилия</div>
                     <div className="Input password">
                        <Input type={'text'} text={surname} setText={setSurname} />
                     </div>
                  </div>
               </div>
               <div className="details">
                  <div className="detailsInput">
                     <textarea placeholder='Детали здесь...' className='textarea' wrap={'hard'} name="details" id="details" cols="90" rows="13" value={detailsInput} onChange={e => setDetailsInput(e.value)}></textarea>
                  </div>
               </div>
               <div className="buttons">
                  <div onClick={() => setRegStep(1)} className="backButton button">Назад</div>
                  <div onClick={submithandler} className={`submitButton button ${name === '' || surname === '' || usernameText === '' || passwordText === '' ? 'locked' : ''}`}> Отправить</div>
               </div>
            </div>
         </div>
         <div ref={tokenWindowRef} className="tokenWindowWrapper">
            <div className="tokenWindowContainer">
               <div className="tokenWindowText">
                  Введите токен доступа:
               </div>
               <div className="tokenWindowInput">
                  <Input type={'text'} text={tokenInputText} setText={setTokenInputText} />
               </div>

               <div className="buttons">
                  <div onClick={toggleTokenWindowHide} className="hideButton button">
                     закрыть
                  </div>
                  <div onClick={submitAccessToken} className="submitButton button">
                     подтвердить
                  </div>
               </div>

            </div>
         </div>
      </div>
   );
};

export default Registration;