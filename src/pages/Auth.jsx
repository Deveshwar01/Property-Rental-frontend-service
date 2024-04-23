import React, { useState } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userSignup, userLogin, STATUSES } from '../store/userSlice';

function Auth() {
  const [action, setAction] = useState("Sign Up");
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { status } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigation = useNavigate();

  const handleAction = () => {
    setAction(prevAction => prevAction === "Sign Up" ? "Log In" : "Sign Up");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (action === 'Sign Up') {
        dispatch(userSignup({ userName, email, password }));
        navigation('/home');
      } else {
        dispatch(userLogin({ email, password }));
        navigation('/home');
      }
    } catch (error) {
      navigation('/');
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

  const sellerPage = () => {
    navigation('/seller');
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-2xl font-bold text-center">{action}</h1>

          {action === "Sign Up" && (
            <div className="flex items-center">
              <input
                type="text"
                placeholder='User name'
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
              />
              <FaUser className='text-gray-500 ml-2' />
            </div>
          )}

          <div className="flex items-center">
            <input
              type="email"
              placeholder='Email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
            />
            <MdEmail className='text-gray-500 ml-2' />
          </div>
          <div className="flex items-center">
            <input
              type="password"
              placeholder='Password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
            />
            <FaLock className='text-gray-500 ml-2' />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">Submit</button>
          <div className='text-center'>
            <p>{action === "Sign Up" ? "Already have" : "Create"} an account? <button type="button" onClick={handleAction} className="text-blue-500 hover:underline focus:outline-none">{action === "Sign Up" ? "Log In" : "Sign Up"}</button>
            </p>
          </div>
        </form>
        <div className='text-center p-5'><button className='bg-transparent text-blue-600 hover:text-gray-800 focus:outline-none' onClick={sellerPage}>Login as  Property Seller?</button></div>
      </div>
    </div>
  );
}

export default Auth;
