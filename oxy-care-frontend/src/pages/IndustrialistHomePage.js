import React, { useState, useEffect } from 'react'
import image from '../images/industrialist.jpg'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './industrialist-homepage.css'

const IndustrialistHomePage = ({ userRole }) => {

    const [username, setUsername] = useState('');

      useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        setUsername(userData.username);
    }, [userRole]);

    return (
        <>
            <Navbar userRole={userRole} />
            <div className='industrialist-homepage-container'>
                <div className='industrialist-homepage-container-left'>
                    <img src={image} alt='image' />
                </div>
                <div className='industrialist-homepage-container-right'>
                    <h1>Hello, {username}!</h1>
                    <h2>Welcome to Your Industrialist Dashboard!</h2>
                    <p>Step into a realm of eco-friendly initiatives and sustainable business practices. Here, you can explore a diverse range of agricultural projects and connect with farmers dedicated to sustainable agriculture. Offset your carbon footprint by supporting local farmers and participating in reforestation efforts. Discover innovative solutions for sustainable production, reduce waste, and promote environmental conservation. Join us in building a sustainable future, where industry and agriculture coexist harmoniously to protect our planet for generations to come.</p>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default IndustrialistHomePage
