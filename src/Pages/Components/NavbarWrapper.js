import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../style/Navbar.scss'
const NavbarWrapper = () => {
   const navigate = useNavigate()

   useEffect(() => {
   }, []);

   return (
      <div className="navbarWrapper">
         <div className="logo">Gnathology</div>
         <nav className='navbar'>
            <ul>
               <li onClick={() => navigate('/')}>
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
               <li className='settings'>
                  <img src="gear.svg" alt="" />
               </li>
               <li className='settings'>
                  <img src="account.svg" alt="" />
               </li>
               {/* Добавьте дополнительные ссылки для навигации по мере необходимости */}
            </ul>
         </nav>
      </div>
   );
};

export default NavbarWrapper;