import React from 'react';
import './Settings.css';
import BottomNav from '../components/layout/BottomNav';

const StarIcon = ({ active }) => (
  <svg 
    className={`star-icon ${active ? 'active' : ''}`} 
    viewBox="0 0 24 24"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);



const Settings = () => {
  return (
    <div className="settings-container">
      <div className="settings-content">
        
        <div className="profile-section">
          <img src="/profileicon.png" alt="Kalu" className="profile-image" />
          <span className="profile-name">Kalu</span>
        </div>

        <ul className="settings-list">
          
          <li className="settings-item">
            <div className="item-header">
              <span className="item-bullet"></span>
              REVIEWS AND RATINGS
            </div>
            
            <div className="reviews-section">
              <div className="stars-container">
                <StarIcon active={true} />
                <StarIcon active={true} />
                <StarIcon active={true} />
                <StarIcon active={false} />
                <StarIcon active={false} />
              </div>
              <div className="comments-box">
                COMMENTS
              </div>
            </div>
          </li>

          <li className="settings-item">
            <div className="item-header">
              <span className="item-bullet"></span>
              CUSTOMER CARE
            </div>
            
            <div className="customer-care-sub">
              <span className="sub-bullet"></span>
              CHAT LIVE AGENT
            </div>
          </li>

          <li className="settings-item action-item">
            <div className="item-header">
              <span className="item-bullet red"></span>
              LOG OUT
            </div>
          </li>

          <li className="settings-item action-item">
            <div className="item-header">
              <span className="item-bullet red"></span>
              DELETE ACCOUNT
            </div>
          </li>

        </ul>
      </div>

      <BottomNav />
    </div>
  );
};

export default Settings;
