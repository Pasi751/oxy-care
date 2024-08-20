import React from 'react';
import './proposal.css';
import axios from 'axios';

const ProposalDetails = ({ proposal }) => {

    const handleBid = () => {
        window.location.href = `/bid-form/${proposal.id}`;
    };

    return (
        <div className='proposal-details-container'>

            <div className='proposal-detail-flex'>
                <h2>Problem {proposal.id}</h2>
                <h2>{proposal.amount} PKR</h2>
            </div>
            <h3>{proposal.proposalTitle}</h3>
            <p>Name: {proposal.username}</p>
            <p>Company Name: {proposal.companyName}</p>
            <p>Industry Type: {proposal.industryType}</p>
            <button onClick={handleBid}>Bid</button>
        </div>
    );
};

export default ProposalDetails;
