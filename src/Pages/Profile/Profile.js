import React, { useEffect, useState } from 'react';
import { useScene } from '../MainScene/Scenecontext';
import '../../style/Profile.scss';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { createAccessToken, getLastAccessToken } from '../../http/accessTokenApi';

const Profile = () => {
   const [lastAccessToken, setLastAccessToken] = useState(null);
   const { user, updateUser } = useScene();
   const navigate = useNavigate();

   useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
         updateUser(jwtDecode(token));
      }
   }, [updateUser]);

   const logout = () => {
      localStorage.clear();
      navigate('/Login');
   };

   const createAccessTokenHandler = async () => {
      const data = await createAccessToken();
      setLastAccessToken(data);
   };

   const getLastAccessTokenHandler = async () => {
      const data = await getLastAccessToken();
      setLastAccessToken(data);
   };

   useEffect(() => {
      if (user && user.role !== 'BASIC') {
         getLastAccessTokenHandler();
      }
   }, [user]);

   return (
      <div className='profileWrapper'>
         <div className="profileContainer">
            <h2 className="page">Profile</h2>

            <div className="row row1">
               <div className="username">Username</div>
               <div className="value">{user?.username || '(your username)'}</div>
               {user?.role === 'ADMIN' && <div>
                  <div className="createToken">Access token</div>
                  <div className="value">{lastAccessToken}</div>
                  <div onClick={createAccessTokenHandler} className="createTokenButton">Create token</div>
               </div>}
               <div onClick={logout} className="logoutButton">Log out</div>
            </div>
         </div>
      </div>
   );
};

export default Profile;
