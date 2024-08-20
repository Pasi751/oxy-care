import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SignupAgriculturistImage from '../images/signupAgriculturistImage.jpg';
import './sign-up-agricultuirst.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import axios from 'axios';

const SignUpAgriculturist = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        if (!form.username.value || !form.password.value || !form.email.value || !form.contact_number.value || !form.treeType.value || !form.num_trees_planted.value || !form.province.value || !form.city.value || !form.cnicImage.files[0] || !form.business_license_upload.files[0]) {
            alert('Please fill in all fields.');
            return;
        }

        const contactNumberPattern = /^\+92\d{10}$/;


        if (!form.contact_number.value.match(contactNumberPattern)) {
            alert('contact number is invalid');
            return;
        }

        // Password validation
        const password = form.password.value;
        const passwordPattern = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!passwordPattern.test(password)) {
            alert('Password must contain at least one special character and be at least 8 characters long.');
            return;
        }

        const formData = new FormData(form);
        try {
            await axios.post('http://localhost:8080/register/agriculturist', formData);
            alert('Registration successful! Please check your email for verification.');
            form.reset();
            setCnicFileName('');
            setLicenseFileName('');
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again later.');
        }
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

    function validateFileSize(event, maxSizeInMB) {
        const file = event.target.files[0];
        const maxSize = maxSizeInMB * 1024 * 1024; // Convert MB to bytes
        if (file && file.size > maxSize) {
            alert('File size exceeds the limit of 20MB.');
            event.target.value = ''; // Reset the file input
        }
    }




    return (
        <>
            <Navbar />
            <div className='sign-up-agriculturist-container'>
                <div className='sign-up-agriculturist-container-left'>
                    <img src={SignupAgriculturistImage} alt='sign-up-agriculturist-image' />
                </div>
                <div className='sign-up-agriculturist-container-right'>

                    <div className='signup-agriculturist-form-container'>
                        <h1>Sign Up as Agricultuirst</h1>
                        <form onSubmit={handleSubmit} className='signup-agriculturist-form'>
                            <div className='agriculturist-form-row-1'>
                                <input type="text" placeholder="Username" name='username' />
                                <input type="password" placeholder="Password" name='password' />
                            </div>
                            <div className='agriculturist-form-row-2'>
                                <input type="email" placeholder="Email" name='email' />
                                <input type="text" placeholder="Contact Number" name='contact_number' /> {/* Changed "Company Name" to "Contact Number" */}
                            </div>
                            <div className='agriculturist-form-row-3'>
                                <select name="treeType">
                                    <option value="" className='select-default-value' disabled selected>Select Type of Tree</option>
                                    <option value="Eucalyptus">Eucalyptus</option>
                                    <option value="Poplar">Poplar</option>
                                    <option value="Neem">Neem</option>
                                    <option value="Mango">Mango</option>
                                    <option value="Sandalwood">Sandalwood</option>
                                    <option value="Date Palm">Date Palm</option>
                                    <option value="Guava">Guava</option>
                                    <option value="Other">Other</option>
                                </select>
                                <input type="number" placeholder="Number of Trees" name="num_trees_planted" /> {/* Added "Number of Trees" input */}
                            </div>
                            <div className='agriculturist-form-row-4'>
                                <select value={selectedProvince} onChange={handleProvinceChange} name="province">
                                    <option value="" className='select-default-value' disabled selected>Select Province</option>
                                    {provinceOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                                <select name="city">
                                    <option value="" className='select-default-value' disabled selected>Select City</option>
                                    {cities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='agriculturist-form-row-5'>
                                <div className='input-file1'>
                                    <input type='file' name="cnicImage" onChange={(e) => handleFileChange(e, setCnicFileName)} onInput={(e) => validateFileSize(e, 20)} />
                                    <p id='button'>{cnicFileName ? cnicFileName : "Upload CNIC"}</p>
                                </div>
                                <div className='input-file2'>
                                    <input type='file' name="business_license_upload" onChange={(e) => handleFileChange(e, setLicenseFileName)} onInput={(e) => validateFileSize(e, 20)} />
                                    <p id='button'>{licenseFileName ? licenseFileName : "Upload Business License"}</p>
                                </div>
                            </div>
                            <button type="submit" className='submit-agriculturist-signup'>Sign Up</button>
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

export default SignUpAgriculturist;
