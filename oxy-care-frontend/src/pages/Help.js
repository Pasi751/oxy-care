import React from 'react'
import Navbar from '../components/Navbar'
import image1 from '../images/help.jpg'
import './help.css'
import Footer from '../components/Footer'

const HelpPage = ({ userRole }) => {
  return (
    <>
      <Navbar userRole={userRole} />
      <div className='contact-us-container'>
        <div className='contact-us-container-left'>
          <h1>Don't worry! We've got you covered</h1>
          <p>
            If you need assistance or have any questions, please refer to our user guide for detailed instructions. You can download the user guide <a href="/user-guide.pdf">here</a>. Alternatively, for further inquiries or feedback, feel free to reach out to us. Our dedicated team at Oxy Care is here to help you.
          </p>
        </div>

        <div className='contact-us-container-right'>
          <img src={image1} alt='contact-us-image' />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default HelpPage
