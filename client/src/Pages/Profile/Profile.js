import React, { useEffect, useState } from 'react';
import { useScene } from '../MainScene/Scenecontext';
import '../../style/Profile.scss'
import { jwtDecode } from 'jwt-decode';
import { registration } from './../../http/userApi';
import { useNavigate } from 'react-router-dom';
import { createAccessToken, getLastAccessToken } from '../../http/accessTokenApi';

const Profile = ({}) => {

   const [lastAccessToken, setLastAccessToken] = useState(null);
   const {updateUser} = useScene()
   const navigate = useNavigate()
   const { user } = useScene()
   console.log(user);
   useEffect(() => {
      let token = localStorage.getItem('token')
      if (token){
         updateUser(jwtDecode(token))
      }
   }, [localStorage]);

   const logout = () => {
      localStorage.clear()
      navigate('/Login')
   }
   const createAccessTokenHandler = async () => {
      const data = await createAccessToken()
      setLastAccessToken(data)
   }
   const getLastAccessTokenHandler = async() =>{
      const data = await getLastAccessToken()
      console.log(data)
      setLastAccessToken(data)
   }

   useEffect(() => {
      console.log(localStorage)
      if (user && user.role!== "BASIC"){
         console.log(user.role)
         getLastAccessTokenHandler()
      }
   }, [localStorage]);
   return (
      <div className='profileWrapper'>
         <div className="profileContainer">
            <h2 className="page">Profile</h2>
            
            <div className="row row1">
               <div className="username">
                  username
               </div>
               <div className="value"> {user && user.username}</div>
               {user &&  user.role === "ADMIN" && <div>
                  <div className="createToken">
                     access token
                  </div>
                  <div className="value"> {lastAccessToken}</div>
                  <div onClick={createAccessTokenHandler} className="createTokenButton">create token</div>
               </div>}
               <div onClick={logout} className="logoutButton">Log out</div>
            </div>
            
         </div>
      </div>
   );
};

export default Profile;