"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import FeatureCard from '@/components/FeatureCard';
import { Feature } from '@/types';
import { useApi } from '@/hooks/useApi';
import { API_ENDPOINTS } from '@/utils/constants';

// Create a client component that uses hooks
function SolutionsContent() {
  const { data: cbtFeatures, loading: cbtLoading } = useApi<Feature[]>(
    API_ENDPOINTS.CTB_FEATURES,
    'GET',
    { autoFetch: true }
  );
  
  const { data: liveFeatures, loading: liveLoading } = useApi<Feature[]>(
    API_ENDPOINTS.LIVE_FEATURES,
    'GET',
    { autoFetch: true }
  );

  return (
    <div className="solutions-page">
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold mb-4">
                Comprehensive EdTech Solutions
              </h1>
              <p className="lead mb-4">
                Choose from our modular platform: Computer-Based Testing, Live Interactive Classroom, 
                or both. One-time deployment fee for each module.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <a href="#cbt" className="btn btn-light btn-lg">
                  <i className="bi bi-laptop me-2"></i>
                  CBT System
                </a>
                <a href="#live-class" className="btn btn-outline-light btn-lg">
                  <i className="bi bi-camera-video me-2"></i>
                  Live Classroom
                </a>
              </div>
            </div>
            <div className="col-lg-6 text-center mt-5 mt-lg-0">
              <div className="bg-white rounded-3 p-4 shadow-lg d-inline-block">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                     style={{ width: '80px', height: '80px' }}>
                  <i className="bi bi-check-all fs-2"></i>
                </div>
                <h5 className="text-dark mb-2">Modular Approach</h5>
                <p className="text-muted mb-0">Pay only for what you need</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CBT System Section */}
      <section id="cbt" className="section">
        <div className="container">
          <div className="section-title">
            <h2>
              <i className="bi bi-laptop text-primary me-2"></i>
              Computer-Based Testing System
            </h2>
            <p className="text-muted">
              Comprehensive exam management with automated grading and analytics
            </p>
          </div>
          
          <div className="row align-items-center mb-5">
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h4 className="text-primary mb-3">Complete Exam Lifecycle</h4>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-3">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <strong>Question Bank:</strong> Create, categorize, and reuse questions
                    </li>
                    <li className="mb-3">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <strong>Automated Grading:</strong> Instant results for objective questions
                    </li>
                    <li className="mb-3">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <strong>Anti-Cheat Monitoring:</strong> Real-time suspicious activity detection
                    </li>
                    <li className="mb-3">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <strong>Detailed Analytics:</strong> Performance reports and insights
                    </li>
                    <li>
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <strong>Certificate Generation:</strong> Automatic certificates for passed exams
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="card border-primary border-2">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">CBT System Features</h5>
                </div>
                <div className="card-body">
                  {cbtLoading ? (
                    <div className="text-center py-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : cbtFeatures && cbtFeatures.length > 0 ? (
                    <div className="row">
                      {cbtFeatures.slice(0, 4).map((feature) => (
                        <div key={feature.id} className="col-md-6 mb-3">
                          <div className="d-flex align-items-start">
                            <div className="bg-primary text-white rounded-circle p-2 me-3">
                              <i className={`bi ${feature.icon}`}></i>
                            </div>
                            <div>
                              <h6 className="mb-1">{feature.name}</h6>
                              <small className="text-muted">{feature.description}</small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted text-center py-3">No features available</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CBT Features Grid */}
          <div className="row">
            {cbtLoading ? (
              <div className="col-12 text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : cbtFeatures && cbtFeatures.length > 0 ? (
              cbtFeatures.map((feature) => (
                <div key={feature.id} className="col-md-4 mb-4">
                  <FeatureCard feature={feature} />
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <div className="alert alert-info">
                  <p className="mb-0">CBT features will appear here once available</p>
                </div>
              </div>
            )}
          </div>
          
          {/* CBT CTA */}
          <div className="text-center mt-5">
            <div className="card bg-primary text-white border-0 shadow-lg">
              <div className="card-body p-5">
                <h3 className="mb-3">Ready for Digital Exams?</h3>
                <p className="mb-4">
                  Transform your assessment process with our CBT system. One-time deployment fee, no monthly subscriptions.
                </p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <Link href="/proposal" className="btn btn-light btn-lg">
                    Get Proposal for CBT
                  </Link>
                  <Link href="/demo" className="btn btn-outline-light btn-lg">
                    Try CBT Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Classroom Section */}
      <section id="live-class" className="section bg-light">
        <div className="container">
          <div className="section-title">
            <h2>
              <i className="bi bi-camera-video text-success me-2"></i>
              Live Interactive Classroom
            </h2>
            <p className="text-muted">
              Virtual classroom platform with real-time collaboration tools
            </p>
          </div>
          
          <div className="row align-items-center mb-5">
            <div className="col-lg-6">
              <div className="card border-success border-2">
                <div className="card-header bg-success text-white">
                  <h5 className="mb-0">Live Classroom Features</h5>
                </div>
                <div className="card-body">
                  {liveLoading ? (
                    <div className="text-center py-4">
                      <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : liveFeatures && liveFeatures.length > 0 ? (
                    <div className="row">
                      {liveFeatures.slice(0, 4).map((feature) => (
                        <div key={feature.id} className="col-md-6 mb-3">
                          <div className="d-flex align-items-start">
                            <div className="bg-success text-white rounded-circle p-2 me-3">
                              <i className={`bi ${feature.icon}`}></i>
                            </div>
                            <div>
                              <h6 className="mb-1">{feature.name}</h6>
                              <small className="text-muted">{feature.description}</small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted text-center py-3">No features available</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h4 className="text-success mb-3">Virtual Classroom Experience</h4>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-3">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <strong>Virtual Whiteboard:</strong> Interactive drawing and annotation tools
                    </li>
                    <li className="mb-3">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <strong>Screen Sharing:</strong> Share presentations, documents, and applications
                    </li>
                    <li className="mb-3">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <strong>Breakout Rooms:</strong> Split into smaller groups for discussions
                    </li>
                    <li className="mb-3">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <strong>Session Recording:</strong> Automatic recording for later review
                    </li>
                    <li>
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <strong>Attendance Tracking:</strong> Automated attendance and participation records
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Live Features Grid */}
          <div className="row">
            {liveLoading ? (
              <div className="col-12 text-center py-5">
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : liveFeatures && liveFeatures.length > 0 ? (
              liveFeatures.map((feature) => (
                <div key={feature.id} className="col-md-4 mb-4">
                  <FeatureCard feature={feature} />
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <div className="alert alert-info">
                  <p className="mb-0">Live classroom features will appear here once available</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Live Classroom CTA */}
          <div className="text-center mt-5">
            <div className="card bg-success text-white border-0 shadow-lg">
              <div className="card-body p-5">
                <h3 className="mb-3">Start Virtual Classes Today</h3>
                <p className="mb-4">
                  Bring your classrooms online with full interactive capabilities. One-time deployment fee includes all features.
                </p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <Link href="/proposal" className="btn btn-light btn-lg">
                    Get Proposal for Live Classes
                  </Link>
                  <Link href="/demo" className="btn btn-outline-light btn-lg">
                    Try Live Class Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}

// Main page component with Suspense
const SolutionsPage = () => {
  return (
    <Suspense fallback={
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading Solutions...</span>
          </div>
          <p className="mt-3 text-muted">Loading comprehensive solutions...</p>
        </div>
      </div>
    }>
      <SolutionsContent />
    </Suspense>
  );
};

export default SolutionsPage;