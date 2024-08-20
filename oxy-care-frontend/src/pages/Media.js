import React from 'react'
import './media.css'
import videoFile from '../videos/video1.mp4';
import videoFile1 from '../videos/video2.mp4';
import videoFile2 from '../videos/video3.mp4';
import videoFile3 from '../videos/video4.mp4';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Media = ({userRole}) => {
    return (
        <>
            <Navbar userRole={userRole}/>
            <div className='educational-container-2'>
                <h1>Media</h1>
                <div className='media-container'>

                    <div className='media-container-row'>
                        <h1>What Is Climate Change?</h1>
                        <video controls>
                            <source src={videoFile1} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    <div className='media-container-row'>
                        <h1>Causes And Effects Of Climate Change</h1>
                        <video controls>
                            <source src={videoFile2} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    <div className='media-container-row'>
                        <h1>What Is Carbon Offset?</h1>
                        <video controls>
                            <source src={videoFile} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    <div className='media-container-row'>
                        <h1>How Carbon Offset Works?</h1>
                        <video controls>
                            <source src={videoFile3} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default Media
