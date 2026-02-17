// components/Navbar.js (simplified version)
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
    { name: 'About Us', href: '/About' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Customization', href: '/customization' },
    { name: 'Demo', href: '/demo' },
    { name: 'Proposal', href: '/proposal' },
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
                <Link
                  className="nav-link text-light"
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
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
              >
                <i className="bi bi-person-circle me-1"></i>
                {user ? user.email : 'Account'}
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                {user ? (
                  <>
                    <li>
                      <Link className="dropdown-item" href="/profile">
                        <i className="bi bi-person me-2"></i>
                        Profile
                      </Link>
                    </li>

                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
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
                      <Link className="dropdown-item" href="/login">
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/register">
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
  );
};

export default Navbar;