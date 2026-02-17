import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="row">

          {/* Company Info */}
          <div className="col-md-4 mb-4">
            <div className="d-flex align-items-center mb-3">
              {/* Logo */}
              <div className="me-3">
                <Image 
                  src="/images/logo/jlogo.png"// Adjust this path to your actual logo location
                  alt="JavaNet ICT Solutions Ltd"
                  width={60}
                  height={60}
                  className="img-fluid"
                />
              </div>
                  <span className="fw-bold" style={{ marginLeft: '-20px' }}> 
                  <span className="text-white font-16">JavaNet</span>
                  <span style={{ color: '#FF6600' }}> ICT</span>
                </span>
            </div>

            <p className="text-light">
              Providing cutting-edge educational technology solutions with
              one-time deployment fees. No monthly subscriptions.
            </p>
            <div className="mt-3">
              <a href="mailto:info@javanetict.com" className="text-white me-3">
                <i className="bi bi-envelope me-1"></i>
                info@javanetict.com
              </a>
              <br />
              <a href="tel:+2347030673089" className="text-white">
                <i className="bi bi-whatsapp me-1"></i>
                +234 703 067 3089
              </a>
               <br />
              <a href="tel:+2347030673089" className="text-white">
                <i className="bi bi-telephone me-1"></i>
                +234 912 868 8164 
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-4">
           <h5 className="fw-bold mb-3" style={{ color: '#ff6600' }}>Solutions</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/solutions#cbt" className="text-light text-decoration-none">
                  CBT Testing System
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/solutions#live-class" className="text-light text-decoration-none">
                  Live Classroom
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/customization" className="text-light text-decoration-none">
                  Customization
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-light text-decoration-none">
                  Platform Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3" style={{ color: '#ff6600' }}>Resources</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/proposal" className="text-light text-decoration-none">
                  Generate Proposal
                </Link>
              </li>
              <li className="mb-2">
                <a 
                  href="https://www.ischool.ng/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-light text-decoration-none"
                >
                  <i className="bi bi-box-arrow-up-right me-1"></i>
                  Live Demo
                </a>
              </li>
              <li className="mb-2">
                <Link href="/contact" className="text-light text-decoration-none">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/solutions#pricing" className="text-light text-decoration-none">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3" style={{ color: '#ff6600' }}>Connect With Us</h5>
            <div className="mb-3">
              
              <a href="https://facebook.com/javanetict" className="text-white me-3 fs-5">
                <i className="bi bi-facebook"></i>
              </a>

              <a href="https://www.linkedin.com/in/peterson-ginta-ba113bbb" className="text-white me-3 fs-5">
                <i className="bi bi-linkedin"></i>
              </a>

              <a href="https://instagram.com/javanet_ict" className="text-white me-3 fs-5">
                <i className="bi bi-instagram"></i>
              </a>

               <a href="https://wa.me/2347030673089?text=Hello%20JavaNet%20ICT%20Solutions%2C%20I%20need%20technical%20support." className="text-success fs-5">
                        <i className="bi bi-whatsapp"></i>
                    </a>

            </div>
            <div className="mt-4">
              <p className="text-light small">
                <i className="bi bi-shield-check me-1"></i>
                One-time deployment fee • No monthly subscriptions
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="row mt-4 pt-4 border-top border-secondary">
          <div className="col-md-6">
            <p className="text-light mb-0">
              &copy; {currentYear} JavaNet ICT Solutions Ltd. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="text-light mb-0">
              <Link href="/privacy" className="text-light text-decoration-none me-3">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-light text-decoration-none">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;