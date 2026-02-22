'use client';

import React from 'react';
import './AnnouncementBar.css'; // Move CSS to external file

const AnnouncementBar = () => {
  return (
    <div className="announcement-bar">
      <div className="marquee">
        <div className="marquee-content">
          <span>
            <i className="bi bi-megaphone-fill me-2"></i>
            JavaNet edTech Suite deploys fully branded CBT-based assessment systems and live online learning platforms built specifically for private schools
          </span>
          <span className="separator">•</span>
          <span>One-time deployment fee</span>
          <span className="separator">•</span>
          <span>No monthly subscriptions</span>
          <span className="separator">•</span>
          <span>Full customization</span>
          <span className="separator">•</span>
          <span>24/7 support</span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;