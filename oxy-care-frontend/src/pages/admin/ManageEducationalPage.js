import React, { useState,useEffect } from 'react'
import './manage-educational.css'
import Navbar from '../../components/Navbar'
import Editor from '../Editor'
import Footer from '../../components/Footer'
import axios from 'axios';

const ManageEducationalPage = ({ userRole }) => {


  const [initialValue,setInitialValue] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get('http://localhost:8080/editor/1');
        setInitialValue(response.data.content);
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
        <Editor initialValue={initialValue} type={1}/>
      </div>
      <Footer />
    </>
  )
}

export default ManageEducationalPage
