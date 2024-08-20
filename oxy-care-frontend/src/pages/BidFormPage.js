import React, { useState } from 'react';
import './bid-form.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BidFormPage = () => {
    const { proposalId } = useParams();
    const [bidAmount, setBidAmount] = useState('');
    const [completionTime, setCompletionTime] = useState('');
    const [additionalServices, setAdditionalServices] = useState('');
    const [relevantExperience, setRelevantExperience] = useState('');
    const [approachMethodology, setApproachMethodology] = useState('');
    const [teamMembers, setTeamMembers] = useState('');

    const userData = JSON.parse(localStorage.getItem('userData'));
    const agriculturistUsername = userData ? userData.username : '';

    const submitProposal = () => {
        axios.post(`http://localhost:8080/agriculturist/${agriculturistUsername}/proposal/${proposalId}`, {
            amount: bidAmount,
            days: completionTime,
            skills: additionalServices,
            experience: relevantExperience,
            approach: approachMethodology,
            teamMemberDetails: teamMembers
        })
            .then(response => {
                console.log('Bid saved successfully:', response.data);
                alert('Bid saved successfully:');
                const form = document.querySelector('.bid-form');
                if (form) {
                    form.reset();
                }
                window.location.href = '/agriculturist';
            })
            .catch(error => {
                alert('Failed to save bid:');
                console.error('Failed to save bid:', error);
            });
    };

    const goBack = () => {
        window.location.href = '/agriculturist';
    };

    return (
        <div className='bid-form-container'>
            <h1>Place a Bid</h1>
            <form className='bid-form'>
                <label htmlFor="bid-amount">What is your bid amount for this industrial problem?(PKR)<span className="required">*</span></label>
                <input type="number" id="bid-amount" name="bid-amount" min="0" step="0.01" required value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} />


                <label htmlFor="completion-time">How long do you estimate it will take to complete the task?(Days)<span className="required">*</span></label>
                <input type="number" id="completion-time" name="completion-time" min="1" required value={completionTime} onChange={(e) => setCompletionTime(e.target.value)} />


                <label htmlFor="additional-services">Do you offer any additional services or special skills relevant to this task?</label>
                <textarea id="additional-services" name="additional-services" rows="4" value={additionalServices} onChange={(e) => setAdditionalServices(e.target.value)}></textarea>

                <label htmlFor="relevant-experience">Describe any relevant experience you have in similar projects or tasks.<span className="required">*</span></label>
                <textarea id="relevant-experience" name="relevant-experience" rows="4" required value={relevantExperience} onChange={(e) => setRelevantExperience(e.target.value)}></textarea>

                <label htmlFor="approach-methodology">Outline your approach and methodology for addressing the industrial problem.<span className="required">*</span></label>
                <textarea id="approach-methodology" name="approach-methodology" rows="4" required value={approachMethodology} onChange={(e) => setApproachMethodology(e.target.value)}></textarea>

                <label htmlFor="team-members">Provide details about your team members who will be involved in this project, including their expertise.<span className="required">*</span></label>
                <textarea id="team-members" name="team-members" rows="4" required value={teamMembers} onChange={(e) => setTeamMembers(e.target.value)}></textarea>

                <div className='btn-container'>
                    <button type="button" className='go-back' onClick={goBack}>Go Back</button>
                    <button type="button" className='submit-proposal' onClick={submitProposal}>Submit Proposal</button>
                </div>
            </form>
        </div>
    );
};

export default BidFormPage;
