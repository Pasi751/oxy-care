import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './update-industrialist.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';

const UpdateIndustrialist = ({ userRole }) => {
  const { id } = useParams();

  const [industrialist, setIndustrialist] = useState({
    id: '',
    username: '',
    email: '',
    city: '',
    province: '',
    companyName: '',
    companyType: '',
    companySize: ''
  });

  useEffect(() => {
    const fetchIndustrialist = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/industrialist/${id}`);
        setIndustrialist(response.data);
      } catch (error) {
        console.error('Error fetching industrialist:', error);
      }
    };
    fetchIndustrialist();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIndustrialist({ ...industrialist, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/updateIndustrialist/${id}`, industrialist);
      alert('Industrialist updated successfully');
      window.location.href = '/manage-industrialist'
    } catch (error) {
      console.error('Error updating industrialist:', error);
      alert('Error updating industrialist');
    }
  };

  const handleBack = () => {
    window.location.href = '/manage-industrialist'
  };

  return (
    <>
      <Navbar userRole={userRole} />
      <div className='update-industrialist-container'>
        <h1>Update Industrialist</h1>
        <form className='update-industrialist-form' onSubmit={handleSubmit}>
          <label htmlFor='username'>Username:</label>
          <input type='text' id='username' name='username' value={industrialist.username} onChange={handleChange} />

          <label htmlFor='email'>Email:</label>
          <input type='text' id='email' name='email' value={industrialist.email} onChange={handleChange} />

          <label htmlFor='city'>City:</label>
          <input type='text' id='city' name='city' value={industrialist.city} onChange={handleChange} />

          <label htmlFor='province'>Province:</label>
          <input type='text' id='province' name='province' value={industrialist.province} onChange={handleChange} />

          <label htmlFor='companyName'>Company Name:</label>
          <input type='text' id='companyName' name='companyName' value={industrialist.companyName} onChange={handleChange} />

          <label htmlFor='companyType'>Company Type:</label>
          <input type='text' id='companyType' name='companyType' value={industrialist.companyType} onChange={handleChange} />

          <label htmlFor='companySize'>Company Size:</label>
          <input type='text' id='companySize' name='companySize' value={industrialist.companySize} onChange={handleChange} />

          <button className='go-back-industrialist' onClick={handleBack}>Back</button>
          <button className='update-industrialist' type='submit'>Update</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default UpdateIndustrialist;
