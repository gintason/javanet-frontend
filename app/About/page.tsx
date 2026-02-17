"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section with Gradient */}
      <section className="position-relative overflow-hidden bg-gradient-primary py-6 py-md-8">
        {/* Animated Background Elements */}
        <div className="position-absolute top-0 start-0 w-100 h-100">
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary" style={{ opacity: 0.1 }}></div>
          <div className="position-absolute" style={{ top: '20%', right: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(26, 35, 126, 0.2) 0%, rgba(26, 35, 126, 0) 70%)' }}></div>
          <div className="position-absolute" style={{ bottom: '10%', left: '10%', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(0, 200, 83, 0.15) 0%, rgba(0, 200, 83, 0) 70%)' }}></div>
        </div>

        <div className="container position-relative z-2 py-5 py-lg-7">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="mb-4">
                <span className="badge bg-white text-primary fw-semibold px-3 py-2 mb-3">
                  <i className="bi bi-building me-2"></i>
                  Since 2020
                </span>
                <h1 className="display-4 fw-bold text-white mb-4">
                  We Build 
                  <span className="text-warning d-block">Any Software You Imagine</span>
                </h1>
                <p className="lead text-white-80 mb-5">
                  JavaNet ICT Solutions Ltd is a premier full-service software development company based in Abuja, 
                  Nigeria. We specialize in creating <strong>any type of software</strong> for any interested client - 
                  from mobile apps and web applications to WordPress websites and digital marketing solutions.
                </p>
              </div>
              
              <div className="d-flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-light btn-lg px-5 py-3 fw-semibold">
                  <i className="bi bi-calendar-check me-2"></i>
                  Start Your Project
                </Link>
                <Link href="/solutions" className="btn btn-outline-light btn-lg px-5 py-3">
                  <i className="bi bi-eye me-2"></i>
                  View Our Work
                </Link>
              </div>
            </div>
            
            <div className="col-lg-6 mt-5 mt-lg-0">
              <div className="position-relative">
                <div className="card border-0 shadow-5 bg-white bg-opacity-10 backdrop-blur rounded-4 overflow-hidden">
                  <div className="card-body p-5">
                    <div className="row g-4">
                      <div className="col-6">
                        <div className="text-center">
                          <div className="bg-white text-primary rounded-3 p-3 mb-3 d-inline-block">
                            <i className="bi bi-cpu fs-1"></i>
                          </div>
                          <h3 className="text-white mb-2">50+</h3>
                          <p className="text-white-80 mb-0">Projects Delivered</p>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="text-center">
                          <div className="bg-white text-success rounded-3 p-3 mb-3 d-inline-block">
                            <i className="bi bi-phone fs-1"></i>
                          </div>
                          <h3 className="text-white mb-2">30+</h3>
                          <p className="text-white-80 mb-0">Mobile Apps</p>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="text-center">
                          <div className="bg-white text-warning rounded-3 p-3 mb-3 d-inline-block">
                            <i className="bi bi-wordpress fs-1"></i>
                          </div>
                          <h3 className="text-white mb-2">40+</h3>
                          <p className="text-white-80 mb-0">WordPress Sites</p>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="text-center">
                          <div className="bg-white text-info rounded-3 p-3 mb-3 d-inline-block">
                            <i className="bi bi-globe fs-1"></i>
                          </div>
                          <h3 className="text-white mb-2">3</h3>
                          <p className="text-white-80 mb-0">Countries Served</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Service Offerings Section - NEW */}
      <section className="py-6 py-md-8">
        <div className="container">
          <div className="text-center mb-6">
            <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold px-3 py-2 mb-3">
              <i className="bi bi-grid-3x3-gap-fill me-2"></i>
              What We Build
            </span>
            <h2 className="display-5 fw-bold text-dark mb-4">
              Any Software, Any Platform, Any Vision
            </h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
              We don't limit ourselves to one type of development. If you can imagine it, we can build it.
            </p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body p-4">
                  <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-3 mb-4 d-inline-block">
                    <i className="bi bi-phone fs-2"></i>
                  </div>
                  <h4 className="text-dark mb-3">Mobile Applications</h4>
                  <p className="text-muted mb-3">
                    Native and cross-platform mobile apps for iOS and Android:
                  </p>
                  <ul className="list-unstyled">
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2 small"></i>E-commerce Apps</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2 small"></i>Social Media Apps</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2 small"></i>Enterprise Mobile Solutions</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2 small"></i>Food Delivery Apps</li>
                    <li><i className="bi bi-check-circle-fill text-success me-2 small"></i>Ride-hailing Applications</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body p-4">
                  <div className="bg-info bg-opacity-10 text-info rounded-3 p-3 mb-4 d-inline-block">
                    <i className="bi bi-laptop fs-2"></i>
                  </div>
                  <h4 className="text-dark mb-3">Web Applications</h4>
                  <p className="text-muted mb-3">
                    Custom web applications for any business need:
                  </p>
                  <ul className="list-unstyled">
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2 small"></i>Custom Business Software</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2 small"></i>E-learning Platforms</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2 small"></i>CRM & ERP Systems</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2 small"></i>Booking & Reservation Systems</li>
                    <li><i className="bi bi-check-circle-fill text-success me-2 small"></i>Real Estate Portals</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body p-4">
                  <div className="bg-warning bg-opacity-10 text-warning rounded-3 p-3 mb-4 d-inline-block">
                    <i className="bi bi-wordpress fs-2"></i>
                  </div>
                  <h4 className="text-dark mb-3">WordPress Development</h4>
                  <p className="text-muted mb-3">
                    Professional WordPress solutions:
                  </p>
                  <ul className="list-unstyled">
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2 small"></i>Custom Theme Development</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2 small"></i>Plugin Development</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2 small"></i>E-commerce (WooCommerce)</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2 small"></i>Corporate Websites</li>
                    <li><i className="bi bi-check-circle-fill text-success me-2 small"></i>Blog & Magazine Sites</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body p-4">
                  <div className="bg-success bg-opacity-10 text-success rounded-3 p-3 mb-4 d-inline-block">
                    <i className="bi bi-graph-up-arrow fs-2"></i>
                  </div>
                  <h4 className="text-dark mb-3">Digital Marketing</h4>
                  <p className="text-muted mb-3">
                    Comprehensive digital marketing services:
                  </p>
                  <ul className="list-unstyled">
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2 small"></i>SEO (Search Engine Optimization)</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2 small"></i>Social Media Management</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2 small"></i>Google/Facebook Ads</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2 small"></i>Content Marketing</li>
                    <li><i className="bi bi-check-circle-fill text-success me-2 small"></i>Email Marketing Campaigns</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body p-4">
                  <div className="bg-danger bg-opacity-10 text-danger rounded-3 p-3 mb-4 d-inline-block">
                    <i className="bi bi-building fs-2"></i>
                  </div>
                  <h4 className="text-dark mb-3">Enterprise Solutions</h4>
                  <p className="text-muted mb-3">
                    Large-scale business software:
                  </p>
                  <ul className="list-unstyled">
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2 small"></i>Custom Business Software</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2 small"></i>Inventory Management</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2 small"></i>HR Management Systems</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2 small"></i>Financial Software</li>
                    <li><i className="bi bi-check-circle-fill text-success me-2 small"></i>School Management Systems</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body p-4">
                  <div className="bg-purple bg-opacity-10 text-purple rounded-3 p-3 mb-4 d-inline-block">
                    <i className="bi bi-magic fs-2"></i>
                  </div>
                  <h4 className="text-dark mb-3">Custom Development</h4>
                  <p className="text-muted mb-3">
                    Anything else you need:
                  </p>
                  <ul className="list-unstyled">
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2 small"></i>API Development & Integration</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2 small"></i>Database Design</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2 small"></i>Legacy System Migration</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2 small"></i>Software Maintenance</li>
                    <li><i className="bi bi-check-circle-fill text-success me-2 small"></i>Technical Consulting</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section - UPDATED */}
      <section className="py-6 py-md-8 bg-light">
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

      {/* Core Values Section - UPDATED to reflect versatility */}
      <section className="py-6 py-md-8">
        <div className="container">
          <div className="text-center mb-6">
            <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold px-3 py-2 mb-3">
              <i className="bi bi-stars me-2"></i>
              Our Core Values
            </span>
            <h2 className="display-5 fw-bold text-dark mb-4">
              The Principles That Guide Us
            </h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
              These values define our culture and drive our commitment to excellence
            </p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body p-5">
                  <div className="bg-primary text-white rounded-3 p-3 mb-4 d-inline-block">
                    <i className="bi bi-lightbulb fs-2"></i>
                  </div>
                  <h4 className="text-dark mb-3">Innovation</h4>
                  <p className="text-muted mb-0">
                    We continuously explore emerging technologies to create solutions 
                    that anticipate and meet the evolving needs of our clients.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body p-5">
                  <div className="bg-success text-white rounded-3 p-3 mb-4 d-inline-block">
                    <i className="bi bi-shield-check fs-2"></i>
                  </div>
                  <h4 className="text-dark mb-3">Versatility</h4>
                  <p className="text-muted mb-0">
                    We don't limit ourselves. Whatever software you need—mobile, web, WordPress, or marketing—we deliver.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body p-5">
                  <div className="bg-warning text-white rounded-3 p-3 mb-4 d-inline-block">
                    <i className="bi bi-people fs-2"></i>
                  </div>
                  <h4 className="text-dark mb-3">Client Success</h4>
                  <p className="text-muted mb-0">
                    We measure our success by the success of our clients, providing 
                    exceptional support and ensuring their objectives are achieved.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body p-5">
                  <div className="bg-info text-white rounded-3 p-3 mb-4 d-inline-block">
                    <i className="bi bi-gear fs-2"></i>
                  </div>
                  <h4 className="text-dark mb-3">Excellence</h4>
                  <p className="text-muted mb-0">
                    We strive for perfection in every project, delivering quality 
                    solutions that exceed expectations and stand the test of time.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body p-5">
                  <div className="bg-purple text-white rounded-3 p-3 mb-4 d-inline-block">
                    <i className="bi bi-globe fs-2"></i>
                  </div>
                  <h4 className="text-dark mb-3">Impact</h4>
                  <p className="text-muted mb-0">
                    We're committed to creating technology that makes a meaningful 
                    difference in businesses and contributes to Nigeria's digital economy.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body p-5">
                  <div className="bg-danger text-white rounded-3 p-3 mb-4 d-inline-block">
                    <i className="bi bi-graph-up-arrow fs-2"></i>
                  </div>
                  <h4 className="text-dark mb-3">Continuous Growth</h4>
                  <p className="text-muted mb-0">
                    We foster a learning culture, encouraging innovation and 
                    professional development to stay at the forefront of technology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section - UPDATED with WordPress */}
      <section className="py-6 py-md-8 bg-dark text-white">
        <div className="container">
          <div className="text-center mb-6">
            <span className="badge bg-white text-dark fw-semibold px-3 py-2 mb-3">
              <i className="bi bi-cpu me-2"></i>
              Our Technology Stack
            </span>
            <h2 className="display-5 fw-bold text-white mb-4">
              Built with Modern Technology
            </h2>
            <p className="lead text-white-80 mx-auto" style={{ maxWidth: '600px' }}>
              We leverage cutting-edge technologies to build robust, scalable, 
              and future-proof solutions
            </p>
          </div>
          
          <div className="row g-4">
            <div className="col-6 col-md-3">
              <div className="card bg-dark bg-opacity-50 border border-white-10 hover-scale text-center p-4">
                <div className="bg-primary bg-opacity-20 rounded-3 p-3 mb-3">
                  <i className="bi bi-filetype-py fs-1 text-primary"></i>
                </div>
                <h5 className="text-white mb-2">Python/Django</h5>
                <p className="text-white-60 small mb-0">Backend & API Development</p>
              </div>
            </div>
            
            <div className="col-6 col-md-3">
              <div className="card bg-dark bg-opacity-50 border border-white-10 hover-scale text-center p-4">
                <div className="bg-info bg-opacity-20 rounded-3 p-3 mb-3">
                  <i className="bi bi-filetype-jsx fs-1 text-info"></i>
                </div>
                <h5 className="text-white mb-2">React/Next.js</h5>
                <p className="text-white-60 small mb-0">Modern Web Apps</p>
              </div>
            </div>
            
            <div className="col-6 col-md-3">
              <div className="card bg-dark bg-opacity-50 border border-white-10 hover-scale text-center p-4">
                <div className="bg-success bg-opacity-20 rounded-3 p-3 mb-3">
                  <i className="bi bi-phone fs-1 text-success"></i>
                </div>
                <h5 className="text-white mb-2">React Native</h5>
                <p className="text-white-60 small mb-0">Mobile App Development</p>
              </div>
            </div>
            
            <div className="col-6 col-md-3">
              <div className="card bg-dark bg-opacity-50 border border-white-10 hover-scale text-center p-4">
                <div className="bg-warning bg-opacity-20 rounded-3 p-3 mb-3">
                  <i className="bi bi-wordpress fs-1 text-warning"></i>
                </div>
                <h5 className="text-white mb-2">WordPress</h5>
                <p className="text-white-60 small mb-0">CMS & E-commerce</p>
              </div>
            </div>
            
            <div className="col-6 col-md-3">
              <div className="card bg-dark bg-opacity-50 border border-white-10 hover-scale text-center p-4">
                <div className="bg-purple bg-opacity-20 rounded-3 p-3 mb-3">
                  <i className="bi bi-database fs-1 text-purple"></i>
                </div>
                <h5 className="text-white mb-2">PostgreSQL</h5>
                <p className="text-white-60 small mb-0">Database Management</p>
              </div>
            </div>
            
            <div className="col-6 col-md-3">
              <div className="card bg-dark bg-opacity-50 border border-white-10 hover-scale text-center p-4">
                <div className="bg-danger bg-opacity-20 rounded-3 p-3 mb-3">
                  <i className="bi bi-cloud-arrow-up fs-1 text-danger"></i>
                </div>
                <h5 className="text-white mb-2">AWS/Azure</h5>
                <p className="text-white-60 small mb-0">Cloud Infrastructure</p>
              </div>
            </div>
            
            <div className="col-6 col-md-3">
              <div className="card bg-dark bg-opacity-50 border border-white-10 hover-scale text-center p-4">
                <div className="bg-teal bg-opacity-20 rounded-3 p-3 mb-3">
                  <i className="bi bi-megaphone fs-1 text-teal"></i>
                </div>
                <h5 className="text-white mb-2">Digital Marketing</h5>
                <p className="text-white-60 small mb-0">SEO, Ads, Social Media</p>
              </div>
            </div>
            
            <div className="col-6 col-md-3">
              <div className="card bg-dark bg-opacity-50 border border-white-10 hover-scale text-center p-4">
                <div className="bg-pink bg-opacity-20 rounded-3 p-3 mb-3">
                  <i className="bi bi-graph-up-arrow fs-1 text-pink"></i>
                </div>
                <h5 className="text-white mb-2">Analytics</h5>
                <p className="text-white-60 small mb-0">Real-Time Insights</p>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* Leadership Team Section - WITH ANIMATED COLORED BACKGROUNDS */}
<section className="py-6 py-md-8">
  <div className="container">
    <div className="text-center mb-6">
      <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold px-3 py-2 mb-3">
        <i className="bi bi-person-badge me-2"></i>
        Leadership Team
      </span>
      <h2 className="display-5 fw-bold text-dark mb-4">
        Meet Our Experts
      </h2>
      <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
        Our team combines technical expertise with deep understanding of 
        software development across all platforms
      </p>
    </div>
    
    <style jsx>{`
      @keyframes softPulse {
        0%, 100% {
          opacity: 0.2;
          transform: translate(-50%, -50%) scale(1);
        }
        50% {
          opacity: 0.3;
          transform: translate(-50%, -50%) scale(1.05);
        }
      }
    `}</style>
    
    <div className="row g-5">
      <div className="col-md-6 col-lg-4">
        <div className="card border-0 shadow-sm hover-lift">
          <div className="card-body p-4 text-center">
            <div className="position-relative mb-4">
              {/* Animated colored background circle */}
              <div className="position-absolute top-50 start-50 translate-middle" style={{ 
                width: '180px', 
                height: '180px', 
                background: 'radial-gradient(circle at 30% 30%, rgba(65, 88, 208, 0.3), rgba(200, 80, 192, 0.3), rgba(255, 204, 112, 0.3))',
                borderRadius: '50%',
                filter: 'blur(5px)',
                animation: 'softPulse 4s ease-in-out infinite',
                zIndex: 1
              }}></div>
              
              {/* Image container with enhanced styling */}
              <div className="rounded-circle overflow-hidden mx-auto position-relative" style={{ 
                width: '150px', 
                height: '150px',
                border: '3px solid white',
                boxShadow: '0 15px 35px rgba(65, 88, 208, 0.3)',
                zIndex: 2
              }}>
                <Image 
                  src="/images/team/team1.png" 
                  alt="Ginta Peterson - CEO"
                  width={150}
                  height={150}
                  className="object-fit-cover"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>
            <h4 className="text-dark mb-2">Ginta Peterson</h4>
            <p className="text-primary mb-3">Chief Executive Officer</p>
            <p className="text-muted small mb-4">
              Visionary leader with 10+ years in software development and 
              strategic business growth across Africa.
            </p>
          </div>
        </div>
      </div>
      
      {/* Repeat for other team members with different gradient colors */}
      <div className="col-md-6 col-lg-4">
        <div className="card border-0 shadow-sm hover-lift">
          <div className="card-body p-4 text-center">
            <div className="position-relative mb-4">
              {/* Animated colored background circle */}
              <div className="position-absolute top-50 start-50 translate-middle" style={{ 
                width: '180px', 
                height: '180px', 
                background: 'radial-gradient(circle at 30% 30%, rgba(17, 153, 142, 0.3), rgba(56, 239, 125, 0.3))',
                borderRadius: '50%',
                filter: 'blur(5px)',
                animation: 'softPulse 4s ease-in-out infinite',
                animationDelay: '0.5s',
                zIndex: 1
              }}></div>
              
              <div className="rounded-circle overflow-hidden mx-auto position-relative" style={{ 
                width: '150px', 
                height: '150px',
                border: '3px solid white',
                boxShadow: '0 15px 35px rgba(17, 153, 142, 0.3)',
                zIndex: 2
              }}>
                <Image 
                  src="/images/team/team2.png" 
                  alt="Chinedu Chaz - CTO"
                  width={150}
                  height={150}
                  className="object-fit-cover"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>
            <h4 className="text-dark mb-2">Chinedu Chaz</h4>
            <p className="text-success mb-3">Chief Technology Officer</p>
            <p className="text-muted small mb-4">
              Tech innovator specializing in full-stack development, AI, and 
              scalable software architecture with 15+ experience.
            </p>
          
          </div>
        </div>
      </div>
      
      <div className="col-md-6 col-lg-4">
        <div className="card border-0 shadow-sm hover-lift">
          <div className="card-body p-4 text-center">
            <div className="position-relative mb-4">
              {/* Animated colored background circle */}
              <div className="position-absolute top-50 start-50 translate-middle" style={{ 
                width: '180px', 
                height: '180px', 
                background: 'radial-gradient(circle at 30% 30%, rgba(250, 139, 255, 0.3), rgba(43, 210, 255, 0.3), rgba(43, 255, 136, 0.3))',
                borderRadius: '50%',
                filter: 'blur(5px)',
                animation: 'softPulse 4s ease-in-out infinite',
                animationDelay: '1s',
                zIndex: 1
              }}></div>
              
              <div className="rounded-circle overflow-hidden mx-auto position-relative" style={{ 
                width: '150px', 
                height: '150px',
                border: '3px solid white',
                boxShadow: '0 15px 35px rgba(250, 139, 255, 0.3)',
                zIndex: 2
              }}>
                <Image 
                  src="/images/team/team3.png" 
                  alt="Abubakar Ibrahim - Head of Operations"
                  width={150}
                  height={150}
                  className="object-fit-cover"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>
            <h4 className="text-dark mb-2">Abubakar Ibrahim</h4>
            <p className="text-warning mb-3">Head of Operations</p>
            <p className="text-muted small mb-4">
              Expert in project delivery with deep understanding of local market 
              needs and business challenges.
            </p>
          
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* CTA Section - UPDATED */}
      <section className="py-6 py-md-8">
        <div className="container">
          <div className="card border-0 shadow-5 bg-gradient-primary text-white overflow-hidden">
            <div className="card-body p-5 p-md-7">
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <h2 className="display-6 fw-bold text-white mb-3">
                    Ready to Build Your Software?
                  </h2>
                  <p className="lead text-white-80 mb-4">
                    Whatever software you need—mobile app, website, WordPress, or marketing—we're ready to bring your vision to life.
                  </p>
                </div>
                <div className="col-lg-4 text-lg-end">
                  <div className="d-flex flex-column flex-sm-row gap-3">
                    <Link href="/contact" className="btn btn-light btn-lg px-5 py-3 fw-semibold">
                      <i className="bi bi-chat-dots me-2"></i>
                      Discuss Your Project
                    </Link>
                    <Link href="/proposal" className="btn btn-outline-light btn-lg px-5 py-3">
                      <i className="bi bi-file-text me-2"></i>
                      Get Free Quote
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Details - UPDATED */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="d-flex align-items-start">
                <div className="bg-primary text-white rounded-2 p-2 me-3">
                  <i className="bi bi-geo-alt fs-4"></i>
                </div>
                <div>
                  <h5 className="text-dark mb-2">Our Headquarters</h5>
                  <p className="text-muted mb-0">
                    Plot 544, House 26, T.O.S Benson Crescent<br />
                    Utako, Abuja, Nigeria<br />
                    <small>Serving clients across Africa</small>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="d-flex align-items-start">
                <div className="bg-success text-white rounded-2 p-2 me-3">
                  <i className="bi bi-envelope fs-4"></i>
                </div>
                <div>
                  <h5 className="text-dark mb-2">Contact Information</h5>
                  <p className="text-muted mb-0">
                    info@javanetict.com<br />
                    sales@javanetict.com<br />
                    +234 703 067 3089<br />
                    +234 912 868 8164
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="d-flex align-items-start">
                <div className="bg-warning text-white rounded-2 p-2 me-3">
                  <i className="bi bi-clock fs-4"></i>
                </div>
                <div>
                  <h5 className="text-dark mb-2">Business Hours</h5>
                  <p className="text-muted mb-0">
                    Monday - Friday: 8:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 2:00 PM<br />
                    24/7 Support Available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;