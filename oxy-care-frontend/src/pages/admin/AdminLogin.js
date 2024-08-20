import React, { useState } from 'react';
import './admin-login.css'; // Create this CSS file for styling
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = ({ setUser }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    try {
      const response = await axios.post('http://localhost:8080/admin/login', { username, password });
      if (response.status === 200) {
        console.log('Admin logged in successfully');
        console.log(response.data);
        alert('Admin logged in successfully');
        setFormData({ username: '', password: '' });
        setUser({
          username: 'admin',
          userRole: 'admin',
          isEnabled: true
        });
        window.location.href = '/manage-agriculturist';
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      alert('Error logging in:');
      // Handle login error, e.g., display an error message to the user
    }
  };

  const handleGoBack = () => {
    window.location.href = '/';
  };

  return (
    <div className='admin-login'>
      <div className='admin-sign-in-form-container'>
        <h2>Admin Sign In</h2>
        <form className='admin-sign-in-form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              name='username'
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <span className='error'>{errors.username}</span>}
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className='error'>{errors.password}</span>}
          </div>
          <button type='submit'>Sign In</button>
          <button className='back-btn'onClick={handleGoBack}>Go Back</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
