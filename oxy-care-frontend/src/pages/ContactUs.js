import React from 'react'
import Navbar from '../components/Navbar'
import image1 from '../images/4249629.jpg'
import './ContactUs.css'
import Footer from '../components/Footer'

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className='contact-us-container'>
        <div className='contact-us-container-left'>
          <h1>Contact Us</h1>
          <p>
            For any inquiries, feedback, or assistance, feel free to reach out to us.
            Our dedicated team at Oxy Care is here to help you with your queries
            regarding our products and services. You can contact us via email at
            email@example.com or give us a call at +1-234-567-890. Alternatively,
            you can fill out the contact form on our website, and we will get back
            to you as soon as possible. Thank you for choosing Oxy Care for your
            health and wellness needs.
          </p>

          <form className='form-container'>
            <div class="mb-3">
              <input type="text" class="name-field" id="name" name="name" placeholder='Name' required />
            </div>
            <div class="mb-3">
              <input type="email" class="email-field" id="email" name="email" placeholder='Email' required />
            </div>
            <div class="mb-3">
              <textarea class="inquiry-text-field" id="inquiry" name="inquiry" rows="3" placeholder='Inquiry' required></textarea>
            </div>
            <button type="submit" class="contact-us-btn">Submit</button>
          </form>

        </div>

        <div className='contact-us-container-right'>
          <img src={image1} alt='contact-us-image' />
        </div>


      </div>
      <Footer />
    </>
  )
}

export default ContactUs
