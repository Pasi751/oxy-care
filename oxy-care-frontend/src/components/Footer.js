import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faHome, faEnvelope, faPhone, faPrint, faGem } from '@fortawesome/free-solid-svg-icons';


export default function Footer() {
    return (
        <MDBFooter bgColor='none' style={{ backgroundColor: '#C6EBC5', marginTop: '5rem'}} className='text-center text-lg-start text-muted'>
            <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                <div className='me-5 d-none d-lg-block'>
                    <span>Get connected with us on social networks:</span>
                </div>

                <div>
                    <a href='' className='me-4 text-reset'>
                        <FontAwesomeIcon color='secondary' icon={faFacebookF} />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <FontAwesomeIcon color='secondary' icon={faTwitter} />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <FontAwesomeIcon color='secondary' icon={faGoogle} />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <FontAwesomeIcon color='secondary' icon={faInstagram} />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <FontAwesomeIcon color='secondary' icon={faLinkedin} />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <FontAwesomeIcon color='secondary' icon={faGithub} />
                    </a>
                </div>
            </section>

            <section className=''>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3'>
                        <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                Oxygen Rich Carbon Management System
                            </h6>
                            <p>
                            Innovative platform designed to interconnect industrialists and farmers
                            </p>
                        </MDBCol>

                        <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Team Members</h6>
                            <p>
                                Areeba Mehboob
                            </p>
                            <p>
                                Fatima Latif
                            </p>
                            <p>
                                Tayyaba Naeem
                            </p>
                        </MDBCol>

                        <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                            <p>
                                <a href='/' className='text-reset'>
                                    Home
                                </a>
                            </p>
                            <p>
                                <a href='/help' className='text-reset'>
                                    Help
                                </a>
                            </p>
                            <p>
                                <a href='/contact-us' className='text-reset'>
                                    Contact Us
                                </a>
                            </p>
                            <p>
                                <a href='/login' className='text-reset'>
                                    Login
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                            <p>
                                <FontAwesomeIcon icon={faHome} color='secondary' className='me-2' />
                                New York, NY 10012, US
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faEnvelope} color='secondary' className='me-3' />
                                info@example.com
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faPhone} color='secondary' className='me-3' /> + 01 234 567 88
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faPrint} color='secondary' className='me-3' /> + 01 234 567 89
                            </p>

                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2024 Copyright:
                <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
                    ORCMS
                </a>
            </div>
        </MDBFooter>
    );
}