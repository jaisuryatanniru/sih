import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './PlantDetails.css';

const PlantDetails = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home');
  };


  useEffect(() => {
    fetch(`http://localhost:5000/api/plants/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          setPlant(data);
        } else {
          throw new Error('No data found for this ID');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching plant details:', error);
        setLoading(false);
      });
  }, [id]);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!plant) {
    return <div>Plant not found</div>;
  }

  return (
    <div className="plant-details">
      <div className="header1">
      <div className="arrow1">
          <FaArrowLeft onClick={goToHome} size={24} />
        </div>
        <div>
        <h1>{plant.name}</h1>
        </div>
        <div></div>
        </div>
        <div className='image-slider'>
            <img src={plant.new_url} alt="name"  className="new-image" />
        </div>
      
        <div className="plant-details-section">
      <img src={plant.image_url} alt={plant.name} className="detail-image" />
      
      <div className="plant-details-content">
      <p><strong>Scientific Name:</strong> {plant.scientific_name}</p>
      <p><strong>Medical Use:</strong> {plant.medical_use}</p>
      <p><strong>Availability:</strong> {plant.availability.join(', ')}</p>
      <p><strong>Category:</strong> {plant.category}</p>

      <h2>Method of Cultivation</h2>
        <div className="cultivation-info">  
                    <p><strong>Climate:</strong> {plant["Method of Cultivation"].Climate}</p>
                    <p><strong>Soil:</strong> {plant["Method of Cultivation"].Soil}</p>
                    <p><strong>Propagation:</strong> {plant["Method of Cultivation"].Propagation}</p>
                    <p><strong>Climate:</strong> {plant["Method of Cultivation"].Climate}</p>
        </div>
      
      <h2>Habitat</h2>
        <div className="habitat-info">
          <p><strong>Native Region:</strong> {plant['Habitat']['Native Region']}</p>
          <p><strong>Growth Regions:</strong> {plant['Habitat']['Growth Regions']}</p>
        </div>
    </div>
    </div>
    </div>

  );
};

export default PlantDetails;

