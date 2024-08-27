import React from 'react';
import './About.css';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft } from 'react-icons/fa';
import {useNavigate } from 'react-router-dom';
import Home from '../Home/Home';

const AboutUs = () => {

    const navigate = useNavigate();

    const goToHome=()=>{
        navigate('/home');
    };

    return (
        <div className="container">
            <div className='header'>
            <div className='arrow1'>
           <FaArrowLeft onClick={goToHome} size={24}/>
        </div>
        <div>
            <h1>About Us</h1>
        </div>
        <div></div>
        </div>
           

            <div className="about-section">
                <img 
                    src="../WhatsApp Image 2024-08-23 at 16.16.57_6d1c493f.jpg" 
                    alt="Our Team" 
                    className="team-image" 
                />
                <div className="about-content">
                    <h2>Welcome to the Virtual AYUSH Herbal Garden</h2>
                    <p>
                        Explore the ancient wisdom of Ayurveda, Yoga, Unani, Siddha, and Homeopathy (AYUSH) through our immersive Virtual Herbal Garden. This innovative platform brings the traditional healing practices of India to your fingertips, making it accessible to everyone.
                    </p>

                    <h2>Our Mission</h2>
                    <p>
                        Our mission is to assist and provide helpful responses to your inquiries, engage in productive conversations, and offer guidance on a wide range of topics.
                    </p>

                    <h2>Our Values</h2>
                    <ul>
                        <li>Helpfulness</li>
                        <li>Creativity</li>
                        <li>Empathy</li>
                        <li>Accuracy</li>
                        <li>Continuous improvement</li>
                    </ul>

                    <p>
                        Our Virtual Herbal Garden is designed to educate and inspire students, practitioners, and enthusiasts of AYUSH. Embark on a journey to explore the rich heritage of traditional Indian medicine and discover the potential of medicinal plants to transform your health and wellbeing.
                    </p>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default AboutUs;
