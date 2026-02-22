"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
export const dynamic = 'force-dynamic';

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