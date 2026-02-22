// components/AnnouncementBar.tsx
import React from 'react';
import './AnnouncementBar.css'; // Adjust path as needed

const AnnouncementBar = () => {
  const message = "JavaNet edTech Suite deploys fully branded CBT-based assessment systems and live online learning platforms built specifically for private schools.";

  return (
    <div className="announcement-bar">
      <div className="marquee">
        <div className="marquee-content">
          {/* Repeat the message for seamless continuous scrolling */}
          <span>{message}</span>
          <span className="separator">✦</span>
          <span>{message}</span>
          <span className="separator">✦</span>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;