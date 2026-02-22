// components/Navbar.js
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthContext } from '@/contexts/AuthContext';
import { useCurrency } from '@/hooks/useCurrency';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthContext();
  const { currencyInfo } = useCurrency();

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
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top shadow-lg" style={{ backgroundColor: '#1A237E' }}>
      <div className="container">
        {/* Logo/Brand */}
        <div className="d-flex flex-column">
          <Link className="navbar-brand d-flex align-items-center" href="/">
            <Image
              src="/images/logo/jlogo.png"
              alt="JavaNet ICT Logo"
              width={120}
              height={40}
              className="me-0" 
              style={{ objectFit: 'contain' }}
              priority
            />
            <span className="fw-bold" style={{ marginLeft: '-20px' }}> 
              <span className="text-white">JavaNet</span>
              <span style={{ color: '#FF6600' }}> ICT</span>
            </span>
          </Link>
          <span className="text-white-50 text-end" style={{ fontSize: '0.7rem', lineHeight: '1', marginTop: '-8px' }}>
            ...Engineering Intelligent digital solutions.
          </span>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {navLinks.map((link) => (
              <li key={link.name} className="nav-item">
                {link.hasDropdown ? (
                  // Dropdown menu for About Us
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle text-light"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{
                        transition: 'color 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#FF6600'}
                      onMouseLeave={(e) => e.currentTarget.style.color = ''}
                    >
                      {link.name}
                    </a>
                    <ul 
                      className="dropdown-menu" 
                      style={{ 
                        backgroundColor: '#1A237E',
                        border: 'none',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                      }}
                    >
                      {link.dropdownItems.map((item) => (
                        <li key={item.name}>
                          <Link
                            className="dropdown-item text-white"
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                              backgroundColor: 'transparent',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#FF6600';
                              e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = 'white';
                            }}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  // Regular nav links
                  <Link
                    className="nav-link text-light"
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#FF6600'}
                    onMouseLeave={(e) => e.currentTarget.style.color = ''}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}

            {/* Auth Links - Using Bootstrap dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-light"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#FF6600'}
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
              >
                <i className="bi bi-person-circle me-1"></i>
                {user ? user.email : 'Account'}
              </a>
              <ul 
                className="dropdown-menu dropdown-menu-end" 
                style={{ 
                  backgroundColor: '#1A237E',
                  border: 'none',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                }}
              >
                {user ? (
                  <>
                    <li>
                      <Link 
                        className="dropdown-item text-white" 
                        href="/profile"
                        style={{
                          backgroundColor: 'transparent',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#FF6600';
                          e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = 'white';
                        }}
                      >
                        <i className="bi bi-person me-2"></i>
                        Profile
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} /></li>
                    <li>
                      <button
                        className="dropdown-item text-white"
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        style={{
                          backgroundColor: 'transparent',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#FF6600';
                          e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = 'white';
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
                        className="dropdown-item text-white" 
                        href="/login"
                        style={{
                          backgroundColor: 'transparent',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#FF6600';
                          e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = 'white';
                        }}
                      >
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link 
                        className="dropdown-item text-white" 
                        href="/register"
                        style={{
                          backgroundColor: 'transparent',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#FF6600';
                          e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = 'white';
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

      <style jsx>{`
        .nav-link:hover {
          color: #FF6600 !important;
        }
        .dropdown-item:hover {
          background-color: #FF6600 !important;
          color: white !important;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;