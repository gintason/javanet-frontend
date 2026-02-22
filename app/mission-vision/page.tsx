"use client";

import React from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const MissionVisionPage = () => {
  return (
    <div className="mission-vision-page">
      {/* Hero Section */}
      <section className="position-relative overflow-hidden bg-gradient-primary py-6 py-md-8">
        <div className="position-absolute top-0 start-0 w-100 h-100">
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary" style={{ opacity: 0.1 }}></div>
        </div>
        
        <div className="container position-relative z-2 py-5">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <Link href="/about" className="text-white-80 text-decoration-none mb-4 d-inline-block">
                <i className="bi bi-arrow-left me-2"></i>
                Back to About Us
              </Link>
              <h1 className="display-4 fw-bold text-white mb-4">
                Our Mission & Vision
              </h1>
              <p className="lead text-white-80">
                The guiding principles that drive everything we do at JavaNet ICT Solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-6 py-md-8">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm hover-lift h-100">
                <div className="card-body p-5">
                  <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-3 mb-4 d-inline-block">
                    <i className="bi bi-bullseye fs-2"></i>
                  </div>
                  <h3 className="text-primary mb-4">Our Mission</h3>
                  <p className="fs-5 text-dark mb-4">
                    To empower businesses, educational institutions, and individuals across Africa 
                    and beyond with custom software solutions that solve real problems, drive growth, 
                    and transform operations.
                  </p>
                  <div className="mt-4">
                    <h6 className="text-primary mb-3">We achieve this by:</h6>
                    <ul className="list-unstyled">
                      <li className="mb-3">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        Building any type of software clients need
                      </li>
                      <li className="mb-3">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        Providing flexible pricing models
                      </li>
                      <li className="mb-3">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        Offering end-to-end digital marketing support
                      </li>
                      <li>
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        Delivering 100% custom, scalable solutions
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm hover-lift h-100">
                <div className="card-body p-5">
                  <div className="bg-success bg-opacity-10 text-success rounded-3 p-3 mb-4 d-inline-block">
                    <i className="bi bi-eye fs-2"></i>
                  </div>
                  <h3 className="text-success mb-4">Our Vision</h3>
                  <p className="fs-5 text-dark mb-4">
                    To become Nigeria's most versatile and trusted software development company, 
                    recognized for our ability to deliver excellence across every type of software 
                    project—from simple websites to complex enterprise applications.
                  </p>
                  <div className="mt-4">
                    <h6 className="text-success mb-3">2026 Strategic Goals:</h6>
                    <ul className="list-unstyled">
                      <li className="mb-3">
                        <i className="bi bi-rocket-takeoff-fill text-primary me-2"></i>
                        Serve 500+ clients across all sectors
                      </li>
                      <li className="mb-3">
                        <i className="bi bi-rocket-takeoff-fill text-primary me-2"></i>
                        Launch our own product incubator
                      </li>
                      <li className="mb-3">
                        <i className="bi bi-rocket-takeoff-fill text-primary me-2"></i>
                        Expand to 10+ African countries
                      </li>
                      <li>
                        <i className="bi bi-rocket-takeoff-fill text-primary me-2"></i>
                        Build Africa's largest developer community
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-6 py-md-8 bg-light">
        <div className="container">
          <div className="card border-0 shadow-5 bg-gradient-primary text-white overflow-hidden">
            <div className="card-body p-5 p-md-7 text-center">
              <h2 className="display-6 fw-bold text-white mb-3">
                Share Your Vision With Us
              </h2>
              <p className="lead text-white-80 mb-4 mx-auto" style={{ maxWidth: '600px' }}>
                Let's work together to bring your software ideas to life
              </p>
              <Link href="/contact" className="btn btn-light btn-lg px-5 py-3 fw-semibold">
                <i className="bi bi-chat-dots me-2"></i>
                Start a Conversation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MissionVisionPage;