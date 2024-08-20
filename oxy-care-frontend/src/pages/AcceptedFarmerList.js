import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './accepted-farmer-list.css'
import axios from 'axios';

const AcceptedFarmerList = ({ userRole }) => {

    const [acceptedFarmers, setAcceptedFarmers] = useState([]);

    useEffect(() => {

        // Assuming you have a function to retrieve username from local storage
        const userData = JSON.parse(localStorage.getItem('userData'));

        const username = userData.username;

        axios.get(`http://localhost:8080/proposals/${username}/accepted-farmers`)
        .then(response => {
          setAcceptedFarmers(response.data);
        })
        .catch(error => {
          console.error('Error retrieving accepted farmers:', error);
          alert('Error retrieving accepted farmers:');
        });

    }, [userRole]);

    const handleMarkAsComplete = (proposalTitle) => {
        window.location.href = `/mark-as-complete/${proposalTitle}`;
      };



    const renderFarmerList = () => {


        if (acceptedFarmers.length === 0) {
            return <p>No data available</p>;
        }

        return acceptedFarmers.map((farmer, index) => (
            <div className="farmer-entry" key={index}>
                <h2>{farmer.proposalTitle}</h2>
                <p><strong>Estimated Carbon Emission:</strong> {farmer.estimatedCarbonEmission}</p>
                <p><strong>Main Emission Source:</strong> {farmer.mainEmissionSource}</p>
                <p><strong>Additional Details:</strong> {farmer.additionalDetails}</p>
                <p><strong>Farmer Name:</strong> {farmer.farmerUsername}</p>
                <p><strong>Farmer City:</strong> {farmer.farmerCity}</p>
                <p><strong>Farmer Province</strong> {farmer.farmerProvince}</p>
                {farmer.isCompleted ? (
                    <p><strong>Status:</strong> Completed</p>
                ) : (
                    <button className='mark-as-complete-button' onClick={() => handleMarkAsComplete(farmer.proposalTitle)}>Mark as Complete</button>
                )}
            </div>
        ));
    };

    return (
        <>
            <Navbar userRole={userRole} />
            <div class="farmer-container">

                <h1>Accepted Farmers</h1>

                <div class="farmer-list-container">
                    {renderFarmerList()}
                </div>

            </div>
            <Footer />
        </>
    )
}

export default AcceptedFarmerList
