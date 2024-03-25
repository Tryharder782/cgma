import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../style/Navbar.scss'


const NavbarWrapper = () => {
   const [showNavbar, setShowNavbar] = useState(true);

   const location = useLocation()
   const navigate = useNavigate()

   useEffect(() => {
      switch (location.pathname.split('/')[1]) {
         case 'Registration':
            setShowNavbar(false);
            break;
         case 'Login':
            setShowNavbar(false);
            break;
         default:
            setShowNavbar(true)
            break;
      }	
	}, [location]);

   return (
      <div>
         {showNavbar &&
            <div className="navbarWrapper">
               <div className="logo">Gnathology</div>
               <nav className='navbar'>
                  <ul>
                     <li onClick={() => navigate('/Main')}>
                        <div className='link'>HOME</div>
                     </li>
                     <li onClick={() => navigate('/About')}>
                        <div className='link'>TO STUDENTS</div>
                     </li>
                     <li onClick={() => navigate('/Contacts')}>
                        <div className='link'>TO PROFESSORS</div>
                     </li>
                     <li onClick={() => navigate('/Contacts')}>
                        <div className='link'>CONTACTS</div>
                     </li>
                     <li className='searchBarWrapper'>
                        <input className="searchBar">
                        </input>
                     </li>
                     {/* <li className='settings'>
                        <img src="gear.svg" alt="" />
                     </li> */}
                     <li onClick={() => {
                        let token = localStorage.getItem('token')
                        let accessToken = localStorage.getItem('accessToken')
                        if (!token && !accessToken){
                           navigate('/Registration')
                        }
                        else navigate('/Profile')
                     }} className='settings'>
                        <img src="account.svg" alt="" />
                     </li>
                     {/* Добавьте дополнительные ссылки для навигации по мере необходимости */}
                  </ul>
               </nav>
            </div>
         }
      </div>
   );
};

export default NavbarWrapper;