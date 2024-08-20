import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './navbar.css';

const Navbar = ({ userRole }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const [isHovering, setIsHovering] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        window.localStorage.removeItem("userData");
        window.location.href = '/login';
    };


    const handleScrollToServices = () => {

        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = '/';
            setTimeout(() => {
                const servicesSectionHome = document.getElementById('services');
                if (servicesSectionHome) {
                    servicesSectionHome.scrollIntoView({ behavior: 'smooth' });
                }
            }, 1000); // Adjust the timeout as needed
        }
    };

    const handleHover = () => {
        setIsHovering(true);
    };

    const handleLeave = () => {
        setIsHovering(false);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-left">
                    {!userRole && (
                        <Link to="/" className="navbar-brand">
                            OxyCare
                        </Link>
                    )}

                    {userRole === 'admin' && (
                        <Link to="/" className="navbar-brand">
                            OxyCare Admin
                        </Link>
                    )}

                    {userRole === 'explorer' && (
                        <Link to="/explorer" className="navbar-brand">
                            OxyCare
                        </Link>
                    )}

                    {userRole === 'industrialist' && (
                        <Link to="/industrialist-homepage" className="navbar-brand">
                            OxyCare
                        </Link>
                    )}

                    {userRole === 'agriculturist' && (
                        <Link to="/agriculturist-homepage" className="navbar-brand">
                            OxyCare
                        </Link>
                    )}



                </div>

                {!isOpen && (
                    <button className="navbar-toggle" onClick={handleToggle}>
                        &#9776;
                    </button>
                )}

                {isOpen && (
                    <button className="navbar-toggle close-icon" onClick={handleToggle}>
                        &times;
                    </button>
                )}

                <div className="navbar-right">

                    {userRole === 'agriculturist' && (
                        <div className="navbar-right-links-industrialist">

                            <div className="nav-link dropdown" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                                <span>Bids</span>
                                {isHovering && (
                                    <div className="dropdown-content">
                                        <Link to="/agriculturist" className="dropdown-link">Proposals</Link>
                                        <Link to="/industrialist-response" className="dropdown-link">Industrialist Response</Link>
                                        <Link to="/industrialist-request" className="dropdown-link">Industrialist Requests</Link>
                                    </div>
                                )}
                            </div>

                            <Link to="/my-earnings" className={`nav-link ${location.pathname === '/my-earnings' && 'active'}`}>
                                My earnings
                            </Link>

                            <div className="nav-link dropdown" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                                <span>Educational</span>
                                {isHovering && (
                                    <div className="dropdown-content">
                                        <Link to="/educational" className="dropdown-link">Information</Link>
                                        <Link to="/glossary" className="dropdown-link">Glossary</Link>
                                        <Link to="/media" className="dropdown-link">Media</Link>
                                    </div>
                                )}
                            </div>

                            <Link to="/profile" className={`nav-link ${location.pathname === '/profile' && 'active'}`}>
                                Profile
                            </Link>
                            <Link to="/login" className="nav-link" onClick={handleLogout}>
                                Log Out
                            </Link>
                        </div>
                    )}

                    {userRole === 'industrialist' && (
                        <div className="navbar-right-links-industrialist">
                            <div className="nav-link dropdown" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                                <span>Eco-Calculator</span>
                                {isHovering && (
                                    <div className="dropdown-content">
                                        <Link to="/eco-calculator" className="dropdown-link">Eco Calculator</Link>
                                        <Link to="/eco-history" className="dropdown-link">Eco History</Link>
                                    </div>
                                )}
                            </div>
                            <div className="nav-link dropdown" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                                <span>Agri-Hire</span>
                                {isHovering && (
                                    <div className="dropdown-content">
                                        <Link to="/agri-hire" className="dropdown-link">Submit Proposal</Link>
                                        <Link to="/bid-updates" className="dropdown-link">Bid Updates</Link>
                                        <Link to="/accepted-farmers" className="dropdown-link">Accepted Farmers</Link>
                                        <Link to="/view-all-agriculturists" className="dropdown-link">Hire Agriculturist</Link>
                                        <Link to="/agriculturists-responses" className="dropdown-link">Agriculturist Responses</Link>
                                    </div>
                                )}
                            </div>
                            <div className="nav-link dropdown" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                                <span>Educational</span>
                                {isHovering && (
                                    <div className="dropdown-content">
                                        <Link to="/educational" className="dropdown-link">Information</Link>
                                        <Link to="/glossary" className="dropdown-link">Glossary</Link>
                                        <Link to="/media" className="dropdown-link">Media</Link>
                                    </div>
                                )}
                            </div>
                            <Link to="/profile" className={`nav-link ${location.pathname === '/profile' && 'active'}`}>
                                Profile
                            </Link>
                            <Link to="/login" className="nav-link" onClick={handleLogout}>
                                Log Out
                            </Link>
                        </div>
                    )}

                    {userRole === 'explorer' && (
                        <div className="navbar-right-links">
                            <Link to="/explorer" className={`nav-link ${location.pathname === '/explorer' && 'active'}`}>
                                Home
                            </Link>
                            <div className="nav-link dropdown" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                                <span>Educational</span>
                                {isHovering && (
                                    <div className="dropdown-content">
                                        <Link to="/educational" className="dropdown-link">Information</Link>
                                        <Link to="/glossary" className="dropdown-link">Glossary</Link>
                                        <Link to="/media" className="dropdown-link">Media</Link>
                                    </div>
                                )}
                            </div>
                            <Link to="/profile" className={`nav-link ${location.pathname === '/profile' && 'active'}`}>
                                Profile
                            </Link>
                            <Link to="/login" className="nav-link" onClick={handleLogout}>
                                Log Out
                            </Link>
                        </div>
                    )}

                    {userRole === 'admin' && (
                        <div className="navbar-right-links-admin">
                            <Link to="/manage-agriculturist" className={`nav-link ${location.pathname === '/manage-agriculturist' && 'active'}`}>
                                Agriculturist
                            </Link>
                            <Link to="/manage-industrialist" className={`nav-link ${location.pathname === '/manage-industrialist' && 'active'}`}>
                                Industrialist
                            </Link>
                            <Link to="/manage-explorer" className={`nav-link ${location.pathname === '/manage-explorer' && 'active'}`}>
                                Explorer
                            </Link>
                            <div className="nav-link dropdown" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                                <span>Educational</span>
                                {isHovering && (
                                    <div className="dropdown-content">
                                        <Link to="/manage-educational" className="dropdown-link">Information</Link>
                                        <Link to="/manage-glossary" className="dropdown-link">Glossary</Link>
                                        <Link to="/media" className="dropdown-link">Media</Link>
                                    </div>
                                )}
                            </div>
                            <Link to="/login" className="nav-link" onClick={handleLogout}>
                                Log Out
                            </Link>
                        </div>
                    )}

                    {(userRole !== 'agriculturist' && userRole !== 'industrialist' && userRole !== 'explorer' && userRole !== 'admin') && (
                        <div className="navbar-right-links">
                            <Link to="/" className={`nav-link ${location.pathname === '/' && 'active'}`}>
                                Home
                            </Link>
                            <Link to="/" onClick={handleScrollToServices} className={`nav-link ${location.pathname === '/services' && 'active'}`}>
                                Services
                            </Link>
                            <Link to="/contact-us" className={`nav-link ${location.pathname === '/contact-us' && 'active'}`}>
                                Contact Us
                            </Link>
                            <Link to="/login" className="nav-link">
                                Log In
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
            <div className={`navbar-mobile ${isOpen ? "open" : ""}`}>


                {userRole === 'agriculturist' && (
                    <>
                        <Link to="/" className={`nav-link ${location.pathname === '/' && 'active'}`}>
                            Home
                        </Link>
                        <Link to="/educational" className={`nav-link ${location.pathname === '/educational-profile' && 'active'}`}>
                            Educational
                        </Link>
                        <Link to="/profile" className="nav-link" onClick={handleLogout}>
                            Profile
                        </Link>
                        <Link to="/login" className="nav-link" onClick={handleLogout}>
                            Log Out
                        </Link>
                    </>
                )}

                {userRole === 'industrialist' && (
                    <>
                        <Link to="/eco-calculator" className={`nav-link ${location.pathname === '/eco-calculator' && 'active'}`}>
                            Eco Credit Calculator
                        </Link>
                        <Link to="/agri-hire" className={`nav-link ${location.pathname === '/agri-hire' && 'active'}`}>
                            Agri Hire
                        </Link>
                        <Link to="/educational" className={`nav-link ${location.pathname === '/educational' && 'active'}`}>
                            Educational
                        </Link>
                        <Link to="/profile" className={`nav-link ${location.pathname === '/profile' && 'active'}`}>
                            Profile
                        </Link>
                        <Link to="/login" className="nav-link" onClick={handleLogout}>
                            Log Out
                        </Link>
                    </>
                )}

                {userRole === 'explorer' && (
                    <>
                        <Link to="/explorer" className={`nav-link ${location.pathname === '/explorer' && 'active'}`}>
                            Home
                        </Link>

                        <Link to="/educational" className={`nav-link ${location.pathname === '/educational' && 'active'}`}>
                            Educational
                        </Link>
                        <Link to="/profile" className={`nav-link ${location.pathname === '/profile' && 'active'}`}>
                            Profile
                        </Link>
                        <Link to="/login" className="nav-link" onClick={handleLogout}>
                            Log Out
                        </Link>
                    </>
                )}

                {userRole === 'admin' && (
                    <>
                        <Link to="/manage-agriculturist" className={`nav-link ${location.pathname === '/manage-agriculturist' && 'active'}`}>
                            Agriculturist
                        </Link>
                        <Link to="/manage-industrialist" className={`nav-link ${location.pathname === '/manage-industrialist' && 'active'}`}>
                            Industrialist
                        </Link>
                        <Link to="/manage-explorer" className={`nav-link ${location.pathname === '/manage-explorer' && 'active'}`}>
                            Explorer
                        </Link>
                        <Link to="/manage-educational" className={`nav-link ${location.pathname === '/manage-educational' && 'active'}`}>
                            Educational
                        </Link>
                        <Link to="/login" className="nav-link" onClick={handleLogout}>
                            Log Out
                        </Link>
                    </>
                )}

                {(userRole !== 'agriculturist' && userRole !== 'industrialist' && userRole !== 'explorer' && userRole !== 'admin') && (
                    <>
                        <Link to="/" className={`nav-link ${location.pathname === '/' && 'active'}`}>
                            Home
                        </Link>
                        <Link to="/" onClick={handleScrollToServices} className={`nav-link ${location.pathname === '/services' && 'active'}`}>
                            Services
                        </Link>
                        <Link to="/contact-us" className={`nav-link ${location.pathname === '/contact-us' && 'active'}`}>
                            Contact Us
                        </Link>
                        <Link to="/login" className={`nav-link ${location.pathname === '/login' && 'active'}`} onClick={() => setIsOpen(false)}>
                            Log In
                        </Link>
                    </>
                )}
            </div>
            <div className={`overlay ${isOpen ? "show" : ""}`}></div>

        </>
    )
}

export default Navbar;
