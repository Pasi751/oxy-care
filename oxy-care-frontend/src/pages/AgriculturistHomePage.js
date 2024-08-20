import React, { useState, useEffect } from 'react'
import image from '../images/farmer.jpg'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './agriculturist-homepage.css'

const AgriculturistHomePage = ({ userRole }) => {

    const [username, setUsername] = useState('');

      useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        setUsername(userData.username);
    }, [userRole]);

    return (
        <>
            <Navbar userRole={userRole} />
            <div className='agriculturist-homepage-container'>
                <div className='agriculturist-homepage-container-left'>
                    <img src={image} alt='image' />
                </div>
                <div className='agriculturist-homepage-container-right'>
                    <h1>Hello, {username}!</h1>
                    <h2>Welcome to Your Agriculturist Dashboard!</h2>
                    <p>Dive into a world of sustainable farming practices and environmental stewardship. Here, you can manage every aspect of your farm, from crop cultivation to livestock management. Connect with like-minded farmers, explore innovative techniques, and stay updated with the latest trends in agriculture. Track your carbon emissions, calculate your environmental impact, and take steps towards a greener future. Join us in nurturing the land, conserving resources, and fostering a community of eco-conscious agriculturists committed to sustainable farming.</p>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default AgriculturistHomePage
