import React, { useState, useEffect } from 'react';
import './manage-agriculturist.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';

const ManageAgriculturist = ({ userRole }) => {
  const [agriculturists, setAgriculturists] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsoFactors({
      ...isoFactors,
      [name]: value,
    });
  };

  const [isoFactors, setIsoFactors] = useState({
    electricity: 0.0,
    naturalGas: 0.0,
    heatingOil: 0.0,
    propane: 0.0,
    gasoline: 0.0,
    diesel: 0.0,
  });
  
  useEffect(() => {
    const fetchAgriculturists = async () => {
      try {
        const response = await axios.get('http://localhost:8080/agriculturists/viewAll');
        setAgriculturists(response.data);
      } catch (error) {
        console.error('Error fetching agriculturists:', error);
      }
    };

    const fetchIsoFactors = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/iso-factors/1`);
        setIsoFactors(response.data);
      } catch (error) {
        console.error('Error fetching ISO factors:', error);
      }
    };

    fetchIsoFactors();
    fetchAgriculturists();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/deleteAgriculturist/${id}`);
      if (response.status === 200) {
        // Update the agriculturists state to remove the deleted agriculturist
        setAgriculturists(agriculturists.filter(agriculturist => agriculturist.id !== id));
        console.log(response.data);
        alert(response.data);
      }
    } catch (error) {
      console.error('Error deleting agriculturist:', error);
      alert('Error deleting agriculturist');
    }
  };

  const handleUpdate = (id) => {
    window.location.href = `/updateAgriculturistPage/${id}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:8080/updateIsoFactors/1', isoFactors);
      if (response.status === 200) {
        alert('ISO factors updated successfully');
      }
    } catch (error) {
      console.error('Error updating ISO factors:', error);
      alert('Error updating ISO factors');
    }
  };

  return (
    <>
      <Navbar userRole={userRole} />
      <div className='manage-agriculturist-container'>
        <h1>Manage Agriculturists</h1>
        {agriculturists.length === 0 ? (
          <p>No data available</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Email</th>
                <th>City</th>
                <th>Province</th>
                <th>Phone Number</th>
                <th>Types of Trees Planted</th>
                <th>Trees Planted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {agriculturists.map(agriculturist => (
                <tr key={agriculturist.id}>
                  <td>{agriculturist.id}</td>
                  <td>{agriculturist.username}</td>
                  <td>{agriculturist.email}</td>
                  <td>{agriculturist.city}</td>
                  <td>{agriculturist.province}</td>
                  <td>{agriculturist.phoneNumber}</td>
                  <td>{agriculturist.typesOfTreesPlanted}</td>
                  <td>{agriculturist.treesPlanted}</td>
                  <td>
                    <button className='update' onClick={() => handleUpdate(agriculturist.id)}>Update</button>
                    <button className='delete' onClick={() => handleDelete(agriculturist.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className='update-iso-factors-container'>
        <h1>Update ISO Factors</h1>
        <form onSubmit={handleSubmit} className='update-iso-form'>
          <label htmlFor='electricity'>Electricity:</label>
          <input
            type='number'
            id='electricity'
            name='electricity'
            value={isoFactors.electricity}
            onChange={handleChange}
          />
          <label htmlFor='naturalGas'>Natural Gas:</label>
          <input
            type='number'
            id='naturalGas'
            name='naturalGas'
            value={isoFactors.naturalGas}
            onChange={handleChange}
          />
          <label htmlFor='heatingOil'>Heating Oil:</label>
          <input
            type='number'
            id='heatingOil'
            name='heatingOil'
            value={isoFactors.heatingOil}
            onChange={handleChange}
          />
          <label htmlFor='propane'>Propane:</label>
          <input
            type='number'
            id='propane'
            name='propane'
            value={isoFactors.propane}
            onChange={handleChange}
          />
          <label htmlFor='gasoline'>Gasoline:</label>
          <input
            type='number'
            id='gasoline'
            name='gasoline'
            value={isoFactors.gasoline}
            onChange={handleChange}
          />
          <label htmlFor='diesel'>Diesel:</label>
          <input
            type='number'
            id='diesel'
            name='diesel'
            value={isoFactors.diesel}
            onChange={handleChange}
          />
          <button className='update-button' type='submit'>Update</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ManageAgriculturist;
