import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigation = useNavigate();

  const logout = () => {
    localStorage.removeItem('token')
    navigation('/')
  }

  const handleLogo = () => {
    navigation('/home')
  }

  return (
    <div className='navbar'>
      <span className='logo' onClick={handleLogo}>Property rental User Side</span>
      <div>
        <NavLink exact="true" to='/home' className='navLink' activeclassname='active'>Home</NavLink>
        <button onClick={logout} className='logout'>LOGOUT</button>
      </div>
    </div>
  );
}

export default Navbar;
