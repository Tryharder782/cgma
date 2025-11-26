import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/Navbar.scss'


const NavbarWrapper = () => {
   const navigate = useNavigate()

   return (
      <div className="navbarWrapper">
         <div className="logo" onClick={() => navigate('/')}>CGMA</div>
         <nav className='navbar'>
            <ul>
               <li onClick={() => navigate('/')}>
                  <div className='link'>Home</div>
               </li>
               <li onClick={() => navigate('/About')}>
                  <div className='link'>About</div>
               </li>
               <li onClick={() => navigate('/Chewing')}>
                  <div className='link'>Muscles</div>
               </li>
               <li onClick={() => navigate('/Contacts')}>
                  <div className='link'>Contacts</div>
               </li>
            </ul>
         </nav>
      </div>
   );
};

export default NavbarWrapper;