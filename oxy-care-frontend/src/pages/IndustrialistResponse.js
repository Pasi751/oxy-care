import React, { useState, useEffect } from 'react';
import './industrialist-response.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios';

const IndustrialistResponse = ({ userRole }) => {

  const [bids, setBids] = useState([]);


  useEffect(() => {

    const userData = JSON.parse(localStorage.getItem('userData'));

    const username = userData.username;

    axios.get(`http://localhost:8080/bids/${username}`)
      .then(response => {
        setBids(response.data);
      })
      .catch(error => {
        console.error('Error fetching proposals:', error);
      });

  }, []);

  return (
    <>
      <Navbar userRole={userRole} />
      <div className='agriculturist-interface-container-2'>
        <h1>Industrialist Response</h1>
        {bids.length === 0 ? (
          <p className='no-data'>No industrialist responses available</p>
        ) : (
          <div className='response-container'>
            {bids.map((bid) => (
              <IndustrialistResponse key={bid.bidId} bid={bid} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default IndustrialistResponse
