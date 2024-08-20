import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SignupIndustrialistImage from '../images/signUpIndustrialistImage.jpg';
import './sign-up-industrialist.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import axios from 'axios';

const SignUpIndustrialist = () => {
    const [selectedProvince, setSelectedProvince] = useState('');
    const [cities, setCities] = useState([]);
    const [cnicFileName, setCnicFileName] = useState('');
    const [licenseFileName, setLicenseFileName] = useState('');

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


    const handleFileChange = (event, setFileName) => {
        const file = event.target.files[0];
        const maxSize = 15 * 1024 * 1024; // 20MB in bytes

        if (file && file.size > maxSize) {
            alert('File size exceeds the limit of 20MB.');
            event.target.value = ''; // Reset the file input
            setFileName(''); // Clear the file name display
        } else {
            setFileName(file ? file.name : '');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;





        if (!form.username.value || !form.password.value || !form.email.value || !form.companySize.value || !form.companyName.value || !form.companyType.value || !form.province.value || !form.city.value || !form.cnicImage.files[0] || !form.business_license_upload.files[0]) {
            alert('Please fill in all fields.');
            return;
        }

        // const contactNumberPattern = /^\+92\d{10}$/;


        // if(!form.contact_number.value.match(contactNumberPattern)){
        //     alert('contact number is invalid');
        //     return;
        // }

        const password = form.password.value;
        const passwordPattern = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!passwordPattern.test(password)) {
            alert('Password must contain at least one special character and be at least 8 characters long.');
            return;
        }

        const formData = new FormData(form);
        try {
            await axios.post('http://localhost:8080/register/industrialist', formData);
            alert('Registration successful! Please check your email for verification.');
            form.reset();
            setCnicFileName('');
            setLicenseFileName('');
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again later.');
        }
    };

    return (
        <>
            <Navbar />
            <div className='sign-up-industrialist-container'>
                <div className='sign-up-industrialist-container-left'>
                    <img src={SignupIndustrialistImage} alt='sign-up-industrialist-image' />
                </div>
                <div className='sign-up-industrialist-container-right'>

                    <div className='signup-industrialist-form-container'>
                        <h1>Sign Up as Industrialist</h1>
                        <form className='signup-industrialist-form' onSubmit={handleSubmit}>
                            <div className='industrialist-form-row-1'>
                                <input type="text" placeholder="Username" name='username' />
                                <input type="password" placeholder="Password" name='password' />
                            </div>
                            <div className='industrialist-form-row-2'>
                                <input type="email" placeholder="Email" name='email' />
                                <input type="text" placeholder="Company Name" name='companyName' />
                            </div>
                            <div className='industrialist-form-row-3'>
                                <select name='companyType'>
                                    <option value="" className='select-default-value' disabled selected>Select Company Type</option>
                                    <option value="manufacturing">Manufacturing</option>
                                    <option value="technology">Technology</option>
                                    <option value="services">Services</option>
                                    <option value="energy">Energy</option>
                                    <option value="transportation">Transportation</option>
                                    <option value="retails">Retails and Consumer Goods</option>
                                    <option value="financial">Financial Institutions</option>
                                </select>
                                <select name='companySize'>
                                    <option value="" className='select-default-value' disabled selected>Select Company Size</option>
                                    <option value="1-50">1 - 50 employees</option>
                                    <option value="51-200">51 - 200 employees</option>
                                    <option value="201-500">201 - 500 employees</option>
                                    <option value="501-1000">501 - 1000 employees</option>
                                    <option value="1001+">1001+ employees</option>
                                </select>
                            </div>
                            <div className='industrialist-form-row-4'>
                                <select value={selectedProvince} onChange={handleProvinceChange} name='province'>
                                    <option value="" className='select-default-value' disabled selected>Select Province</option>
                                    {provinceOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                                <select name='city'>
                                    <option value="" className='select-default-value' disabled selected>Select City</option>
                                    {cities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='industrialist-form-row-5'>
                                <div className='input-file1'>
                                    <input type='file' name='cnicImage' onChange={(e) => handleFileChange(e, setCnicFileName)} />
                                    <p id='button'>{cnicFileName ? cnicFileName : "Upload CNIC"}</p>
                                </div>
                                <div className='input-file2'>
                                <input type='file' name='business_license_upload' onChange={(e) => handleFileChange(e, setLicenseFileName)} />
                                    <p id='button'>{licenseFileName ? licenseFileName : "Upload Business License"}</p>
                                </div>
                            </div>
                            <button type="submit" className='submit-industrialist-signup'>Sign Up</button>
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

export default SignUpIndustrialist;
