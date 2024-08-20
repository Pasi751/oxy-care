import React, { useState, useEffect } from 'react'
import './manage-educational.css'
import Navbar from '../../components/Navbar'
import Editor from '../Editor'
import Footer from '../../components/Footer'
import axios from 'axios';

const ManageGlossaryPage = ({ userRole }) => {

    const [value,setValue] = useState("");

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await axios.get('http://localhost:8080/editor/2');
                setValue(response.data.content);
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };
        fetchContent();
    }, []);

    return (
        <>
            <Navbar userRole={userRole} />
            <div className='educational-container'>
                <h1>Glossary</h1>
                <Editor initialValue={value} type={2}/>
            </div>
            <Footer />
        </>
    )
}

export default ManageGlossaryPage
