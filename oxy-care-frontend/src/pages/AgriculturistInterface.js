import React, { useState, useEffect } from 'react';
import './agriculturist-interface.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProposalDetails from '../components/ProposalDetails'; // Import the ProposalDetails component
import IndustrialistResponse from '../components/IndustrialistResponse'; // Import the IndustrialistResponse component
import axios from 'axios';

const AgriculturistInterface = ({ userRole }) => {

  const [proposals, setProposals] = useState([]);

  useEffect(() => {

    const userData = JSON.parse(localStorage.getItem('userData'));

    const username = userData.username;

    axios.get(`http://localhost:8080/proposals/agriculturist/${username}`)
      .then(response => {
        setProposals(response.data);
      })
      .catch(error => {
        console.error('Error fetching proposals:', error);
        // Handle error, e.g., show an error message to the user
      });
  }, []);



  return (
    <>
      <Navbar userRole={userRole} />
      <div className='agriculturist-interface-container'>
        <div className='agriculturist-interface-container-1'>
          <h1>Available Proposals</h1>
          {proposals.length === 0 ? (
            <p className='no-data'>No proposals available</p>
          ) : (
            <div className='proposal-container'>
              {proposals.map((proposal) => (
                <ProposalDetails key={proposal.id} proposal={proposal} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AgriculturistInterface;
