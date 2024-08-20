import React, { useState, useEffect } from 'react';
import './manage-industrialist.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';

const ManageIndustrialist = ({ userRole }) => {
  const [industrialists, setIndustrialists] = useState([]);

  useEffect(() => {
    const fetchIndustrialists = async () => {
      try {
        const response = await axios.get('http://localhost:8080/industrialists/viewAll');
        setIndustrialists(response.data);
      } catch (error) {
        console.error('Error fetching industrialists:', error);
      }
    };
    fetchIndustrialists();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/deleteIndustrialist/${id}`);
      if (response.status === 200) {
        // Update the industrialists state to remove the deleted industrialist
        setIndustrialists(industrialists.filter(industrialist => industrialist.id !== id));
        console.log(response.data);
        alert(response.data);
      }
    } catch (error) {
      console.error('Error deleting industrialist:', error);
      alert('Error deleting industrialist');
    }
  };

  const handleUpdate = (id) => {
    // Implement update functionality here
    window.location.href = `/updateIndustrialistPage/${id}`;
    console.log(`Update industrialist with id ${id}`);
  };

  return (
    <>
      <Navbar userRole={userRole} />
      <div className='manage-industrialist-container'>
        <h1>Manage Industrialists</h1>
        {industrialists.length === 0 ? (
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
                <th>Company Name</th>
                <th>Company Type</th>
                <th>Company Size</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {industrialists.map(industrialist => (
                <tr key={industrialist.id}>
                  <td>{industrialist.id}</td>
                  <td>{industrialist.username}</td>
                  <td>{industrialist.email}</td>
                  <td>{industrialist.city}</td>
                  <td>{industrialist.province}</td>
                  <td>{industrialist.companyName}</td>
                  <td>{industrialist.companyType}</td>
                  <td>{industrialist.companySize}</td>
                  <td>
                    <button className='update' onClick={() => handleUpdate(industrialist.id)}>Update</button>
                    <button className='delete' onClick={() => handleDelete(industrialist.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ManageIndustrialist;
