import React, { useState, useEffect } from 'react';
import './my-earnings.css'
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MyEarnings = ({userRole}) => {

    const [completedBids, setCompletedBids] = useState([]);

    useEffect(() => {

    const userData = JSON.parse(localStorage.getItem('userData'));

    const username = userData.username;

    axios.get(`http://localhost:8080/proposals/agriculturist/completed-bids/${username}`)
      .then(response => {
        setCompletedBids(response.data);
      })
      .catch(error => {
        console.error('Error fetching completed bids:', error);
      });
  }, []);

    return (

        <>
        <Navbar userRole={userRole} />
        <div className='agriculturist-interface-container-3'>

            <div className='header-container-flex'>
                <h1>My Earnings</h1>
                {completedBids.length > 0 && (
                    <h1>{completedBids.reduce((total, bid) => total + parseFloat(bid.amount), 0)} PKR</h1>
                )}
            </div>

            {completedBids.length === 0 ? (
                <p className='no-data'>No earnings yet</p>
            ) : (
                <div className='earnings-table-container'>
                    <table className='earnings-table'>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {completedBids.map((bid, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td>{bid.date}</td>
                                    <td>{bid.amount} PKR</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className='withdraw-button'>Withdraw</button>
                </div>
            )}
        </div>
        <Footer />
        </>
    )
}

export default MyEarnings
