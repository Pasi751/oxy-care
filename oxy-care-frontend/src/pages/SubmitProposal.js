import React, { useState, useEffect } from 'react'
import './submit-proposal.css'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom';
import axios from 'axios'

const SubmitProposal = () => {

    const { agriculturistUsername } = useParams();

    const [industrialistData, setIndustrialistData] = useState({
        yourName: '',
        companyName: '',
        industryType: ''
    });

    const [formData, setFormData] = useState({
        industrialistName: '',
        companyName: '',
        industryType: '',
        proposalTitle: '',
        estimatedCarbonEmission: '',
        mainEmissionSource: '',
        additionalDetails: '',
        rewardOffered: '',
        paymentMethod: '',
        bidSubmissionDeadline: ''
    });



    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            industrialistName: industrialistData.yourName,
            companyName: industrialistData.companyName,
            industryType: industrialistData.industryType
        }));
    }, [industrialistData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        const requestData = {
            industrialistUsername: industrialistData.yourName,
            agriculturistUsername: agriculturistUsername,
            proposal: formData
        };
    
        axios.post('http://localhost:8080/requests/create', requestData)
            .then(response => {
                console.log('Proposal created:', response.data);
                alert('Proposal Created');
                window.location.href = '/agri-hire'
            })
            .catch(error => {
                console.error('Error creating proposal', error);
                alert('Error creating proposal');
            });
        
    };


    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            industrialistName: industrialistData.yourName,
            companyName: industrialistData.companyName,
            industryType: industrialistData.industryType
        }));
    }, [industrialistData]);


    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const username = userData.username;

        axios.get(`http://localhost:8080/industrialists/${username}`)
            .then(response => {
                const industrialist = response.data;
                setIndustrialistData({
                    yourName: industrialist.username,
                    companyName: industrialist.companyName,
                    industryType: industrialist.companyType
                });
            })
            .catch(error => {
                console.error('Error retrieving industrialist data:', error);
                alert('Error retrieving industrialist data:');
            });
    }, []);

    return (
        <>
            <div className='submit-proposal-container'>

                <form className="agri-hire-form" onSubmit={handleSubmit}>
                    <h1>Submit Proposal for {agriculturistUsername}</h1>
                    <label htmlFor="yourName">Your Name:</label>
                    <input type="text" id="yourName" name="username" value={industrialistData.yourName} readOnly />

                    <label htmlFor="companyName">Company / Organization Name:</label>
                    <input type="text" id="companyName" name="companyName" value={industrialistData.companyName} readOnly />

                    <label htmlFor="industryType">Industry Type:</label>
                    <input type="text" id="industryType" name="companyType" value={industrialistData.industryType} readOnly />

                    <label htmlFor="proposalTitle">Proposal Title:</label>
                    <input type="text" id="proposalTitle" name="proposalTitle" value={formData.proposalTitle} onChange={handleChange} required />

                    <label htmlFor="estimatedCarbonEmission">Estimated Carbon Emission:</label>
                    <input type="number" id="estimatedCarbonEmission" name="estimatedCarbonEmission" value={formData.estimatedCarbonEmission} onChange={handleChange} required />

                    <label htmlFor="mainEmissionSource">Main Emission Source:</label>
                    <input type="text" id="mainEmissionSource" name="mainEmissionSource" value={formData.mainEmissionSource} onChange={handleChange} required />

                    <label htmlFor="additionalDetails">Additional Details:</label>
                    <textarea id="additionalDetails" name="additionalDetails" value={formData.additionalDetails} onChange={handleChange} required></textarea>

                    <label htmlFor="rewardOffered">Reward Offered (in pkr):</label>
                    <input type="number" id="rewardOffered" name="rewardOffered" value={formData.rewardOffered} onChange={handleChange} required />

                    <label htmlFor="paymentMethod">Select Payment Method:</label>
                    <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
                        <option value="creditCard">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="bankTransfer">Bank Transfer</option>
                    </select>

                    <label htmlFor="bidSubmissionDeadline">Bid Submission Deadline:</label>
                    <input type="datetime-local" id="bidSubmissionDeadline" name="bidSubmissionDeadline" value={formData.bidSubmissionDeadline} onChange={handleChange} required />
                    
                    <div className='agri-hire-btn-container'>
                        <button className='go-back-btn' onClick={() => window.location.href = '/agri-hire'}>Go back</button>
                        <button type="submit">Submit</button>
                    </div>
                    
                </form>
            </div>
        </>
    )
}

export default SubmitProposal
