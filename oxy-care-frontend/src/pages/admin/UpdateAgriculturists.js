import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './update-agriculturist.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';

const UpdateAgriculturist = ({ userRole }) => {
  const { id } = useParams();

  const [agriculturist, setAgriculturist] = useState({
    id: '',
    username: '',
    email: '',
    city: '',
    province: '',
    phoneNumber: '',
    typesOfTreesPlanted: '',
    treesPlanted: ''
  });

  useEffect(() => {
    const fetchAgriculturist = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getAgriculturist/${id}`);
        setAgriculturist(response.data);
      } catch (error) {
        console.error('Error fetching agriculturist:', error);
      }
    };
    fetchAgriculturist();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgriculturist({ ...agriculturist, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/updateAgriculturist/${id}`, agriculturist);
      alert('Agriculturist updated successfully');
      window.location.href = '/manage-agriculturist'
    } catch (error) {
      console.error('Error updating agriculturist:', error);
      alert('Error updating agriculturist');
    }
  };

  const handleBack = () => {
    window.location.href = '/manage-agriculturist'
  };

  return (
    <>
      <Navbar userRole={userRole} />
      <div className='update-agriculturist-container'>
        <h1>Update Agriculturist</h1>
        <form className='update-agriculturist-form' onSubmit={handleSubmit}>
          <label htmlFor='username'>Username:</label>
          <input type='text' id='username' name='username' value={agriculturist.username} onChange={handleChange} />

          <label htmlFor='email'>Email:</label>
          <input type='text' id='email' name='email' value={agriculturist.email} onChange={handleChange} />

          <label htmlFor='city'>City:</label>
          <input type='text' id='city' name='city' value={agriculturist.city} onChange={handleChange} />

          <label htmlFor='province'>Province:</label>
          <input type='text' id='province' name='province' value={agriculturist.province} onChange={handleChange} />

          <label htmlFor='phoneNumber'>Phone Number:</label>
          <input type='text' id='phoneNumber' name='phoneNumber' value={agriculturist.phoneNumber} onChange={handleChange} />

          <label htmlFor='typesOfTreesPlanted'>Types of Trees Planted:</label>
          <input type='text' id='typesOfTreesPlanted' name='typesOfTreesPlanted' value={agriculturist.typesOfTreesPlanted} onChange={handleChange} />

          <label htmlFor='treesPlanted'>Trees Planted:</label>
          <input type='text' id='treesPlanted' name='treesPlanted' value={agriculturist.treesPlanted} onChange={handleChange} />


          <button className='go-back-industrialist' onClick={handleBack}>Back</button>
          <button className='update-agriculturist' type='submit'>Update</button>
          

        </form>
      </div>
      <Footer />
    </>
  );
};

export default UpdateAgriculturist;
