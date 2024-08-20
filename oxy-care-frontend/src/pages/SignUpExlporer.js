import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SignupExplorerImage from '../images/signupExplorerImage.jpg';
import './sign-up-explorer.css'; // Update the CSS file name
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import axios from 'axios';

const SignUpExplorer = () => {
    const [selectedProvince, setSelectedProvince] = useState('');
    const [cities, setCities] = useState([]);

    const provinceOptions = [
        { value: 'punjab', label: 'Punjab' },
        { value: 'sindh', label: 'Sindh' },
        { value: 'kpk', label: 'Kyber Pakhtunkhwa (KPK)' },
        { value: 'balochistan', label: 'Balochistan' },
        { value: 'gilgit', label: 'Gilgit-Baltistan' },
        { value: 'ajk', label: 'Azad Jammu and Kashmir (AJK)' }
    ];

    const cityOptions = {
        punjab: ['Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala', 'Sialkot', 'Bahawalpur', 'Sheikhupura'],
        sindh: ['Karachi', 'Hyderabad', 'Sukkur', 'Larkana', 'Nawabshah', 'Mirpur Khas', 'Thatta', 'Khairpur'],
        kpk: ['Peshawar', 'Abbottabad', 'Mardan', 'Swat (Mingora)', 'Nowshera', 'Kohat', 'Haripur', 'Mansehra'],
        balochistan: ['Quetta', 'Gwadar', 'Turbat', 'Khuzdar', 'Loralai', 'Zhob', 'Sibi', 'Nasirabad (Dera Murad Jamali)'],
        gilgit: ['Gilgit', 'Skardu', 'Hunza', 'Chilas'],
        ajk: ['Muzaffarabad', 'Mirpur', 'Kotli']
    };

    const handleProvinceChange = (event) => {
        const selectedProvince = event.target.value;
        setSelectedProvince(selectedProvince);
        setCities(cityOptions[selectedProvince] || []);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        if (!form.username.value || !form.password.value || !form.email.value || !form.contact_number.value) {
            alert('Please fill in all fields.');
            return;
        }

        const contactNumberPattern = /^\+92\d{10}$/;


        if (!form.contact_number.value.match(contactNumberPattern)) {
            alert('contact number is invalid')
            return;
        }

        const password = form.password.value;
        const passwordPattern = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!passwordPattern.test(password)) {
            alert('Password must contain at least one special character and be at least 8 characters long.');
            return;
        }

        const formData = new FormData(form);


        try {
            await axios.post('http://localhost:8080/register/explorer', formData);
            alert('Registration successful! Please check your email for verification.');
            form.reset();
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again later.');
        }
    };

    return (
        <>
            <Navbar />
            <div className='sign-up-explorer-container'>
                <div className='sign-up-explorer-container-left'>
                    <img src={SignupExplorerImage} alt='sign-up-explorer-image' />
                </div>
                <div className='sign-up-explorer-container-right'>

                    <div className='signup-explorer-form-container'>
                        <h1>Sign Up as Explorer</h1>
                        <form className='signup-explorer-form' onSubmit={handleSubmit}>
                            <div className='explorer-form-row-1'>
                                <input type="text" placeholder="Username" name='username'/>
                                <input type="password" placeholder="Password" name='password'/>
                            </div>
                            <div className='explorer-form-row-2'>
                                <input type="email" placeholder="Email" name='email'/>
                                <input type="text" placeholder="Contact Number" name='contact_number'/>
                            </div>
                            <button type="submit" className='submit-explorer-signup'>Sign Up</button>
                            <div className='link-container'>
                                Already have an account?
                                <Link to="/login" className='login-link'>Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SignUpExplorer;
