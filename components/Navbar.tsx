// components/Navbar.js
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthContext } from '@/contexts/AuthContext';
import { useCurrency } from '@/hooks/useCurrency';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuthContext();
  const { currencyInfo } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Customization', href: '/customization' },
    { name: 'Demo', href: '/demo' },
    { name: 'Proposal', href: '/proposal' },
    { 
      name: 'About Us', 
      href: '/About',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Overview', href: '/About' },
        { name: 'Mission & Vision', href: '/mission-vision' },
        { name: 'Core Values', href: '/core-values' },
        { name: 'Tech Stack', href: '/tech-stack' },
        { name: 'Leadership Team', href: '/leadership-team' },
      ]
    },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-dark fixed-top transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-3'
      }`} 
        style={{ 
          backgroundColor: scrolled ? '#0f1a4d' : '#001C57',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,102,0,0.3)' : 'none',
        }}
      >
        {/* Curved background effect */}
        <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ pointerEvents: 'none', zIndex: -1 }}>
          <div className="position-absolute" style={{
            top: '-50%',
            right: '-5%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(255,102,0,0.15) 0%, rgba(255,102,0,0) 70%)',
            borderRadius: '50%',
            filter: 'blur(20px)'
          }}></div>
          <div className="position-absolute" style={{
            bottom: '-50%',
            left: '-5%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(255,102,0,0.1) 0%, rgba(255,102,0,0) 70%)',
            borderRadius: '50%',
            filter: 'blur(20px)'
          }}></div>
        </div>

        <div className="container position-relative">
          {/* Logo/Brand with curved background */}
          <div className="d-flex flex-column position-relative">
            <div className="position-absolute" style={{
              top: '-10px',
              left: '-15px',
              width: '60px',
              height: '60px',
              background: 'rgba(255,102,0,0.1)',
              borderRadius: '50%',
              filter: 'blur(15px)',
              zIndex: -1
            }}></div>
            <Link className="navbar-brand d-flex align-items-center" href="/">
              <div className="position-relative">
                <Image
                  src="/images/logo/jlogo.png"
                  alt="JavaNet ICT Logo"
                  width={120}
                  height={40}
                  className="me-0" 
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
              <span className="fw-bold" style={{ marginLeft: '-20px' }}> 
                <span className="text-white">JavaNet</span>
                <span style={{ color: '#FF6600' }}> ICT</span>
              </span>
            </Link>
            <span className="text-white-50 text-end" style={{ fontSize: '0.7rem', lineHeight: '1', marginTop: '-8px' }}>
              ...Engineering Intelligent digital solutions.
            </span>
          </div>

          {/* Mobile Toggle Button - Styled */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              background: isMenuOpen ? '#FF6600' : 'transparent',
              borderRadius: '10px',
              padding: '8px 12px',
              transition: 'all 0.3s ease'
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              {navLinks.map((link, index) => (
                <li key={link.name} className="nav-item mx-0">
                  {link.hasDropdown ? (
                    // Dropdown menu for About Us with curved styling
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle text-light px-3 py-2 rounded-3"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{
                          transition: 'all 0.3s ease',
                          borderRadius: '25px',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#FF6600';
                          e.currentTarget.style.background = 'rgba(255,102,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '';
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        {link.name}
                      </a>
                      <ul 
                        className="dropdown-menu border-0 rounded-4 py-2 mt-2" 
                        style={{ 
                          backgroundColor: '#1A237E',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,102,0,0.2)',
                          minWidth: '220px',
                        }}
                      >
                        {/* Curved top indicator */}
                        <div className="position-absolute top-0 start-50 translate-middle" style={{
                          width: '20px',
                          height: '20px',
                          background: '#1A237E',
                          transform: 'rotate(45deg)',
                          marginTop: '-10px',
                          borderLeft: '1px solid rgba(255,102,0,0.2)',
                          borderTop: '1px solid rgba(255,102,0,0.2)',
                        }}></div>
                        
                        {link.dropdownItems.map((item) => (
                          <li key={item.name}>
                            <Link
                              className="dropdown-item text-white py-2 px-4"
                              href={item.href}
                              onClick={() => setIsMenuOpen(false)}
                              style={{
                                backgroundColor: 'transparent',
                                transition: 'all 0.3s ease',
                                borderRadius: '20px',
                                margin: '2px 8px',
                                width: 'auto',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#FF6600';
                                e.currentTarget.style.color = 'white';
                                e.currentTarget.style.transform = 'translateX(5px)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = 'white';
                                e.currentTarget.style.transform = 'translateX(0)';
                              }}
                            >
                              <i className="bi bi-chevron-right me-2" style={{ fontSize: '0.8rem', opacity: 0.7 }}></i>
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    // Regular nav links with curved hover
                    <Link
                      className="nav-link text-light px-3 py-2 rounded-3"
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      style={{
                        transition: 'all 0.3s ease',
                        borderRadius: '25px',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#FF6600';
                        e.currentTarget.style.background = 'rgba(255,102,0,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '';
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}

              {/* Auth Links - Styled dropdown */}
              <li className="nav-item dropdown ms-2">
                <a
                  className="nav-link dropdown-toggle text-light d-flex align-items-center gap-2 px-3 py-2 rounded-3"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    transition: 'all 0.3s ease',
                    borderRadius: '30px',
                    background: 'rgba(255,102,0,0.1)',
                    border: '1px solid rgba(255,102,0,0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,102,0,0.2)';
                    e.currentTarget.style.borderColor = '#FF6600';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,102,0,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255,102,0,0.2)';
                  }}
                >
                  <i className="bi bi-person-circle fs-5"></i>
                  <span className="d-none d-lg-inline">
                    {user ? user.email?.split('@')[0] : 'Account'}
                  </span>
                </a>
                <ul 
                  className="dropdown-menu dropdown-menu-end border-0 rounded-4 py-2 mt-2" 
                  style={{ 
                    backgroundColor: '#1A237E',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,102,0,0.2)',
                    minWidth: '200px',
                  }}
                >
                  <div className="position-absolute top-0 end-0 translate-middle" style={{
                    width: '20px',
                    height: '20px',
                    background: '#1A237E',
                    transform: 'rotate(45deg)',
                    marginTop: '-10px',
                    marginRight: '20px',
                    borderLeft: '1px solid rgba(255,102,0,0.2)',
                    borderTop: '1px solid rgba(255,102,0,0.2)',
                  }}></div>
                  
                  {user ? (
                    <>
                      <li>
                        <Link 
                          className="dropdown-item text-white py-2 px-4" 
                          href="/profile"
                          style={{
                            backgroundColor: 'transparent',
                            transition: 'all 0.3s ease',
                            borderRadius: '20px',
                            margin: '2px 8px',
                            width: 'auto',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#FF6600';
                            e.currentTarget.style.transform = 'translateX(5px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <i className="bi bi-person me-2"></i>
                          Profile
                        </Link>
                      </li>
                      <li><hr className="dropdown-divider mx-3" style={{ backgroundColor: 'rgba(255,102,0,0.3)' }} /></li>
                      <li>
                        <button
                          className="dropdown-item text-white py-2 px-4"
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
                          style={{
                            backgroundColor: 'transparent',
                            transition: 'all 0.3s ease',
                            borderRadius: '20px',
                            margin: '2px 8px',
                            width: 'auto',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#FF6600';
                            e.currentTarget.style.transform = 'translateX(5px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <i className="bi bi-box-arrow-right me-2"></i>
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link 
                          className="dropdown-item text-white py-2 px-4" 
                          href="/login"
                          style={{
                            backgroundColor: 'transparent',
                            transition: 'all 0.3s ease',
                            borderRadius: '20px',
                            margin: '2px 8px',
                            width: 'auto',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#FF6600';
                            e.currentTarget.style.transform = 'translateX(5px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link 
                          className="dropdown-item text-white py-2 px-4" 
                          href="/register"
                          style={{
                            backgroundColor: 'transparent',
                            transition: 'all 0.3s ease',
                            borderRadius: '20px',
                            margin: '2px 8px',
                            width: 'auto',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#FF6600';
                            e.currentTarget.style.transform = 'translateX(5px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <i className="bi bi-person-plus me-2"></i>
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Custom scroll-based style */}
      <style jsx>{`
        .navbar {
          border-bottom-left-radius: ${scrolled ? '0' : '30px'};
          border-bottom-right-radius: ${scrolled ? '0' : '30px'};
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        .dropdown-menu {
          border-radius: 20px !important;
          overflow: hidden;
          animation: dropdownFade 0.3s ease;
        }
        
        @keyframes dropdownFade {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .nav-link {
          position: relative;
          overflow: hidden;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 50%;
          width: 0;
          height: 2px;
          background: #FF6600;
          transition: all 0.3s ease;
          transform: translateX(-50%);
          border-radius: 2px;
        }
        
        .nav-link:hover::after {
          width: 20px;
        }
        
        .dropdown-item {
          position: relative;
          padding-left: 30px !important;
        }
        
        .dropdown-item i {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          transition: transform 0.3s ease;
        }
        
        .dropdown-item:hover i {
          transform: translateY(-50%) translateX(3px);
        }
      `}</style>
    </>
  );
};

export default Navbar;