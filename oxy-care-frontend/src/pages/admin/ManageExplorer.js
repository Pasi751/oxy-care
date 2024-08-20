import React, { useState, useEffect } from 'react';
import './manage-explorer.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';

const ManageExplorer = ({ userRole }) => {
  const [explorers, setExplorers] = useState([]);

  useEffect(() => {
    const fetchExplorers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/explorers/all');
        setExplorers(response.data);
      } catch (error) {
        console.error('Error fetching explorers:', error);
      }
    };
    fetchExplorers();
  }, []);


  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/explorers/delete/${id}`);
      if (response.status === 200) {
        setExplorers(explorers.filter(explorer => explorer.id !== id));
        alert('Explorer deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting explorer:', error);
      alert('Error deleting explorer');
    }
  };




  const handleUpdate = (id) => {
    // Implement update functionality here
    window.location.href = `/updateExplorerPage/${id}`;
    console.log(`Update explorer with id ${id}`);
  };

  return (
    <>
      <Navbar userRole={userRole} />
      <div className='manage-explorer-container'>
        <h1>Manage Explorers</h1>
        {explorers.length === 0 ? (
          <p>No data available</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>City</th>
                <th>Province</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {explorers.map(explorer => (
                <tr key={explorer.id}>
                  <td>{explorer.id}</td>
                  <td>{explorer.username}</td>
                  <td>{explorer.email}</td>
                  <td>{explorer.contactNumber}</td>
                  <td>{explorer.city}</td>
                  <td>{explorer.province}</td>
                  <td>
                    <button className='update' onClick={() => handleUpdate(explorer.id)}>Update</button>
                    <button className='delete' onClick={() => handleDelete(explorer.id)}>Delete</button>
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

export default ManageExplorer;
