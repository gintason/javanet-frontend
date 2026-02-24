'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCurrency } from '@/hooks/useCurrency';

interface Slide {
  id: number;
  image: string;
  alt: string;
}

const HeroSection: React.FC = () => {
  const { currencyInfo, isAfricanPricing } = useCurrency();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [textIndex, setTextIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [typingSpeed, setTypingSpeed] = useState<number>(100);

  const deploymentFee = isAfricanPricing 
    ? '₦5,000,000 - ₦10,000,000' 
    : '$10,000 - $15,000';

  // Simplified text variations as requested
  const textVariations = [
    "Schools & institutions",
    "Students and teachers", 
    "And Training Centers",
  ];

  // Typewriter effect animation
  useEffect(() => {
    const currentText = textVariations[textIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentText.length) {
        // Typing forward
        setCharIndex(prev => prev + 1);
        setTypingSpeed(100);
      } else if (isDeleting && charIndex > 0) {
        // Deleting backward
        setCharIndex(prev => prev - 1);
        setTypingSpeed(50);
      } else if (!isDeleting && charIndex === currentText.length) {
        // Pause at the end
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && charIndex === 0) {
        // Move to next text
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % textVariations.length);
        setTypingSpeed(500);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, typingSpeed, textVariations]);

  // Only two background slides as requested
  const slides: Slide[] = [
    { 
      id: 1, 
      image: "/images/hero/slide01.png",
      alt: "EdTech Platform - Computer Based Testing System"
    },
    { 
      id: 2, 
      image: "/images/hero/slide02.png",
      alt: "EdTech Platform - Virtual Classroom Interface"
    }
  ];

  // Auto slide transition
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  return (
    <section className="hero-section position-relative overflow-hidden min-vh-100">
      {/* Background Image Slideshow - Modified for responsiveness */}
      <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`position-absolute top-0 start-0 w-100 h-100 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Navy Blue Gradient Overlay - Faded from left to right */}
            <div 
              className="position-absolute top-0 start-0 w-100 h-100 z-1"
              style={{
                background: 'linear-gradient(90deg, rgba(10, 25, 47, 1) 0%, rgba(10, 25, 47, 1) 20%, rgba(10, 25, 47, 0.9) 30%, rgba(10, 25, 47, 0.7) 45%, rgba(10, 25, 47, 0.5) 60%, rgba(10, 25, 47, 0.3) 80%, transparent 100%)'
              }}
            />
                        
            {/* Background Image - Responsive positioning */}
            <div 
              className="position-absolute top-0 start-0 w-100 h-100 bg-cover"
              style={{ 
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                // Desktop: right-aligned, Mobile: center-aligned
                backgroundPosition: 'right center'
              }}
              role="img"
              aria-label={slide.alt}
            />
          </div>
        ))}
      </div>

      {/* Semi-transparent overlay to ensure content readability */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary z-0" 
           style={{ opacity: 0.15 }}></div>
      
      {/* Content Container - Kept exactly as before */}
      <div className="container position-relative z-2 py-5">
        <div className="row align-items-center min-vh-100 py-5">
          <div className="col-lg-6 text-white">
            
            {/* JavaNet Edtech Suite - Your Chosen Style */}
            <div className="mb-3">
                <p className="text-white-80 mb-1">
                  <i className="bi bi-diamond-fill text-light me-2"></i>
                  Introducing
                </p>
                <h3 className="fw-bold" style={{ color: '#FF6600' }}>JavaNet edTech Suite</h3>
              </div>

           <h4 className="display-5 fw-bold mb-4 text-light" style={{ lineHeight: '1.2' }}>
              An all-in-one branded edTech platform combining CBT and live virtual learning for:{" "}<br/>
              <span style={{ color: '#FF6600' }} className="typewriter-text">
                {textVariations[textIndex].substring(0, charIndex)}
                <span className="blinking-cursor">|</span>
              </span>
            </h4>
            
            <p className="lead mb-4">
              Launch your own fully branded Computer-Based Testing (CBT) and Live Interactive Learning platform with 
              a <strong>one-time deployment fee</strong>. No monthly subscriptions required.
            </p>
            
            <div className="d-flex flex-column flex-md-row gap-3 mt-4 fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Link 
              href="/proposal" 
              className="btn btn-warning px-2 px-md-3 py-1 py-md-2 fw-bold hover-lift text-nowrap"
            >
              <i className="bi bi-file-text me-1 me-md-2"></i>
              Generate Proposal
            </Link>
            
            <Link 
              href="/demo" 
              className="btn btn-outline-light px-2 px-md-3 py-1 py-md-2 fw-bold hover-lift text-nowrap"
            >
              <i className="bi bi-play-circle me-1 me-md-2"></i>
              Try Interactive Demo
            </Link>
          </div>


            {/* Trust Indicators */}
            <div className="mt-5 pt-3">
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="text-center">
                    <i className="bi bi-shield-check fs-1 text-warning"></i>
                    <p className="mt-2 mb-0">No Monthly Fees</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center">
                    <i className="bi bi-gear fs-1 text-warning"></i>
                    <p className="mt-2 mb-0">Full Customization</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center">
                    <i className="bi bi-headset fs-1 text-warning"></i>
                    <p className="mt-2 mb-0">24/7 Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Platform Preview */}
          <div className="col-lg-6 mt-5 mt-lg-0">
            <div className="card border-0 shadow-lg overflow-hidden" style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
              <div className="card-header bg-dark text-white py-3">
                <div className="d-flex align-items-center">
                  <div className="bg-success rounded-circle me-2" style={{ width: '10px', height: '10px' }}></div>
                  <small>Live Demo: ischool.ng</small>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="position-relative">
                  {/* Mock platform interface */}
                  <div className="p-4 bg-light border-bottom">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="mb-0 text-primary">Your Institution Dashboard</h5>
                      <span className="badge bg-primary">Custom Branded</span>
                    </div>
                    <div className="row g-3">
                      <div className="col-6">
                        <div className="bg-white p-3 rounded border">
                          <i className="bi bi-laptop text-primary fs-4 mb-2"></i>
                          <h6>CBT System</h6>
                          <small className="text-muted">Exams & Assessments</small>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="bg-white p-3 rounded border">
                          <i className="bi bi-camera-video text-success fs-4 mb-2"></i>
                          <h6>Live Classes</h6>
                          <small className="text-muted">Virtual Classroom</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="p-4 bg-white">
                    <div className="row text-center">
                      <div className="col-4 border-end">
                        <h4 className="text-primary mb-1">100+</h4>
                        <small className="text-muted">Schools</small>
                      </div>
                      <div className="col-4 border-end">
                        <h4 className="text-success mb-1">50K+</h4>
                        <small className="text-muted">Students</small>
                      </div>
                      <div className="col-4">
                        <h4 className="text-warning mb-1">24/7</h4>
                        <small className="text-muted">Support</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer bg-light text-center py-3">
                <small className="text-muted">
                  <i className="bi bi-info-circle me-1"></i>
                  This is a preview. Your platform will have your logo, colors, and domain.
                </small>
              </div>
            </div>

            {/* Simplified Slide Controls - Only navigation arrows */}
            <div className="mt-4 d-flex justify-content-center align-items-center gap-3">
              <button
                onClick={prevSlide}
                className="btn btn-sm btn-outline-light rounded-circle"
                aria-label="Previous slide"
                style={{ width: '36px', height: '36px' }}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              
              {/* Simple slide indicator (dot only) - Thumbnails removed */}
              <div className="d-flex gap-2 align-items-center">
                <small className="text-white me-2 d-none d-sm-block">
                  {currentSlide + 1} / {slides.length}
                </small>
                <div className="d-flex gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`btn btn-sm p-0 ${
                        index === currentSlide 
                          ? 'bg-white' 
                          : 'bg-white-50'
                      }`}
                      style={{ width: '8px', height: '8px', borderRadius: '50%' }}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              <button
                onClick={nextSlide}
                className="btn btn-sm btn-outline-light rounded-circle"
                aria-label="Next slide"
                style={{ width: '36px', height: '36px' }}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
            
            {/* Slide Counter - Simple text */}
            <div className="mt-2 text-center d-sm-none">
              <small className="text-white-80">
                Slide {currentSlide + 1} of {slides.length}
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Add this CSS for the animation */}
      <style jsx>{`
        .typewriter-text {
          font-family: inherit;
          font-size: inherit;
          display: inline;
          overflow: hidden;
          white-space: nowrap;
          letter-spacing: normal;
          vertical-align: baseline;
        }
        
        .blinking-cursor {
          animation: blink 1s infinite;
          color: #FF6600;
          font-weight: bold;
          margin-left: 2px;
          font-family: inherit;
          font-size: inherit;
          vertical-align: baseline;
        }
        
        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }
        
        /* Fix for display-4 line height issue */
        h2.display-4 {
          display: block;
          word-wrap: break-word;
        }
        
        h2.display-4 span.typewriter-text {
          display: inline;
          line-height: inherit;
        }
        
        /* Responsive background image positioning */
        @media (max-width: 768px) {
          .hero-section .bg-cover {
            background-position: center center !important;
            background-size: cover !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;