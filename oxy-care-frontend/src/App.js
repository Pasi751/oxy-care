import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import AboutUs from './pages/AboutUs';
import NotFound from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUpAgriculturist from './pages/SignUpAgriculturist';
import SignUpIndustrialist from './pages/SignUpIndustrialist';
import SignUpExplorer from './pages/SignUpExlporer';
import AgriculturistInterface from './pages/AgriculturistInterface';
import Profile from './pages/Profile';
import Educational from './pages/Educational';
import AdminPage from './pages/Editor';
import EcoCalculator from './pages/EcoCalculator';
import AgriHire from './pages/AgriHire';
import ExplorerPage from './pages/ExplorerPage';
import ManageAgriculturist from './pages/admin/ManageAgriculturist';
import ManageIndustrialist from './pages/admin/ManageIndustrialist';
import ManageExplorer from './pages/admin/ManageExplorer';
import ManageEducational from './pages/admin/ManageEducationalPage';
import AdminLogin from './pages/admin/AdminLogin';
import BidFormPage from './pages/BidFormPage';
import MarkAsComplete from './pages/MarkAsComplete';
import HelpPage from './pages/Help';
import UpdateAgriculturist from './pages/admin/UpdateAgriculturists';
import UpdateIndustrialist from './pages/admin/UpdateIndustrialist';
import UpdateExplorer from './pages/admin/UpdateExplorer';
import Media from './pages/Media';
import Glossary from './pages/Glossary';
import ManageGlossaryPage from './pages/admin/ManageGlossaryPage';
import SubmitProposal from './pages/SubmitProposal';
import CarbonHistory from './pages/CarbonHistory';
import BidUpdates from './pages/BidUpdates';
import AcceptedFarmerList from './pages/AcceptedFarmerList';
import ViewAllAgriculturists from './pages/ViewAllAgriculturists';
import AgriculturistResponses from './pages/AgriculturistResponses';
import MyEarnings from './pages/MyEarnings';
import IndustrialistResponse from './pages/IndustrialistResponse';
import IndustrialistRequest from './pages/IndustrialistRequest';
import AgriculturistHomePage from './pages/AgriculturistHomePage';
import IndustrialistHomePage from './pages/IndustrialistHomePage';

function App() {

  const [userData, setUserData] = useState(() => {
    const savedUserData = localStorage.getItem('userData');
    return savedUserData ? JSON.parse(savedUserData) : null;
  });

  const [userRole, setUserRole] = useState('');



  useEffect(() => {
    if (userData) {
      setUserRole(userData.userRole);
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [userData]);

  console.log('userdata', userData);


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/services' element={<Services />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/login' element={<Login setUser={setUserData} />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/sign-up-agriculturist' element={<SignUpAgriculturist />} />
          <Route path='/sign-up-industrialist' element={<SignUpIndustrialist />} />
          <Route path='/sign-up-explorer' element={<SignUpExplorer />} />
          <Route
            path='/agriculturist'
            element={userData ? <AgriculturistInterface userRole={userRole} /> : <Navigate to="/login" />}
          />

          <Route
            path='/agriculturist-homepage'
            element={userData ? <AgriculturistHomePage userRole={userRole} /> : <Navigate to="/login" />}
          />

          <Route
            path='/industrialist-homepage'
            element={userData ? <IndustrialistHomePage userRole={userRole} /> : <Navigate to="/login" />}
          />

          <Route
            path='/industrialist-response'
            element={userData ? <IndustrialistResponse userRole={userRole} /> : <Navigate to="/login" />}
          />

          <Route
            path='/industrialist-request'
            element={userData ? <IndustrialistRequest userRole={userRole} /> : <Navigate to="/login" />}
          />

          <Route
            path='/my-earnings'
            element={userData ? <MyEarnings userRole={userRole} /> : <Navigate to="/login" />}
          />

          <Route
            path='/bid-form/:proposalId'
            element={userData ? <BidFormPage /> : <Navigate to="/login" />}
          />
          <Route
            path='/mark-as-complete/:proposalTitle'
            element={userData ? <MarkAsComplete /> : <Navigate to="/login" />}
          />
          <Route path='/help' element={<HelpPage userRole={userRole} />} />
          <Route
            path='/profile'
            element={userData ? <Profile userRole={userRole} /> : <Navigate to="/login" />}
          />
          <Route
            path='/educational'
            element={userData ? <Educational userRole={userRole} /> : <Navigate to="/login" />}
          />

          <Route
            path='/media'
            element={userData ? <Media userRole={userRole} /> : <Navigate to="/login" />}
          />

          <Route
            path='/glossary'
            element={userData ? <Glossary userRole={userRole} /> : <Navigate to="/login" />}
          />

          <Route
            path='/eco-calculator'
            element={userData ? <EcoCalculator userRole={userRole} /> : <Navigate to="/login" />}
          />

          <Route
            path='/eco-history'
            element={userData ? <CarbonHistory userRole={userRole} /> : <Navigate to="/login" />}
          />

          <Route
            path='/bid-updates'
            element={userData ? <BidUpdates userRole={userRole} /> : <Navigate to="/login" />}
          />

          <Route
            path='/accepted-farmers'
            element={userData ? <AcceptedFarmerList userRole={userRole} /> : <Navigate to="/login" />}
          />

          <Route
            path='/view-all-agriculturists'
            element={userData ? <ViewAllAgriculturists userRole={userRole} /> : <Navigate to="/login" />}
          />

          <Route
            path='/agriculturists-responses'
            element={userData ? <AgriculturistResponses userRole={userRole} /> : <Navigate to="/login" />}
          />

          <Route
            path='/agri-hire'
            element={userData ? <AgriHire userRole={userRole} /> : <Navigate to="/login" />}
          />

          <Route
            path='/submit-proposal/:agriculturistUsername'
            element={userData ? <SubmitProposal userRole={userRole} /> : <Navigate to="/login" />}
          />

          <Route
            path='/explorer'
            element={userData ? <ExplorerPage userRole={userRole} /> : <Navigate to="/login" />}
          />
          <Route
            path='/manage-agriculturist'
            element={userData && userData.userRole === "admin" ? <ManageAgriculturist userRole={userRole} /> : <Navigate to="/" />}
          />
          <Route
            path='/manage-industrialist'
            element={userData && userData.userRole === "admin" ? <ManageIndustrialist userRole={userRole} /> : <Navigate to="/" />}
          />
          <Route
            path='/manage-explorer'
            element={userData && userData.userRole === "admin" ? <ManageExplorer userRole={userRole} /> : <Navigate to="/" />}
          />
          <Route
            path='/manage-educational'
            element={userData && userData.userRole === "admin" ? <ManageEducational userRole={userRole} /> : <Navigate to="/" />}
          />

          <Route
            path='/manage-glossary'
            element={userData && userData.userRole === "admin" ? <ManageGlossaryPage userRole={userRole} /> : <Navigate to="/" />}
          />

          <Route
            path='/updateAgriculturistPage/:id'
            element={userData && userData.userRole === "admin" ? <UpdateAgriculturist userRole={userRole} /> : <Navigate to="/" />}
          />
          <Route
            path='/updateIndustrialistPage/:id'
            element={userData && userData.userRole === "admin" ? <UpdateIndustrialist userRole={userRole} /> : <Navigate to="/" />}
          />
          <Route
            path='/updateExplorerPage/:id'
            element={userData && userData.userRole === "admin" ? <UpdateExplorer userRole={userRole} /> : <Navigate to="/" />}
          />
          <Route path='/admin' element={<AdminLogin setUser={setUserData} />} />
          {/* Catch-all route for handling unknown routes */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
