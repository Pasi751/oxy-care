import React, { useState, useEffect } from 'react'
import './viewAllAgriculturists.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const ViewAllAgriculturists = ({ userRole }) => {

    const [agriculturists, setAgriculturists] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/agriculturists/viewAll')
            .then(response => {
                setAgriculturists(response.data);
            })
            .catch(error => {
                console.error('Error retrieving agriculturists:', error);
                alert('Error retrieving agriculturists');
            });

    }, [userRole]);

    const handleHireBtn = (agriculturistUsername) => {
        window.location.href = `/submit-proposal/${agriculturistUsername}`;
        console.log(`Update industrialist with id ${agriculturistUsername}`);
    };


    const renderAgriculturistList = () => {
        if (agriculturists.length === 0) {
            return <p>No agriculturists available</p>;
        }

        return agriculturists.map((agriculturist, index) => (
            <div className="agriculturist-entry" key={index}>
                <h2>{agriculturist.username}</h2>
                <p><strong>Email:</strong> {agriculturist.email}</p>
                <p><strong>City:</strong> {agriculturist.city}</p>
                <p><strong>Province:</strong> {agriculturist.province}</p>
                <p><strong>Phone Number:</strong> {agriculturist.phoneNumber}</p>
                <p><strong>Types of Trees Planted:</strong> {agriculturist.typesOfTreesPlanted}</p>
                <p><strong>Trees Planted:</strong> {agriculturist.treesPlanted}</p>

                <button onClick={() => handleHireBtn(agriculturist.username)} className='agri-hire-btn'>Hire</button>


            </div>
        ));
    };

    return (
        <>
            <Navbar userRole={userRole} />
            <div class="view-all-agriculturist-container">
                <h1>Agriculturist List</h1>
                <div class="agriculturist-list">
                    {renderAgriculturistList()}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ViewAllAgriculturists
