import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import Navbar from '../components/Navbar';
import loginPic from '../images/loginPic.jpg';
import './Login.css'
import Footer from '../components/Footer';
import axios from 'axios';


const Login = ({ setUser }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    setError('');
    event.preventDefault();
    try {
        const response = await axios.post('http://localhost:8080/login', {
            username,
            password
        });
        console.log('Response:', response.data);

        if (response.data.isEnabled) {
            // User is enabled, proceed with login logic
            console.log('User is enabled');
            // Add your login logic here, such as setting a cookie or redirecting the user
            setUser(response.data);

            switch (response.data.userRole) {
              case 'explorer':
                  window.location.href = '/explorer';
                  break;
              case 'agriculturist':
                  window.location.href = '/agriculturist-homepage';
                  break;
              case 'industrialist':
                  window.location.href = '/industrialist-homepage';
                  break;
              default:
                  // Redirect to a default page if user role is not recognized
                  window.location.href = '/login';
                  break;
          }

        } else {
            setError('Please verify your email before logging in.');
        }
    } catch (error) {
        console.error('Login failed:', error);
        setError('An error occurred. Please try again later.');
    }
};


  return (
    <>
      <Navbar />
      <div className='login-container'>
        <div className='login-container-left'>
          <img src={loginPic} alt='login-pic' />
        </div>

        <div className='login-container-right'>
          <div className='form-container-login'>
            <h1>Login</h1>
            <form className= "login-form" onSubmit={handleSubmit}>


              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder='Username'
                required
              />

              <br />
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder='Password'
                required
              />
              <br />
              <select
                value={role}
                onChange={handleRoleChange}
                required
              >
                <option value="" disabled>Select role</option>
                <option value="agriculturist">Industrialist</option>
                <option value="explorer">Agriculturist</option>
                <option value="farmer">Explorer</option>
              </select>
              <br />
              {error && <p className="error-message">{error}</p>}
              <button type="submit">Login</button>
            </form>
            <div className='signup-links-container'>
              Don't have an account? 
              <Link to="/sign-up-industrialist" className='signup-link'>Signup as industrialist</Link>
              <Link to="/sign-up-agriculturist" className='signup-link'>Signup as agriculturist</Link>
              <Link to="/sign-up-explorer" className='signup-link'>Signup as explorer</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login
