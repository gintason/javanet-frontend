'use client';

import React, { useEffect, useRef } from 'react';

const AnnouncementBar = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const scrollContent = scrollElement.querySelector('.scroll-content');
    if (!scrollContent) return;

    // Clone the content for seamless looping
    const clone = scrollContent.cloneNode(true);
    scrollElement.appendChild(clone);

    // Set up animation
    let animationFrame: number;
    let scrollPosition = 0;
    const speed = 0.5; // pixels per frame

    const animate = () => {
      scrollPosition += speed;
      
      // Reset when first set of content has scrolled completely
      if (scrollPosition >= scrollContent.clientWidth) {
        scrollPosition = 0;
      }
      
      scrollElement.style.transform = `translateX(-${scrollPosition}px)`;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div 
      className="announcement-bar"
      style={{
        backgroundColor: '#FF6600',
        color: 'white',
        padding: '8px 0',
        overflow: 'hidden',
        position: 'relative',
        borderBottom: '2px solid rgba(255,255,255,0.1)',
        zIndex: 1030, // Higher than navbar's z-index
      }}
    >
      <div 
        className="scroll-container"
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          position: 'relative',
        }}
        ref={scrollRef}
      >
        <div className="scroll-content" style={{ display: 'flex', gap: '50px', paddingRight: '50px' }}>
          <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>
            <i className="bi bi-megaphone-fill me-2" style={{ fontSize: '1rem' }}></i>
            JavaNet edTech Suite deploys fully branded CBT-based assessment systems and live online learning platforms built specifically for private schools
          </span>
          <span style={{ fontSize: '0.95rem', fontWeight: '500', color: 'rgba(255,255,255,0.9)' }}>
            • One-time deployment • No monthly fees • Full customization •
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;