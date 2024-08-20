import React, { useState, useEffect } from 'react';
import './industrialist-request.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios';

const IndustrialistRequest = ({userRole}) => {

    const [industrialistRequests, setIndustrialistRequests] = useState([]);

    const handleAccept = (id) => {
        axios.put(`http://localhost:8080/requests/updateStatus/${id}`)
            .then(response => {
                // Update the UI or show a success message
                window.location.reload();
            })
            .catch(error => {
                console.error('Error accepting request:', error);
            });
    };

    const handleDecline = (id) => {
        axios.put(`http://localhost:8080/requests/declineStatus/${id}`)
            .then(response => {
                // Update the UI or show a success message
                window.location.reload();
            })
            .catch(error => {
                console.error('Error declining request:', error);
            });
    };


    useEffect(() => {

        const userData = JSON.parse(localStorage.getItem('userData'));

        const username = userData.username;

        axios.get(`http://localhost:8080/requests/agriculturist/${username}`)
            .then(response => {
                setIndustrialistRequests(response.data);
            })
            .catch(error => {
                console.error('Error fetching industrialist requests:', error);
            });
    }, []);

    return (
        <>
            <Navbar userRole={userRole} />
            <div className='agriculturist-interface-container-4'>

                <h1>Industrialist Requests</h1>


                {industrialistRequests.length === 0 ? (
                    <p className='no-data'>No industrialist requests available</p>
                ) : (
                    <div className='industrialist-request-container'>
                        {industrialistRequests.map((request, index) => (
                            <div key={index} className='request-entry'>
                                <div className='agriclutirst-container-header-flex'>
                                    <h2>{request.proposalTitle}</h2>
                                    <h2>{request.rewardOffered}</h2>
                                </div>
                                <p>Company Name: {request.companyName}</p>
                                <p>Industry Type: {request.industryType}</p>
                                <p>Industrialist Username: {request.username}</p>
                                <p>Estimated Carbon Emission: {request.estimatedCarbonEmission}</p>
                                {console.log(request.status)}
                                {request.status === 'null' ? (
                                    <>
                                        <button className='accept-btn' onClick={() => handleAccept(request.id)}>Accept</button>
                                        <button className='decline-btn' onClick={() => handleDecline(request.id)}>Decline</button>
                                    </>
                                ) : (
                                    <p>Status: {request.status == 'true' ? "Accepted" : "Declined"}</p>
                                )}
                                {/* Add more details if needed */}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}

export default IndustrialistRequest
