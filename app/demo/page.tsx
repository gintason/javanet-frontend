// app/demo/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import DemoSimulator from '@/components/DemoSimulator';
import Link from 'next/link';

const DemoPage = () => {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  // Check authentication on component mount
  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login with return URL
      router.push(`/login?redirect=${encodeURIComponent('/demo')}`);
    }
  }, [user, loading, router]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading demo...</p>
        </div>
      </div>
    );
  }

  // Don't render content if not authenticated
  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="demo-page">
      {/* Hero Section - Update the text since registration IS required */}
      <section className="bg-gradient-primary text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold mb-4 text-warning">
                Experience Our Platform Firsthand
              </h1>
              <p className="lead mb-4">
                Try our interactive demo simulator to see how our CBT system and Live Classroom work. 
                <span className="text-warning fw-bold"> Registration required to access demo.</span>
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a href="#simulator" className="btn btn-light btn-lg">
                  <i className="bi bi-play-circle me-2"></i>
                  Start Interactive Demo
                </a>
                <a 
                  href="https://www.ischool.ng/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline-light btn-lg"
                >
                  <i className="bi bi-box-arrow-up-right me-2"></i>
                  View Live Demo
                </a>
              </div>
            </div>
            <div className="col-lg-6 text-center mt-5 mt-lg-0">
              <div className="position-relative d-inline-block">
                <div className="bg-white rounded-3 p-4 shadow-lg">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary text-white rounded-circle p-2 me-3">
                      <i className="bi bi-laptop"></i>
                    </div>
                    <div className="bg-success text-white rounded-circle p-2 me-3">
                      <i className="bi bi-camera-video"></i>
                    </div>
                    <div className="bg-warning text-white rounded-circle p-2">
                      <i className="bi bi-graph-up"></i>
                    </div>
                  </div>
                  <h5 className="text-dark mb-2">Welcome, {user.first_name || user.email}!</h5>
                  <p className="text-muted mb-0">Access granted to both CBT and Live Classroom demos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Simulator Section */}
      <section id="simulator" className="section">
        <div className="container">
          <div className="section-title">
            <h2>Interactive Platform Simulator</h2>
            <p className="text-muted">
              Walk through key features step by step. Accessible to registered users only.
            </p>
          </div>
          
          <DemoSimulator />
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-title">
            <h2>
              <i className="bi bi-box-arrow-up-right text-primary me-2"></i>
              Live Platform Demo
            </h2>
            <p className="text-muted">
              Explore our actual deployed platform with sample data
            </p>
          </div>
          
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card border-0 shadow-lg">
                <div className="card-header bg-dark text-white">
                  <h5 className="mb-0">ischool.ng - Live Demo</h5>
                </div>
                <div className="card-body p-0">
                  {/* Platform Preview */}
                  <div className="p-4">
                    <div className="mb-4">
                      <h5 className="text-primary">Demo Credentials</h5>
                      <div className="bg-light rounded p-3">
                        <div className="row">
                          <div className="col-md-6 mb-2">
                            <strong>Teacher Account:</strong>
                            <div>Email: teacher@demo.ischool.ng</div>
                            <div>Password: demo123</div>
                          </div>
                          <div className="col-md-6 mb-2">
                            <strong>Student Account:</strong>
                            <div>Email: student@demo.ischool.ng</div>
                            <div>Password: demo123</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h5 className="text-primary">Available Features</h5>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <div className="d-flex align-items-center">
                            <div className="bg-primary text-white rounded-circle p-2 me-3">
                              <i className="bi bi-laptop"></i>
                            </div>
                            <div>
                              <h6 className="mb-1">CBT Exams</h6>
                              <small className="text-muted">Create and take sample exams</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="d-flex align-items-center">
                            <div className="bg-success text-white rounded-circle p-2 me-3">
                              <i className="bi bi-camera-video"></i>
                            </div>
                            <div>
                              <h6 className="mb-1">Live Classes</h6>
                              <small className="text-muted">Join virtual classrooms</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-light text-center">
                  <a 
                    href="https://www.ischool.ng/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg w-100"
                  >
                    <i className="bi bi-box-arrow-up-right me-2"></i>
                    Visit Live Demo Site
                  </a>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="ps-lg-5">
                <h3 className="text-primary mb-4">What You Can Try</h3>
                
                <div className="mb-4">
                  <div className="d-flex align-items-start mb-3">
                    <div className="bg-primary text-white rounded-circle p-2 me-3">
                      <i className="bi bi-1-circle"></i>
                    </div>
                    <div>
                      <h5>Create & Take Exams</h5>
                      <p className="text-muted">
                        Experience the complete exam lifecycle: create questions, schedule exams, 
                        take tests, and view automated results.
                      </p>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-start mb-3">
                    <div className="bg-success text-white rounded-circle p-2 me-3">
                      <i className="bi bi-2-circle"></i>
                    </div>
                    <div>
                      <h5>Join Live Classes</h5>
                      <p className="text-muted">
                        Participate in virtual classrooms with whiteboard, screen sharing, 
                        and interactive tools.
                      </p>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-start">
                    <div className="bg-warning text-white rounded-circle p-2 me-3">
                      <i className="bi bi-3-circle"></i>
                    </div>
                    <div>
                      <h5>Explore Analytics</h5>
                      <p className="text-muted">
                        View detailed performance reports, attendance records, 
                        and learning analytics.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="alert alert-info">
                  <i className="bi bi-info-circle me-2"></i>
                  <strong>Note:</strong> The live demo uses sample data. Your actual platform will be 
                  fully customized with your branding and data.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

   
      {/* Next Steps Section */}
      <section className="section bg-primary text-white">
        <div className="container">
          <div className="text-center">
            <h2 className="mb-4">Ready to Move Forward?</h2>
            <p className="lead mb-5">
              After trying our demo, take the next step with a custom proposal tailored to your institution.
            </p>
            
            <div className="row justify-content-center">
              <div className="col-md-4 mb-3">
                <div className="card bg-white text-dark h-100">
                  <div className="card-body text-center p-4">
                    <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                         style={{ width: '60px', height: '60px' }}>
                      <i className="bi bi-chat-dots fs-4"></i>
                    </div>
                    <h5>Consultation</h5>
                    <p className="small text-muted mb-3">
                      30-minute call with our experts
                    </p>
                    <Link href="/contact" className="btn btn-primary btn-sm">
                      Schedule Now
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="col-md-4 mb-3">
                <div className="card bg-white text-dark h-100">
                  <div className="card-body text-center p-4">
                    <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                         style={{ width: '60px', height: '60px' }}>
                      <i className="bi bi-file-text fs-4"></i>
                    </div>
                    <h5>Custom Proposal</h5>
                    <p className="small text-muted mb-3">
                      Detailed quote with one-time fee
                    </p>
                    <Link href="/proposal" className="btn btn-success btn-sm">
                      Generate Now
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="col-md-4 mb-3">
                <div className="card bg-white text-dark h-100">
                  <div className="card-body text-center p-4">
                    <div className="bg-warning text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                         style={{ width: '60px', height: '60px' }}>
                      <i className="bi bi-calendar-check fs-4"></i>
                    </div>
                    <h5>Live Demo Call</h5>
                    <p className="small text-muted mb-3">
                      Personalized platform tour
                    </p>
                    <button className="btn btn-warning btn-sm">
                      Book Session
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DemoPage;