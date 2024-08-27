import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaBookmark, FaSearch, FaGreaterThan, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';

const Navbar = ({ onSearch }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileCardOpen, setProfileCardOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));

    fetch('http://localhost:5000/api/userinfo', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setUser(data);
      })
      .catch(error => console.error('Error fetching user info:', error));
  }, []);

  const toggleCategoryDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleProfileCard = () => {
    setProfileCardOpen(!profileCardOpen);
  };

  const closeProfileCard = () => {
    setProfileCardOpen(false);
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  const goToBookmarkPage = () => {
    navigate('/bookmark');
  };

  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleShowPasswordFields = () => {
    setShowPasswordFields(true);
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/change-password', {
        oldPassword,
        newPassword
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data === "Password updated successfully") {
        alert('Password updated successfully!');
        setShowPasswordFields(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        alert('Incorrect old password!');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      alert('An error occurred while updating the password.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar">
        <div className="web-title">
          <h2>Herbsphere</h2>
        </div>
        <div className="nav-links">
          <ul className="navbar-links">
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li
              className="category-dropdown"
              onMouseEnter={toggleCategoryDropdown}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <a onClick={toggleCategoryDropdown}>Category</a>
              {dropdownOpen && (
                <div className="category-menu">
                  <ul>
                    {categories.map((category, index) => (
                      <li key={index} onClick={() => handleCategoryClick(category)}>
                        <a>{category} <FaGreaterThan size={12} fill="white" /></a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
        <div className="navbar-icons">
          <FaSearch className="navbar-icon" size={24} onClick={handleSearchClick} />
          {searchOpen && (
            <input
              type="text"
              className="search_bar"
              placeholder="Search plants..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          )}
          <FaBookmark className="navbar-icon" size={24} onClick={goToBookmarkPage} />
          <FaUserCircle className="navbar-icon" size={36} onClick={toggleProfileCard} />
        </div>
      </nav>

      {profileCardOpen && (
        <div className="profile-card-overlay" onClick={closeProfileCard}>
          <div className={`profile-card ${showPasswordFields ? 'expanded' : ''}`} onClick={(e) => e.stopPropagation()}>
            <FaTimes className="close-icon" onClick={closeProfileCard} />
            <div className="profile-icon-container">
              <FaUserCircle className="profile-icon" size={100} />
            </div>
            <div className="profile-info">
              {user ? (
                <>
                  <p><strong>{user.name}</strong></p>
                  <p>{user.email}</p>
                </>
              ) : (
                <p>No user information available</p>
              )}
            </div>
            <div className="profile-actions">
              {showPasswordFields ? (
                <>
                  <input
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button className="profile-action-btn" onClick={handlePasswordChange}>
                    Change Password
                  </button>
                </>
              ) : (
                <button className="profile-action-btn" onClick={handleShowPasswordFields}>
                  Change Password
                </button>
              )}
              <button className="profile-action-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
