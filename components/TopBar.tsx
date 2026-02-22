'use client';

import React from 'react';

const TopBar: React.FC = () => {
  const contactInfo = {
    address: 'Plot 544, T.O.S Benson Crescent, Utako, Abuja Nigeria',
    phone: '+234 912 868 8164',
    whatsapp: '+234 703 067 3089',
    email: 'sales@javanetict.com'
  };

  return (
    <div className="topbar bg-warning text-dark py-3">
      <div className="container">
        <div className="row align-items-center">
          {/* Contact Info */}
          <div className="col-lg-10">
            <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-4 gap-lg-5">
              {/* Address */}
              <div className="d-flex align-items-center">
                <div className="bg-dark bg-opacity-10 p-2 rounded-circle me-3">
                  <i className="bi bi-geo-alt-fill text-dark"></i>
                </div>
                <div>
                  <small className="text-uppercase fw-bold opacity-75 d-block">Office</small>
                  <span className="fw-medium">{contactInfo.address}</span>
                </div>
              </div>

              {/* Phone */}
              <div className="d-flex align-items-center">
                <div className="bg-dark bg-opacity-10 p-2 rounded-circle me-3">
                  <i className="bi bi-telephone-fill text-dark"></i>
                </div>
                <div>
                  <small className="text-uppercase fw-bold opacity-75 d-block">Phone</small>
                  <a 
                    href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
                    className="text-dark fw-medium text-decoration-none hover-dark"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="d-flex align-items-center">
                <div className="bg-dark bg-opacity-10 p-2 rounded-circle me-3">
                  <i className="bi bi-whatsapp text-dark"></i>
                </div>
                <div>
                  <small className="text-uppercase fw-bold opacity-75 d-block">WhatsApp</small>
                  <a 
                    href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dark fw-medium text-decoration-none hover-dark"
                  >
                    {contactInfo.whatsapp}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="d-flex align-items-center">
                <div className="bg-dark bg-opacity-10 p-2 rounded-circle me-3">
                  <i className="bi bi-envelope-fill text-dark"></i>
                </div>
                <div>
                  <small className="text-uppercase fw-bold opacity-75 d-block">Email</small>
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="text-dark fw-medium text-decoration-none hover-dark"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="col-lg-2 d-none d-lg-block text-end">
            <a
              href="/contact"
              className="btn btn-dark btn-sm px-4 py-2 fw-bold text-uppercase"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .topbar {
          background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%) !important;
          border-bottom: 3px solid #ff9800;
        }
        
        .hover-dark:hover {
          color: #212529 !important;
          text-decoration: underline !important;
        }
        
        @media (max-width: 991px) {
          .topbar {
            padding: 10px 0;
          }
        }
      `}</style>
    </div>
  );
};

export default TopBar;