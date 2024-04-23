import React, { useState } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sellerSignup, sellerLogin, STATUSES } from '../store/sellerSlice';

function Auth() {
  const [action, setAction] = useState("Seller Sign Up");
  const [SellerUserName, setSellerUserName] = useState('');
  const [SellerEmail, setSellerEmail] = useState('');
  const [SellerPassword, setSellerPassword] = useState('');

  const { status } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  const navigation = useNavigate();

  const handleAction = () => {
    setAction(prevAction => prevAction === "Seller Sign Up" ? "Seller Log In" : "Seller Sign Up");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (action === 'Seller Sign Up') {
        dispatch(sellerSignup({ SellerUserName, SellerEmail, SellerPassword }));
        navigation('/sellerHome');
      } else {
        dispatch(sellerLogin({ SellerEmail, SellerPassword }));
        navigation('/sellerHome');
      }
    } catch (error) {
      navigation('/seller');
      console.error(`Error during ${action}: ${error}`);
      window.alert(`Error during ${action}: ${error.message}`);
    }
  };

  if (status === STATUSES.LOADING) {
    return <h2>LOADING.....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong...</h2>;
  }

  const userPage = () => {
    navigation('/');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl text-center mb-6">{action}</h1>

          {action === "Seller Sign Up" && (
            <div className="mb-4">
              <input
                type="text"
                placeholder='Seller name'
                required
                value={SellerUserName}
                onChange={(e) => setSellerUserName(e.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
              <FaUser className='icon' />
            </div>
          )}

          <div className="mb-4">
            <input
              type="email"
              placeholder='Seller Email'
              required
              value={SellerEmail}
              onChange={(e) => setSellerEmail(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            <MdEmail className='icon' />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder='Seller Password'
              required
              value={SellerPassword}
              onChange={(e) => setSellerPassword(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            <FaLock className='icon' />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{action}</button>
          <div className='text-center mt-4'>
            <p>{action === "Seller Sign Up" ? "Already have" : "Create"} an account? <button type="button" onClick={handleAction} className="text-blue-500">{action === "Seller Sign Up" ? "Log In" : "Sign Up"}</button>
            </p>
          </div>
        </form>
      </div>
      <div><button className='sellerBtn mt-4' onClick={userPage}>Login as user?</button></div>
    </div>
  );
}

export default Auth;
