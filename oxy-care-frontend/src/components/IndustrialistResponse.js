import React from 'react';
import './industrialist-response.css';

const IndustrialistResponse = ({ bid }) => {
  return (
    <div className="bid-entry" style={{ backgroundColor: getStatusColor(bid.status) }}>
      <div className='bid-entry-flex'>
        <h2>Bid {bid.bidId} {getStatusText(bid.status)}</h2>
        <h4>{bid.amount} PKR</h4>
      </div>
      
      <div className="bid-details">
        <div className="bid-details-left">
          <p><strong>Industrialist Name:</strong> {bid.industrialistName}</p>
          <p><strong>Company Name:</strong> {bid.companyName}</p>
          <p><strong>Proposal Title:</strong> {bid.proposalTitle}</p>
          <p><strong>Days:</strong> {bid.days}</p>
        </div>
        <div className="bid-details-right">
          <p><strong>Skills:</strong> {bid.skills}</p>
          <p><strong>Experience:</strong> {bid.experience}</p>
          <p><strong>Approach:</strong> {bid.approachDetails}</p>
          <p><strong>Team Member Details:</strong> {bid.teamDetails}</p>
        </div>
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Accepted':
      return '#fafff5';
    case 'Rejected':
      return 'rgb(255, 235, 235)';
    default:
      return 'rgb(255, 248, 235)';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'Accepted':
      return 'Accepted';
    case 'Rejected':
      return 'Rejected';
    default:
      return 'Pending';
  }
};

export default IndustrialistResponse;
