import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PlantCard from '../../components/PlantCard/Plantcard';
import ImageSlider from '../../components/Slider/ImageSlider';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import "./Home.css";

function NewHome() {
  const [plantsByCategory, setPlantsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/plants')
      .then((response) => response.json())
      .then((data) => {
        const categorizedPlants = data.reduce((acc, plant) => {
          const { category } = plant;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(plant);
          return acc;
        }, {});

        setPlantsByCategory(categorizedPlants);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching plants:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filterPlants = (plants) => {
    return plants.filter((plant) =>
      (plant.name?.toLowerCase() || "").includes(searchQuery) ||
      (plant.scientific_name?.toLowerCase() || "").includes(searchQuery) ||
      (plant.medical_use?.toLowerCase() || "").includes(searchQuery)
    );
  };

  if (loading) {
    return <div>Loading plants...</div>;
  }

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <ImageSlider />
      {Object.keys(plantsByCategory).map((category, index) => (
        <div key={index} className="category-section">
          <div className="category-header">
            <h2>{category}</h2>
            <Link to={`/category/${category}`} className="more-button">
              More
            </Link>
          </div>
          <div className="plant-cards-row">
            {filterPlants(plantsByCategory[category]).slice(0, 5).map((plant, i) => (
              <PlantCard key={i} plant={plant} />
            ))}
          </div>
        </div>
      ))}
      
      <Footer />
    </div>
  );
}

export default NewHome;
