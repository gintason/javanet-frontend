'use client';

import React, { useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { API_ENDPOINTS } from '@/utils/constants';
import { DemoResponse } from '@/types';

const PlatformPreview: React.FC = () => {
  const [institutionName, setInstitutionName] = useState('Your Institution');
  const [primaryColor, setPrimaryColor] = useState('#1A237E');
  const [secondaryColor, setSecondaryColor] = useState('#00C853');
  const [accentColor, setAccentColor] = useState('#7B1FA2');
  const [ctbEnabled, setCtbEnabled] = useState(true);
  const [liveClassesEnabled, setLiveClassesEnabled] = useState(false);

  const { execute: generateDemo, loading, data: demoData } = useApi<DemoResponse>(
    API_ENDPOINTS.DEMO_PLATFORM,
    'POST'
  );

  const handlePreview = async () => {
    await generateDemo({
      institution_name: institutionName,
      primary_color: primaryColor,
      secondary_color: secondaryColor,
      accent_color: accentColor,
      ctb_enabled: ctbEnabled,
      live_classes_enabled: liveClassesEnabled,
    });
  };

  const previewData = demoData?.demo_session || {
    branding: {
      primary_color: primaryColor,
      secondary_color: secondaryColor,
      accent_color: accentColor,
    },
    modules: {
      ctb: ctbEnabled,
      live_classes: liveClassesEnabled,
    },
  };

  return (
    <div className="row">
      {/* Preview Controls */}
      <div className="col-lg-4 mb-4">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">
              <i className="bi bi-palette me-2"></i>
              Customize Preview
            </h5>
          </div>
          <div className="card-body">
            {/* Institution Name */}
            <div className="mb-3">
              <label className="form-label fw-bold">Institution Name</label>
              <input
                type="text"
                className="form-control"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                placeholder="Enter your institution name"
              />
            </div>

            {/* Color Pickers */}
            <div className="mb-3">
              <label className="form-label fw-bold">Brand Colors</label>
              
              <div className="row g-2 mb-2">
                <div className="col-9">
                  <label className="form-label small mb-1">Primary Color</label>
                  <input
                    type="color"
                    className="form-control form-control-color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    title="Choose primary color"
                  />
                </div>
                <div className="col-3">
                  <div className="mt-4">
                    <div 
                      className="rounded-circle border" 
                      style={{ 
                        width: '30px', 
                        height: '30px', 
                        backgroundColor: primaryColor 
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="row g-2 mb-2">
                <div className="col-9">
                  <label className="form-label small mb-1">Secondary Color</label>
                  <input
                    type="color"
                    className="form-control form-control-color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    title="Choose secondary color"
                  />
                </div>
                <div className="col-3">
                  <div className="mt-4">
                    <div 
                      className="rounded-circle border" 
                      style={{ 
                        width: '30px', 
                        height: '30px', 
                        backgroundColor: secondaryColor 
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="row g-2">
                <div className="col-9">
                  <label className="form-label small mb-1">Accent Color</label>
                  <input
                    type="color"
                    className="form-control form-control-color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    title="Choose accent color"
                  />
                </div>
                <div className="col-3">
                  <div className="mt-4">
                    <div 
                      className="rounded-circle border" 
                      style={{ 
                        width: '30px', 
                        height: '30px', 
                        backgroundColor: accentColor 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module Selection */}
            <div className="mb-4">
              <label className="form-label fw-bold">Platform Modules</label>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={ctbEnabled}
                  onChange={(e) => setCtbEnabled(e.target.checked)}
                  id="ctbCheck"
                />
                <label className="form-check-label" htmlFor="ctbCheck">
                  <i className="bi bi-laptop text-primary me-2"></i>
                  Computer-Based Testing System
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={liveClassesEnabled}
                  onChange={(e) => setLiveClassesEnabled(e.target.checked)}
                  id="liveCheck"
                />
                <label className="form-check-label" htmlFor="liveCheck">
                  <i className="bi bi-camera-video text-success me-2"></i>
                  Live Interactive Learning
                </label>
              </div>
            </div>

            {/* Generate Button */}
            <button
              className="btn btn-primary w-100 py-3"
              onClick={handlePreview}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Generating Preview...
                </>
              ) : (
                <>
                  <i className="bi bi-eye me-2"></i>
                  Update Preview
                </>
              )}
            </button>

            {/* Demo Info */}
            {demoData && (
              <div className="alert alert-success mt-3">
                <i className="bi bi-check-circle me-2"></i>
                {demoData.message}
                <div className="mt-2 small">
                  <small>
                    Session ID: {demoData.demo_session.session_id.substring(0, 8)}...
                  </small>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="col-lg-8">
        <div className="card border-0 shadow-lg">
          <div className="card-header text-white" 
               style={{ backgroundColor: previewData.branding.primary_color }}>
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">
                <i className="bi bi-building me-2"></i>
                {institutionName}
              </h4>
              <span className="badge bg-light text-dark">
                <i className="bi bi-lightning-charge me-1"></i>
                Preview Mode
              </span>
            </div>
          </div>
          
          <div className="card-body p-0">
            {/* Navigation Preview */}
            <div className="p-3 border-bottom" 
                 style={{ backgroundColor: previewData.branding.secondary_color + '20' }}>
              <div className="d-flex gap-3">
                <a href="#" className="text-decoration-none fw-bold" 
                   style={{ color: previewData.branding.primary_color }}>
                  <i className="bi bi-house me-1"></i>
                  Dashboard
                </a>
                {previewData.modules.ctb && (
                  <a href="#" className="text-decoration-none" 
                     style={{ color: previewData.branding.accent_color }}>
                    <i className="bi bi-laptop me-1"></i>
                    JN Assess - CBT based Assessments
                  </a>
                )}
                {previewData.modules.live_classes && (
                  <a href="#" className="text-decoration-none" 
                     style={{ color: previewData.branding.accent_color }}>
                    <i className="bi bi-camera-video me-1"></i>
                    JN Learning - Live Interactive Classes
                  </a>
                )}
                <a href="#" className="text-decoration-none text-dark ms-auto">
                  <i className="bi bi-person-circle"></i>
                </a>
              </div>
            </div>

            {/* Content Preview */}
            <div className="p-4">
              <h5 className="mb-4" style={{ color: previewData.branding.primary_color }}>
                Welcome to Your Custom Platform
              </h5>
              
              <div className="row g-4">
                {/* CBT Module Preview */}
                {previewData.modules.ctb && (
                  <div className="col-md-6">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <div className="bg-primary text-white rounded-circle p-2 me-3">
                            <i className="bi bi-laptop"></i>
                          </div>
                          <h6 className="mb-0">CBT Testing System</h6>
                        </div>
                        <ul className="list-unstyled mb-0">
                          <li className="mb-2">
                            <i className="bi bi-check-circle text-success me-2"></i>
                            Automated Grading
                          </li>
                          <li className="mb-2">
                            <i className="bi bi-check-circle text-success me-2"></i>
                            Question Bank
                          </li>
                          <li>
                            <i className="bi bi-check-circle text-success me-2"></i>
                            Secure, Role-Based Authentication
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Live Class Module Preview */}
                {previewData.modules.live_classes && (
                  <div className="col-md-6">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <div className="bg-success text-white rounded-circle p-2 me-3">
                            <i className="bi bi-camera-video"></i>
                          </div>
                          <h6 className="mb-0">Live Interactive Classroom</h6>
                        </div>
                        <ul className="list-unstyled mb-0">
                          <li className="mb-2">
                            <i className="bi bi-check-circle text-success me-2"></i>
                            Intelligent Teacher-Student Matching Engine
                          </li>
                          <li className="mb-2">
                            <i className="bi bi-check-circle text-success me-2"></i>
                            Smart Attendance & Payroll
                          </li>
                          <li>
                            <i className="bi bi-check-circle text-success me-2"></i>
                            Structured e-Library Integration
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stats Preview */}
                <div className="col-12">
                  <div className="card border-0" 
                       style={{ backgroundColor: previewData.branding.secondary_color + '10' }}>
                    <div className="card-body">
                      <div className="row text-center">
                        <div className="col-md-3 border-end">
                          <h3 style={{ color: previewData.branding.primary_color }}>100%</h3>
                          <small className="text-muted">Custom Branding</small>
                        </div>
                        <div className="col-md-3 border-end">
                          <h3 style={{ color: previewData.branding.accent_color }}>24/7</h3>
                          <small className="text-muted">Support</small>
                        </div>
                        <div className="col-md-3 border-end">
                          <h3 className="text-success">2-4</h3>
                          <small className="text-muted">Weeks Setup</small>
                        </div>
                        <div className="col-md-3">
                          <h3 className="text-warning">1</h3>
                          <small className="text-muted">One-time Fee</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer text-center bg-light">
            <small className="text-muted">
              <i className="bi bi-info-circle me-1"></i>
              This is a simulation. Your actual platform will be fully functional with your branding.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformPreview;