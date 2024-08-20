import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './update-explorer.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';

const UpdateExplorer = ({ userRole }) => {
  const { id } = useParams();

  const [explorer, setExplorer] = useState({
    id: '',
    username: '',
    email: '',
    contactNumber: '',
    city: '',
    province: ''
  });

  useEffect(() => {
    const fetchExplorer = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/explorers/${id}`);
        setExplorer(response.data);
      } catch (error) {
        console.error('Error fetching explorer:', error);
      }
    };
    fetchExplorer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExplorer({ ...explorer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/explorers/update/${id}`, explorer);
      alert('Explorer updated successfully');
      window.location.href = '/manage-explorer'
    } catch (error) {
      console.error('Error updating explorer:', error);
      alert('Error updating explorer');
    }
  };

  const handleBack = () => {
    window.location.href = '/manage-explorer'
  };

  return (
    <>
      <Navbar userRole={userRole} />
      <div className='update-explorer-container'>
        <h1>Update Explorer</h1>
        <form className='update-explorer-form' onSubmit={handleSubmit}>
          <label htmlFor='username'>Username:</label>
          <input type='text' id='username' name='username' value={explorer.username} onChange={handleChange} />

          <label htmlFor='email'>Email:</label>
          <input type='text' id='email' name='email' value={explorer.email} onChange={handleChange} />

          <label htmlFor='contactNumber'>Contact Number:</label>
          <input type='text' id='contactNumber' name='contactNumber' value={explorer.contactNumber} onChange={handleChange} />

          <label htmlFor='city'>City:</label>
          <input type='text' id='city' name='city' value={explorer.city} onChange={handleChange} />

          <label htmlFor='province'>Province:</label>
          <input type='text' id='province' name='province' value={explorer.province} onChange={handleChange} />

          <button className='go-back-explorer' onClick={handleBack}>Back</button>
          <button className='update-explorer' type='submit'>Update</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default UpdateExplorer;
