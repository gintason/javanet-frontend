// components/AnnouncementBar.tsx
'use client'; // Add this directive at the very top

import React, { useEffect, useState } from 'react';
import './AnnouncementBar.css';

const AnnouncementBar = () => {
  const [isClient, setIsClient] = useState(false);
  const message = "JavaNet edTech Suite deploys fully branded CBT-based assessment systems and live online learning platforms built specifically for private schools.";

  useEffect(() => {
    // This runs only on the client after mounting
    setIsClient(true);
  }, []);

  // Don't render anything on the server or during first client render
  // This prevents the hydration mismatch
  if (!isClient) {
    return null;
  }

  return (
    <div className="announcement-bar">
      <div className="marquee">
        <div className="marquee-content">
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