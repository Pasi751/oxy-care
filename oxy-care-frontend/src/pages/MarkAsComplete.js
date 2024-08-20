import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './mark-as-complete.css';
import markCompleteImage from '../images/bid-complete.jpg';
import axios from 'axios';

const MarkAsComplete = () => {
    const { proposalTitle } = useParams();
    const [checklist, setChecklist] = useState({
        treeHeight: false,
        fertilizerApplied: false,
        pestsControlled: false,
        irrigationDone: false,
        weedsRemoved: false
    });

    const handleChecklistChange = (item) => {
        setChecklist({
            ...checklist,
            [item]: !checklist[item]
        });
    };

    const handleCompleteOrder = () => {
        // Validate checklist before marking as complete
        const isChecklistComplete = Object.values(checklist).every(item => item);
        if (!isChecklistComplete) {
            alert('Please complete all checklist items before marking as complete');
            return;
        }

        // Create MarkBidCompleteDTO object
        const markBidCompleteDto = {
            proposalTitle,
            date: new Date().toISOString().slice(0, 10) // Get today's date in YYYY-MM-DD format
        };

        // Call API to mark order as complete
        axios.put(`http://localhost:8080/proposals/mark-bid-completed`, markBidCompleteDto)
            .then(response => {
                alert('Bid marked as completed successfully');
                window.location.href = '/agri-hire';
                // Handle success, e.g., redirect to another page
            })
            .catch(error => {
                console.error('Error marking bid as completed:', error);
                alert('Error marking bid as completed. Please try again.');
            });
    };

    const goBack = () => {
        window.location.href = '/agri-hire';
    };

    return (
        <div className='mark-as-complete-main-container'>
            
            <div className='mark-as-complete-image-container'>
                <img src={markCompleteImage} alt='image-complete' />
            </div>

            <div className='mark-as-complete-container'>
                <h1>Release the payment</h1>
                <div className='checklist'>
                    <label className='checklist-item'>
                        <input
                            type='checkbox'
                            checked={checklist.treeHeight}
                            onChange={() => handleChecklistChange('treeHeight')}
                        />
                        <span>Height of trees above 2 inches</span>
                    </label>
                    <label className='checklist-item'>
                        <input
                            type='checkbox'
                            checked={checklist.fertilizerApplied}
                            onChange={() => handleChecklistChange('fertilizerApplied')}
                        />
                        <span>Fertilizer applied</span>
                    </label>
                    <label className='checklist-item'>
                        <input
                            type='checkbox'
                            checked={checklist.pestsControlled}
                            onChange={() => handleChecklistChange('pestsControlled')}
                        />
                        <span>Pests controlled</span>
                    </label>
                    <label className='checklist-item'>
                        <input
                            type='checkbox'
                            checked={checklist.irrigationDone}
                            onChange={() => handleChecklistChange('irrigationDone')}
                        />
                        <span>Irrigation done</span>
                    </label>
                    <label className='checklist-item'>
                        <input
                            type='checkbox'
                            checked={checklist.weedsRemoved}
                            onChange={() => handleChecklistChange('weedsRemoved')}
                        />
                        <span>Weeds removed</span>
                    </label>
                </div>
                <div className='mark-as-complete-btn-container'>
                    <button className='go-back-btn' onClick={goBack}>Go Back</button>
                    <button className='mark-as-complete-btn' onClick={handleCompleteOrder}>Mark as Complete</button>
                </div>
            </div>
        </div>
    );
};

export default MarkAsComplete;
