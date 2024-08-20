import React from 'react'
import Navbar from '../components/Navbar'
import explorer from '../images/explorer.jpg'
import './explorer-page.css'
import Footer from '../components/Footer'


const ExplorerPage = ({ userRole }) => {
  return (
    <>
        <Navbar userRole={userRole}/>
        <div className='explorer-container'>
            <div className='explorer-container-left'>
                <img src={explorer} alt='explorer' />
            </div>

            <div className='explorer-container-right'>
                <h1>Welcome to ORCMS</h1>
                <p>
                    Welcome to the Oxygen Carbon Rich Management System, 
                    a groundbreaking platform designed to bridge the gap 
                    between industrialists and farmers in the mission for 
                    a greener future. Our platform allows industrialists 
                    to calculate their carbon emissions accurately and 
                    then match them with farmers willing to grow trees 
                    that offset these emissions. By connecting these 
                    two vital stakeholders, we aim to create a sustainable 
                    ecosystem where businesses can take responsibility for 
                    their carbon footprint while supporting local farmers in 
                    their efforts to combat climate change. Join us in our 
                    mission to build a healthier planet for future generations.
                </p>
            </div>

        </div>
        <Footer />
    </>
  )
}

export default ExplorerPage
