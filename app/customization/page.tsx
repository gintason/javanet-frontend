'use client';

import React, { useState } from 'react';
import PlatformPreview from '@/components/PlatformPreview';

const CustomizationPage = () => {
  const [activeTab, setActiveTab] = useState<'branding' | 'features' | 'integration'>('branding');

  return (
    <div className="customization-page">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold mb-4">
                100% White-Label Platform
              </h1>
              <p className="lead mb-4">
                Your logo, your colors, your domain. Our platform will look and feel like 
                your own in-house developed system.
              </p>
              <div className="d-flex align-items-center">
                <div className="bg-white text-primary rounded-circle p-3 me-3">
                  <i className="bi bi-check-all fs-2"></i>
                </div>
                <div>
                  <h5 className="mb-1">One-time deployment fee</h5>
                  <p className="mb-0">No monthly subscriptions • Complete ownership</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 text-center">
            <div className="position-relative d-inline-block">
              {/* Platform Preview Image */}
              <img 
                src="/images/hero/slide1.jpg" 
                alt="JavaNet ICT Solutions Platform Preview - White-label Dashboard"
                className="img-fluid rounded-4 shadow-lg"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              
            </div>
          </div>
            


          </div>
        </div>
      </section>

      {/* Customization Tabs */}
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="card border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
                <div className="card-body">
                  <h5 className="text-primary mb-4">Customization Options</h5>
                  <nav className="nav flex-column">
                    <button
                      className={`nav-link text-start py-3 ${activeTab === 'branding' ? 'active bg-primary text-white' : ''}`}
                      onClick={() => setActiveTab('branding')}
                    >
                      <i className="bi bi-palette me-2"></i>
                      Branding & Design
                    </button>
                    <button
                      className={`nav-link text-start py-3 ${activeTab === 'features' ? 'active bg-primary text-white' : ''}`}
                      onClick={() => setActiveTab('features')}
                    >
                      <i className="bi bi-sliders me-2"></i>
                      Features & Modules
                    </button>
                    <button
                      className={`nav-link text-start py-3 ${activeTab === 'integration' ? 'active bg-primary text-white' : ''}`}
                      onClick={() => setActiveTab('integration')}
                    >
                      <i className="bi bi-plug me-2"></i>
                      Integration & API
                    </button>
                  </nav>
                </div>
              </div>
            </div>

            <div className="col-lg-9">
              {/* Branding Tab */}
              {activeTab === 'branding' && (
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">
                      <i className="bi bi-palette me-2"></i>
                      Branding & Design Customization
                    </h4>
                  </div>
                  <div className="card-body">
                    <div className="row mb-5">
                      <div className="col-md-6">
                        <h5 className="text-primary mb-4">Visual Identity</h5>
                        <div className="mb-4">
                          <h6>Logo Integration</h6>
                          <p className="text-muted">
                            We integrate your logo across the entire platform - login screen, dashboard, emails, and mobile apps.
                          </p>
                          <div className="border rounded p-4 bg-light text-center">
                            <div className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                 style={{ width: '100px', height: '100px' }}>
                              <i className="bi bi-building fs-1 text-primary"></i>
                            </div>
                            <p className="mb-0">Your Logo Here</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <h5 className="text-primary mb-4">Color Scheme</h5>
                        <p className="text-muted mb-4">
                          Choose your brand colors or let us design a professional color palette that matches your institution's identity.
                        </p>
                        <div className="row g-2">
                          <div className="col-4">
                            <div className="border rounded p-3 text-center">
                              <div className="bg-primary rounded-circle mx-auto mb-2"
                                   style={{ width: '40px', height: '40px' }}></div>
                              <small>Primary Color</small>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="border rounded p-3 text-center">
                              <div className="bg-success rounded-circle mx-auto mb-2"
                                   style={{ width: '40px', height: '40px' }}></div>
                              <small>Secondary Color</small>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="border rounded p-3 text-center">
                              <div className="bg-warning rounded-circle mx-auto mb-2"
                                   style={{ width: '40px', height: '40px' }}></div>
                              <small>Accent Color</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Typography */}
                    <div className="mb-5">
                      <h5 className="text-primary mb-4">Typography</h5>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="border rounded p-4 mb-3">
                            <h3 className="mb-3">Heading Font</h3>
                            <p className="mb-0 text-muted">Choose from Google Fonts or custom font</p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="border rounded p-4 mb-3">
                            <p className="fs-5 mb-3">Body Font</p>
                            <p className="mb-0 text-muted">Clean, readable font for content</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Live Preview */}
                    <div>
                      <h5 className="text-primary mb-4">Live Customization Preview</h5>
                      <PlatformPreview />
                    </div>
                  </div>
                </div>
              )}

              {/* Features Tab */}
              {activeTab === 'features' && (
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">
                      <i className="bi bi-sliders me-2"></i>
                      Features & Modules Customization
                    </h4>
                  </div>
                  <div className="card-body">
                    <div className="row mb-5">
                      <div className="col-md-6">
                        <h5 className="text-primary mb-4">Module Selection</h5>
                        <div className="form-check mb-3">
                          <input className="form-check-input" type="checkbox" id="cbtModule" defaultChecked />
                          <label className="form-check-label fw-bold" htmlFor="cbtModule">
                            <i className="bi bi-laptop text-primary me-2"></i>
                            Computer-Based Testing System
                          </label>
                          <p className="text-muted small mb-0 ms-4">
                            Exams, grading, analytics, certificates
                          </p>
                        </div>
                        <div className="form-check mb-3">
                          <input className="form-check-input" type="checkbox" id="liveModule" />
                          <label className="form-check-label fw-bold" htmlFor="liveModule">
                            <i className="bi bi-camera-video text-success me-2"></i>
                            Live Interactive Classroom
                          </label>
                          <p className="text-muted small mb-0 ms-4">
                            Virtual classes, whiteboard, recording
                          </p>
                        </div>
                        <div className="form-check mb-3">
                          <input className="form-check-input" type="checkbox" id="analyticsModule" />
                          <label className="form-check-label fw-bold" htmlFor="analyticsModule">
                            <i className="bi bi-graph-up text-warning me-2"></i>
                            Advanced Analytics Dashboard
                          </label>
                          <p className="text-muted small mb-0 ms-4">
                            Detailed reports and insights
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <h5 className="text-primary mb-4">Optional Add-ons</h5>
                        <div className="mb-3">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="mobileApp" />
                            <label className="form-check-label" htmlFor="mobileApp">
                              Mobile App (iOS & Android)
                            </label>
                            <small className="text-muted d-block ms-4">Native mobile applications</small>
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="biometric" />
                            <label className="form-check-label" htmlFor="biometric">
                              Biometric Authentication
                            </label>
                            <small className="text-muted d-block ms-4">Fingerprint and face recognition</small>
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="customReports" />
                            <label className="form-check-label" htmlFor="customReports">
                              Custom Report Templates
                            </label>
                            <small className="text-muted d-block ms-4">Branded report formats</small>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Feature Configuration */}
                    <div className="mb-5">
                      <h5 className="text-primary mb-4">CBT System Configuration</h5>
                      <div className="row">
                        <div className="col-md-4 mb-3">
                          <div className="card border-0 bg-light h-100">
                            <div className="card-body">
                              <h6>Question Types</h6>
                              <ul className="small text-muted mb-0">
                                <li>Multiple Choice</li>
                                <li>True/False</li>
                                <li>Fill in the blanks</li>
                                <li>Essay questions</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 mb-3">
                          <div className="card border-0 bg-light h-100">
                            <div className="card-body">
                              <h6>Security Features</h6>
                              <ul className="small text-muted mb-0">
                                <li>Anti-cheat monitoring</li>
                                <li>Browser lockdown</li>
                                <li>Session recording</li>
                                <li>IP restriction</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 mb-3">
                          <div className="card border-0 bg-light h-100">
                            <div className="card-body">
                              <h6>Grading Options</h6>
                              <ul className="small text-muted mb-0">
                                <li>Automated grading</li>
                                <li>Manual review</li>
                                <li>Partial marks</li>
                                <li>Negative marking</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Custom Development */}
                    <div>
                      <h5 className="text-primary mb-4">Custom Feature Development</h5>
                      <div className="alert alert-info">
                        <i className="bi bi-lightbulb me-2"></i>
                        Need a specific feature not listed? We can develop custom features tailored to your institution's unique requirements.
                      </div>
                      <div className="text-center">
                        <button className="btn btn-primary btn-lg">
                          <i className="bi bi-chat-dots me-2"></i>
                          Request Custom Feature
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Integration Tab */}
              {activeTab === 'integration' && (
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">
                      <i className="bi bi-plug me-2"></i>
                      Integration & API Access
                    </h4>
                  </div>
                  <div className="card-body">
                    <div className="row mb-5">
                      <div className="col-md-6">
                        <h5 className="text-primary mb-4">System Integration</h5>
                        <div className="mb-4">
                          <h6>Student Management Systems</h6>
                          <p className="text-muted">
                            Integrate with your existing student database for automatic user synchronization.
                          </p>
                          <div className="d-flex flex-wrap gap-2">
                            <span className="badge bg-primary">CSV Import</span>
                            <span className="badge bg-primary">API Integration</span>
                            <span className="badge bg-primary">Real-time Sync</span>
                          </div>
                        </div>
                        <div className="mb-4">
                          <h6>Payment Gateways</h6>
                          <p className="text-muted">
                            Accept payments through various payment processors.
                          </p>
                          <div className="d-flex flex-wrap gap-2">
                            <span className="badge bg-success">Paystack</span>
                            <span className="badge bg-success">Flutterwave</span>
                            <span className="badge bg-success">Stripe</span>
                            <span className="badge bg-success">PayPal</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <h5 className="text-primary mb-4">Third-party Services</h5>
                        <div className="mb-4">
                          <h6>Communication Tools</h6>
                          <div className="d-flex flex-wrap gap-2 mb-2">
                            <span className="badge bg-info">Email (SMTP)</span>
                            <span className="badge bg-info">SMS Gateway</span>
                            <span className="badge bg-info">WhatsApp API</span>
                          </div>
                          <p className="text-muted small">
                            Send notifications, reminders, and alerts through multiple channels.
                          </p>
                        </div>
                        <div className="mb-4">
                          <h6>Cloud Storage</h6>
                          <div className="d-flex flex-wrap gap-2 mb-2">
                            <span className="badge bg-warning">AWS S3</span>
                            <span className="badge bg-warning">Google Cloud</span>
                            <span className="badge bg-warning">Azure Blob</span>
                          </div>
                          <p className="text-muted small">
                            Store files, recordings, and documents in your preferred cloud storage.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* API Access */}
                    <div className="mb-5">
                      <h5 className="text-primary mb-4">REST API Access</h5>
                      <div className="card bg-dark text-white">
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-3">
                            <div className="bg-success rounded-circle me-3" style={{ width: '10px', height: '10px' }}></div>
                            <code className="text-light">POST /api/v1/exams/create</code>
                          </div>
                          <pre className="bg-black p-3 rounded mb-0" style={{ fontSize: '12px' }}>
{`{
  "exam_title": "Mathematics Final",
  "duration_minutes": 120,
  "questions": [...],
  "participants": [...]
}`}
                          </pre>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-muted">
                          Full REST API documentation with authentication, rate limiting, and webhook support.
                        </p>
                      </div>
                    </div>

                    {/* Support & Maintenance */}
                    <div>
                      <h5 className="text-primary mb-4">Support & Maintenance</h5>
                      <div className="row">
                        <div className="col-md-4 mb-3">
                          <div className="card border-primary h-100">
                            <div className="card-body text-center">
                              <i className="bi bi-headset display-5 text-primary mb-3"></i>
                              <h6>24/7 Technical Support</h6>
                              <p className="small text-muted mb-0">
                                Phone, email, and chat support
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 mb-3">
                          <div className="card border-success h-100">
                            <div className="card-body text-center">
                              <i className="bi bi-cloud-arrow-up display-5 text-success mb-3"></i>
                              <h6>Regular Updates</h6>
                              <p className="small text-muted mb-0">
                                Security patches and feature updates
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 mb-3">
                          <div className="card border-warning h-100">
                            <div className="card-body text-center">
                              <i className="bi bi-shield-check display-5 text-warning mb-3"></i>
                              <h6>Security Monitoring</h6>
                              <p className="small text-muted mb-0">
                                24/7 security and performance monitoring
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary text-white">
        <div className="container">
          <div className="text-center">
            <h2 className="mb-4">Ready to Customize Your Platform?</h2>
            <p className="lead mb-5">
              Schedule a consultation with our team to discuss your specific requirements and get a detailed customization plan.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <a href="/proposal" className="btn btn-light btn-lg px-5">
                <i className="bi bi-file-text me-2"></i>
                Get Custom Proposal
              </a>
              <a href="/contact" className="btn btn-outline-light btn-lg px-5">
                <i className="bi bi-calendar me-2"></i>
                Schedule Consultation
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomizationPage;