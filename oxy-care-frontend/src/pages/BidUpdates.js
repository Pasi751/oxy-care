import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './bid-updates.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';

const BidUpdates = ({ userRole }) => {


    const [proposalData, setProposalData] = useState([]);


    useEffect(() => {

        const userData = JSON.parse(localStorage.getItem('userData'));

        const username = userData.username;

        axios.get(`http://localhost:8080/proposals/industrialist/${username}`)
            .then(response => {
                setProposalData(response.data);
            })
            .catch(error => {
                console.error('Error retrieving proposal data:', error);
                alert('Error retrieving proposal data');
            });
    }, [userRole]);


    const acceptBid = (farmerName, proposalTitle) => {

        const formData = new FormData();
        formData.append('farmerUsername', farmerName);
        formData.append('proposalTitle', proposalTitle);

        axios.post('http://localhost:8080/proposals/accept-farmer', formData)
            .then(response => {
                console.log('Farmer accepted:', response.data);
                alert('Farmer accepted successfully');
                window.location.reload();
            })
            .catch(error => {
                console.error('Error accepting farmer:', error);
                alert('Error accepting farmer');
            });
    };


    const declineBid = (farmerName, proposalTitle) => {

        const formData = new FormData();
        formData.append('username', farmerName);
        formData.append('proposalTitle', proposalTitle);

        axios.put(`http://localhost:8080/bids/updateStatusDecline`, formData)
            .then(response => {
                console.log('Bid status updated:', response.data);
                alert('Bid status updated successfully');
                // You may want to update the UI to reflect the declined bid
                window.location.reload();
            })
            .catch(error => {
                console.error('Error updating bid status:', error);
                alert('Error updating bid status');
            });
    };

    const renderProposalList = () => {
        if (proposalData.length === 0) {
            return <p>No data available</p>;
        }
        return proposalData.map((proposal, index) => (
            <div className="proposal-container" key={index}>
                <h3>{proposal.proposalTitle}</h3>
                <p>{proposal.proposalDescription}</p>
                <div className="bid-list">
                    {proposal.bidList.map((bid, bidIndex) => (
                        <div className="bid-container" key={bidIndex}>
                            <h2>{bid.farmerName}</h2>
                            <p className="city">{bid.farmerCity}</p>
                            <p>
                                Amount: {bid.amount}, Days: {bid.days}, Skills: {bid.skills}, Experience: {bid.experience}, Approach: {bid.approachDetails}, Team Member Details: {bid.teamDetails}
                            </p>
                            <div className="action-buttons">
                                <button className="submit-btn" onClick={() => acceptBid(bid.farmerName, proposal.proposalTitle)}>Accept</button>
                                <button className="decline-btn" onClick={() => declineBid(bid.farmerName, proposal.proposalTitle)}>Decline</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ));
    };
    return (
        <>
            <Navbar userRole={userRole} />
            <div class="bid-updates-container">
                <h1>Bid Updates</h1>
                <div class="bid-list">

                    <div class="bid-entry">

                        {renderProposalList()}
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default BidUpdates
