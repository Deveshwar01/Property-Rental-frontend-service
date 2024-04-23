import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const SellerNavbar = () => {
  const navigation = useNavigate();

  const logout = () => {
    localStorage.removeItem('token')
    navigation('/seller')
  }

  return (
    <div className='navbar'>
      <span className='logo'>Seller Header</span>
      <div>
        <button onClick={logout} className='logout'>LOGOUT</button>
      </div>
    </div>
  )
}

export default SellerNavbar