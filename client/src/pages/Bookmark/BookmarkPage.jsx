import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlantCard from '../../components/PlantCard/Plantcard';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BookmarkPage = () => {
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    const goToHome = () => {
      navigate('/home');
    };

useEffect(() => {
    const fetchFavorites = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/favorites', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                setFavorites(data); // Assuming you have a state for favorites
            } else {
                console.error('Expected an array of favorites.');
            }
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    fetchFavorites();
}, []);


    return (
        <div className="container">
            <div className="header1">
        <div className="arrow1">
          <FaArrowLeft onClick={goToHome} size={24} />
        </div>
        <div>
          <h1>Your Favorite Plants</h1>
        </div>
        <div></div>

            </div>
        
        {favorites.length > 0 ? (
            <div className="plant-list">
                {favorites.map(plant => (
                    <PlantCard key={plant._id} plant={plant} />
                ))}
            </div>
        ) : (
            <p>No favorites found.</p>
        )}
    </div>
    );
};

export default BookmarkPage;
