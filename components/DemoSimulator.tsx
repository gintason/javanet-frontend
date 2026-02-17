'use client';

import React, { useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { API_ENDPOINTS } from '@/utils/constants';
import { DemoResponse } from '@/types';

const DemoSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cbt' | 'live'>('cbt');
  const [demoStep, setDemoStep] = useState(1);
  
  const { execute: createDemoSession, loading } = useApi<DemoResponse>(
    API_ENDPOINTS.DEMO_PLATFORM,
    'POST'
  );

  const handleStartDemo = async () => {
    await createDemoSession({
      institution_name: 'Demo Institution',
      primary_color: '#1A237E',
      secondary_color: '#00C853',
      accent_color: '#7B1FA2',
      ctb_enabled: activeTab === 'cbt',
      live_classes_enabled: activeTab === 'live',
    });
    setDemoStep(2);
  };

  const cbtSteps = [
    {
      title: 'Create Exam',
      description: 'Set up questions, time limits, and grading criteria',
      icon: 'bi-pencil-square',
      color: 'text-primary'
    },
    {
      title: 'Assign to Students',
      description: 'Schedule exams for specific classes or individuals',
      icon: 'bi-people',
      color: 'text-success'
    },
    {
      title: 'Monitor Progress',
      description: 'Real-time tracking of student progress and submissions',
      icon: 'bi-graph-up',
      color: 'text-warning'
    },
    {
      title: 'View Results',
      description: 'Automated grading and detailed performance analytics',
      icon: 'bi-bar-chart',
      color: 'text-info'
    }
  ];

  const liveClassSteps = [
    {
      title: 'Schedule Class',
      description: 'Set date, time, and invite participants',
      icon: 'bi-calendar-plus',
      color: 'text-primary'
    },
    {
      title: 'Start Session',
      description: 'Launch virtual classroom with audio/video',
      icon: 'bi-camera-video',
      color: 'text-success'
    },
    {
      title: 'Interactive Tools',
      description: 'Use whiteboard, screen share, and breakout rooms',
      icon: 'bi-easel',
      color: 'text-warning'
    },
    {
      title: 'Record & Share',
      description: 'Record sessions and share with absent students',
      icon: 'bi-record-circle',
      color: 'text-info'
    }
  ];

  const steps = activeTab === 'cbt' ? cbtSteps : liveClassSteps;

  return (
    <div className="demo-simulator">
      {/* Demo Header */}
      <div className="card border-0 shadow-lg mb-4">
        <div className="card-body text-center p-5">
          <h2 className="text-primary mb-3">
            <i className="bi bi-play-circle me-2"></i>
            Interactive Platform Simulator
          </h2>
          <p className="lead mb-4">
            Experience how our platform works. Try the {activeTab === 'cbt' ? 'CBT exam system' : 'Live classroom'} in action.
          </p>
          
          {/* Tab Selection */}
          <div className="d-flex justify-content-center mb-4">
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn ${activeTab === 'cbt' ? 'btn-primary' : 'btn-outline-primary'} px-4 py-3`}
                onClick={() => {
                  setActiveTab('cbt');
                  setDemoStep(1);
                }}
              >
                <i className="bi bi-laptop me-2"></i>
                CBT Testing System
              </button>
              <button
                type="button"
                className={`btn ${activeTab === 'live' ? 'btn-success' : 'btn-outline-success'} px-4 py-3`}
                onClick={() => {
                  setActiveTab('live');
                  setDemoStep(1);
                }}
              >
                <i className="bi bi-camera-video me-2"></i>
                Live Classroom
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Demo Steps */}
        <div className="col-lg-4 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-light">
              <h5 className="mb-0">
                <i className="bi bi-list-ol me-2"></i>
                Demo Steps
              </h5>
            </div>
            <div className="card-body">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`demo-step mb-4 p-3 rounded ${demoStep > index + 1 ? 'bg-success bg-opacity-10 border-success' : demoStep === index + 1 ? 'bg-primary bg-opacity-10 border-primary' : 'bg-light'}`}
                  style={{ cursor: 'pointer', borderLeft: `4px solid ${demoStep > index + 1 ? '#28a745' : demoStep === index + 1 ? '#1A237E' : '#dee2e6'}` }}
                  onClick={() => demoStep > index + 1 && setDemoStep(index + 1)}
                >
                  <div className="d-flex align-items-center mb-2">
                    <div className={`rounded-circle ${demoStep > index + 1 ? 'bg-success text-white' : demoStep === index + 1 ? 'bg-primary text-white' : 'bg-secondary text-white'} d-flex align-items-center justify-content-center me-3`}
                         style={{ width: '30px', height: '30px' }}>
                      {demoStep > index + 1 ? (
                        <i className="bi bi-check"></i>
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <h6 className="mb-0">{step.title}</h6>
                  </div>
                  <p className="small text-muted mb-0 ms-5">{step.description}</p>
                </div>
              ))}
              
              {/* Start Demo Button */}
              {demoStep === 1 && (
                <button
                  className="btn btn-primary w-100 py-3 mt-3"
                  onClick={handleStartDemo}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Starting Demo...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-play-circle me-2"></i>
                      Start Interactive Demo
                    </>
                  )}
                </button>
              )}
              
              {/* Navigation Buttons */}
              {demoStep > 1 && (
                <div className="d-flex gap-2 mt-4">
                  <button
                    className="btn btn-outline-secondary grow"
                    onClick={() => setDemoStep(prev => Math.max(1, prev - 1))}
                    disabled={demoStep === 1}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Previous
                  </button>
                  <button
                    className="btn btn-primary grow"
                    onClick={() => setDemoStep(prev => Math.min(steps.length, prev + 1))}
                    disabled={demoStep === steps.length}
                  >
                    Next
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Demo Interface */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg h-100">
            <div className="card-header bg-dark text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className={`bi ${activeTab === 'cbt' ? 'bi-laptop' : 'bi-camera-video'} me-2`}></i>
                  {activeTab === 'cbt' ? 'CBT Exam Interface' : 'Live Classroom Interface'}
                </h5>
                <div className="d-flex align-items-center">
                  <div className="bg-success rounded-circle me-2" style={{ width: '8px', height: '8px' }}></div>
                  <small>Demo Mode • Step {demoStep} of {steps.length}</small>
                </div>
              </div>
            </div>
            
            <div className="card-body p-0">
              {/* CBT Demo Interface */}
              {activeTab === 'cbt' && (
                <div className="p-4">
                  {demoStep === 1 && (
                    <div className="text-center py-5">
                      <div className="mb-4">
                        <i className="bi bi-pencil-square display-1 text-primary"></i>
                      </div>
                      <h4 className="mb-3">Create New Exam</h4>
                      <p className="text-muted mb-4">
                        Click "Start Interactive Demo" to begin creating your first exam.
                      </p>
                    </div>
                  )}
                  
                  {demoStep === 2 && (
                    <div className="exam-creation-demo">
                      <h5 className="text-primary mb-4">
                        <i className="bi bi-pencil-square me-2"></i>
                        Create New Exam
                      </h5>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Exam Title</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g., Mathematics Mid-term Exam"
                          value="Sample Mathematics Exam"
                          readOnly
                        />
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label fw-bold">Duration (minutes)</label>
                          <input
                            type="number"
                            className="form-control"
                            value="90"
                            readOnly
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-bold">Total Questions</label>
                          <input
                            type="number"
                            className="form-control"
                            value="50"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Instructions</label>
                        <textarea
                          className="form-control"
                          rows={3}
                          value="This exam contains multiple choice questions. Each question has only one correct answer. The exam will auto-submit when time expires."
                          readOnly
                        ></textarea>
                      </div>
                    </div>
                  )}
                  
                  {demoStep === 3 && (
                    <div className="exam-monitoring-demo">
                      <h5 className="text-primary mb-4">
                        <i className="bi bi-graph-up me-2"></i>
                        Exam Monitoring Dashboard
                      </h5>
                      <div className="card bg-light border-0 mb-4">
                        <div className="card-body">
                          <div className="row text-center">
                            <div className="col-md-3 border-end">
                              <h3 className="text-success">25</h3>
                              <small>Completed</small>
                            </div>
                            <div className="col-md-3 border-end">
                              <h3 className="text-primary">15</h3>
                              <small>In Progress</small>
                            </div>
                            <div className="col-md-3 border-end">
                              <h3 className="text-warning">10</h3>
                              <small>Not Started</small>
                            </div>
                            <div className="col-md-3">
                              <h3 className="text-danger">0</h3>
                              <small>Disconnected</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="alert alert-info">
                        <i className="bi bi-info-circle me-2"></i>
                        Real-time monitoring shows student progress, submission status, and potential issues.
                      </div>
                    </div>
                  )}
                  
                  {demoStep === 4 && (
                    <div className="exam-results-demo">
                      <h5 className="text-primary mb-4">
                        <i className="bi bi-bar-chart me-2"></i>
                        Exam Results & Analytics
                      </h5>
                      <div className="row mb-4">
                        <div className="col-md-6">
                          <div className="card border-success border-2">
                            <div className="card-body">
                              <h6 className="text-success">Class Performance</h6>
                              <div className="mb-3">
                                <div className="d-flex justify-content-between mb-1">
                                  <small>Average Score</small>
                                  <small>75%</small>
                                </div>
                                <div className="progress">
                                  <div className="progress-bar bg-success" style={{ width: '75%' }}></div>
                                </div>
                              </div>
                              <div className="mb-3">
                                <div className="d-flex justify-content-between mb-1">
                                  <small>Highest Score</small>
                                  <small>98%</small>
                                </div>
                                <div className="progress">
                                  <div className="progress-bar bg-primary" style={{ width: '98%' }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card border-primary border-2">
                            <div className="card-body">
                              <h6 className="text-primary">Question Analysis</h6>
                              <ul className="list-unstyled mb-0">
                                <li className="mb-2">
                                  <small>Most difficult: Q12 (35% correct)</small>
                                </li>
                                <li className="mb-2">
                                  <small>Easiest: Q3 (95% correct)</small>
                                </li>
                                <li>
                                  <small>Average time: 1.5 min/question</small>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Live Class Demo Interface */}
              {activeTab === 'live' && (
                <div className="p-4">
                  {demoStep === 1 && (
                    <div className="text-center py-5">
                      <div className="mb-4">
                        <i className="bi bi-camera-video display-1 text-success"></i>
                      </div>
                      <h4 className="mb-3">Schedule Live Class</h4>
                      <p className="text-muted mb-4">
                        Click "Start Interactive Demo" to begin scheduling your first live class.
                      </p>
                    </div>
                  )}
                  
                  {demoStep === 2 && (
                    <div className="class-scheduling-demo">
                      <h5 className="text-success mb-4">
                        <i className="bi bi-calendar-plus me-2"></i>
                        Schedule New Class
                      </h5>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Class Title</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g., Introduction to Algebra"
                          value="Sample Mathematics Class"
                          readOnly
                        />
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label fw-bold">Date & Time</label>
                          <input
                            type="text"
                            className="form-control"
                            value="Tomorrow, 10:00 AM - 11:30 AM"
                            readOnly
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-bold">Expected Participants</label>
                          <input
                            type="number"
                            className="form-control"
                            value="30"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Invite Students</label>
                        <div className="border rounded p-3 bg-light">
                          <div className="d-flex flex-wrap gap-2">
                            {['Class 10A', 'Class 10B', 'Mathematics Club'].map((group, idx) => (
                              <span key={idx} className="badge bg-primary">
                                {group}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {demoStep === 3 && (
                    <div className="class-tools-demo">
                      <h5 className="text-success mb-4">
                        <i className="bi bi-easel me-2"></i>
                        Interactive Classroom Tools
                      </h5>
                      <div className="row g-3 mb-4">
                        <div className="col-md-4">
                          <div className="card border-primary text-center p-3">
                            <i className="bi bi-easel fs-1 text-primary mb-3"></i>
                            <h6>Virtual Whiteboard</h6>
                            <small className="text-muted">Draw, write, and annotate</small>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="card border-success text-center p-3">
                            <i className="bi bi-laptop fs-1 text-success mb-3"></i>
                            <h6>Screen Sharing</h6>
                            <small className="text-muted">Share presentations & apps</small>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="card border-warning text-center p-3">
                            <i className="bi bi-diagram-3 fs-1 text-warning mb-3"></i>
                            <h6>Breakout Rooms</h6>
                            <small className="text-muted">Small group discussions</small>
                          </div>
                        </div>
                      </div>
                      <div className="alert alert-info">
                        <i className="bi bi-info-circle me-2"></i>
                        All tools work in real-time with multiple participants.
                      </div>
                    </div>
                  )}
                  
                  {demoStep === 4 && (
                    <div className="class-recording-demo">
                      <h5 className="text-success mb-4">
                        <i className="bi bi-record-circle me-2"></i>
                        Session Recording & Sharing
                      </h5>
                      <div className="card border-success border-2">
                        <div className="card-body">
                          <div className="row align-items-center">
                            <div className="col-md-3 text-center">
                              <i className="bi bi-play-circle display-1 text-success"></i>
                            </div>
                            <div className="col-md-9">
                              <h5>Sample Class Recording</h5>
                              <p className="text-muted mb-2">
                                Mathematics Class • Duration: 1h 25m • Size: 245 MB
                              </p>
                              <div className="d-flex gap-2">
                                <button className="btn btn-success btn-sm">
                                  <i className="bi bi-play me-1"></i>
                                  Play Recording
                                </button>
                                <button className="btn btn-outline-success btn-sm">
                                  <i className="bi bi-download me-1"></i>
                                  Download
                                </button>
                                <button className="btn btn-outline-primary btn-sm">
                                  <i className="bi bi-share me-1"></i>
                                  Share Link
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h6>Recording Features:</h6>
                        <ul className="text-muted">
                          <li>Automatic recording of all sessions</li>
                          <li>Cloud storage for easy access</li>
                          <li>Shareable links for absent students</li>
                          <li>Playback with searchable transcripts</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="card-footer bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  <i className="bi bi-info-circle me-1"></i>
                  This is an interactive simulation. Your actual platform will have full functionality.
                </small>
                <div>
                  <a 
                    href="https://www.ischool.ng/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-primary"
                  >
                    <i className="bi bi-box-arrow-up-right me-1"></i>
                    Try Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoSimulator;