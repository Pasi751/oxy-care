import React, { useState, useEffect } from 'react'
import './agriculturist-responses.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const AgriculturistResponses = ({userRole}) => {

    const [agriculturistResponses, setAgriculturistResponses] = useState([]);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const username = userData.username;

        axios.get(`http://localhost:8080/requests/findByIndustrialist/${username}`)
            .then(response => {
                setAgriculturistResponses(response.data);
            })
            .catch(error => {
                console.error('Error retrieving agriculturist responses:', error);
                alert('Error retrieving agriculturist responses');
            });

    }, [userRole]);

    const renderAgriculturistResponses = () => {
        if (agriculturistResponses.length === 0) {
            return <p>No responses available</p>;
        }

        return agriculturistResponses.map((response, index) => (
            <div className="response-entry" key={index} style={{ backgroundColor: getStatusColor(response.status) }}>
                <div className='response-header-flex'>
                    <h2>Proposal Title: {response.proposalTitle}</h2>
                    <h2>{response.status}</h2>
                </div>
                <p>Farmer Username: {response.username}</p>
                <p>Contact Number: {response.contactNumber}</p>
                <p>Reward Offer: {response.rewardOffered}</p>
                <p>Estimated Carbon Emission: {response.estimatedCarbonEmission}</p>
            </div>
        ));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'accepted':
                return '#fafff5';
            case 'declined':
                return 'rgb(255, 235, 235)';
            default:
                return 'rgb(255, 248, 235)';
        }
    };

    return (
        <>
            <Navbar userRole={userRole} />
            <div class="agriculturist-response-container">
                <h1>Agriculturist Responses</h1>
                <div class="agriculturist-response-list">
                    {renderAgriculturistResponses()}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AgriculturistResponses
