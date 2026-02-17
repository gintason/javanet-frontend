"use client";

import React, { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import TestimonialCard from '@/components/TestimonialCard';
import PlatformPreview from '@/components/PlatformPreview';
import { Feature, Testimonial } from '@/types';
import { useApi } from '@/hooks/useApi';
import { API_ENDPOINTS } from '@/utils/constants';

// Fallback data matching your Feature interface exactly
const FALLBACK_CBT_FEATURES: Feature[] = [
  { 
    id: 1, 
    name: 'Automated Grading', 
    description: 'Instant grading of objective questions with detailed analytics', 
    icon: 'bi-check-circle-fill',
    feature_type: 'ctb',
    order: 1
  },
  { 
    id: 2, 
    name: 'Question Banks', 
    description: 'Create and manage extensive question databases', 
    icon: 'bi-database-fill',
    feature_type: 'ctb',
    order: 2
  },
  { 
    id: 3, 
    name: 'Real-time Analytics', 
    description: 'Track student performance with live dashboards', 
    icon: 'bi-graph-up-arrow',
    feature_type: 'ctb',
    order: 3
  },
  { 
    id: 4, 
    name: 'Secure Testing', 
    description: 'Browser lockdown and AI-powered monitoring', 
    icon: 'bi-shield-fill-check',
    feature_type: 'ctb',
    order: 4
  },
];

const FALLBACK_LIVE_FEATURES: Feature[] = [
  { 
    id: 5, 
    name: 'Live Video Classes', 
    description: 'Interactive HD video sessions with whiteboard', 
    icon: 'bi-camera-video-fill',
    feature_type: 'LIVE',
    order: 1
  },
  { 
    id: 6, 
    name: 'Smart Matching', 
    description: 'AI-powered student-tutor matching system', 
    icon: 'bi-people-fill',
    feature_type: 'LIVE',
    order: 2
  },
  { 
    id: 7, 
    name: 'Screen Sharing', 
    description: 'Share presentations, documents and applications', 
    icon: 'bi-display-fill',
    feature_type: 'LIVE',
    order: 3
  },
  { 
    id: 8, 
    name: 'Session Recording', 
    description: 'Record and replay sessions anytime', 
    icon: 'bi-record-circle-fill',
    feature_type: 'LIVE',
    order: 4
  },
];

export default function HomePage() {
  // Fetch CBT features with autoFetch enabled
  const { 
    data: cbtFeatures, 
    loading: cbtFeaturesLoading, 
    error: cbtError,
    refetch: refetchCBT 
  } = useApi<Feature[]>(
    API_ENDPOINTS.CTB_FEATURES,
    'GET',
    { autoFetch: true }
  );

  // Fetch Live features with autoFetch enabled
  const { 
    data: liveFeatures, 
    loading: liveFeaturesLoading, 
    error: liveError,
    refetch: refetchLive 
  } = useApi<Feature[]>(
    API_ENDPOINTS.LIVE_FEATURES,
    'GET',
    { autoFetch: true }
  );

  // Fetch testimonials with autoFetch enabled
  const { 
    data: testimonials, 
    loading: testimonialsLoading, 
    error: testimonialsError,
    refetch: refetchTestimonials 
  } = useApi<Testimonial[]>(
    API_ENDPOINTS.RECENT_TESTIMONIALS,
    'GET',
    { autoFetch: true }
  );

  // Log errors for debugging
  useEffect(() => {
    if (cbtError) console.error('CBT Features Error:', cbtError);
    if (liveError) console.error('Live Features Error:', liveError);
    if (testimonialsError) console.error('Testimonials Error:', testimonialsError);
  }, [cbtError, liveError, testimonialsError]);

  // Since API endpoints are already separated, no need to filter by feature_type
  // Just use the data directly or fallback
  const displayCBTFeatures = cbtFeatures && cbtFeatures.length > 0 
    ? cbtFeatures 
    : FALLBACK_CBT_FEATURES;

  const displayLiveFeatures = liveFeatures && liveFeatures.length > 0 
    ? liveFeatures 
    : FALLBACK_LIVE_FEATURES;

  return (
    <div className="homepage">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-title">
            <h3>JavaNet edTech Suite Modules And Features</h3>
            <p className="text-muted">A unified education platform that combines CBT based assessments and <br></br>
              live interactive learning. It comes with two Modules: <b>JN Assess and JN Learning</b></p>
            
            {/* Debug/Refresh buttons - can be removed in production */}
            <div className="d-flex justify-content-center gap-2 mb-3">
              <button 
                onClick={() => { 
                  refetchCBT(); 
                  refetchLive(); 
                  refetchTestimonials(); 
                }}
                className="btn btn-sm btn-outline-primary"
                disabled={cbtFeaturesLoading || liveFeaturesLoading || testimonialsLoading}
              >
                <i className="bi bi-arrow-clockwise me-1"></i>
                Refresh All Data
              </button>
              {(cbtError || liveError || testimonialsError) && (
                <div className="alert alert-warning py-1 mb-0">
                  <small>
                    {cbtError || liveError ? 'Using fallback features. ' : ''}
                    {testimonialsError ? 'Testimonials API error. ' : ''}
                    Check API connection.
                  </small>
                </div>
              )}
            </div>
          </div>
          
          {/* CBT Features */}
        <div className="mb-5">
          <div className="text-center mb-4">
            <h4 className="mb-2">
              <i className="bi bi-laptop text-primary me-2"></i>
              <span className="gradient-text px-2 rounded">JN Assess</span>
              <span className="text-dark">: Computer-Based Testing & Assessment System</span>
            </h4>
            
            {/* Divider line with FEATURES text */}
            <div className="d-flex align-items-center justify-content-center my-3">
              <div className="flex-grow-1 border-top"></div>
              <div className="mx-3 text-primary fw-bold text-uppercase small letter-spacing-1">
                FEATURES
              </div>
              <div className="flex-grow-1 border-top"></div>
            </div>
          </div>
          
          <div className="row justify-content-center">
            {cbtFeaturesLoading ? (
              <div className="col-12 text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2 text-muted">Loading CBT features...</p>
              </div>
            ) : (
              displayCBTFeatures
                .sort((a, b) => a.order - b.order)
                .slice(0, 4)
                .map((feature) => (
                  <div key={feature.id} className="col-md-3 mb-4">
                    <FeatureCard feature={feature} />
                  </div>
                ))
            )}
          </div>
        </div>
          
          {/* Live Classroom Features */}
        <div className="mt-5 pt-4">
          <div className="text-center mb-4">
            <h4 className="mb-2">
              <i className="bi bi-camera-video text-success me-2"></i>
              <span className="gradient-text px-2 rounded">JN Learning</span>
              <span className="text-dark">: Live Interactive Learning & Student-Teaching Matching System</span>
            </h4>
            
            {/* Divider line with FEATURES text */}
            <div className="d-flex align-items-center justify-content-center my-3">
              <div className="flex-grow-1 border-top"></div>
              <div className="mx-3 text-success fw-bold text-uppercase small letter-spacing-1">
                FEATURES
              </div>
              <div className="flex-grow-1 border-top"></div>
            </div>
          </div>
          
          <div className="row justify-content-center">
            {liveFeaturesLoading ? (
              <div className="col-12 text-center">
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2 text-muted">Loading live features...</p>
              </div>
            ) : (
              displayLiveFeatures
                .sort((a, b) => a.order - b.order)
                .slice(0, 4)
                .map((feature) => (
                  <div key={feature.id} className="col-md-3 mb-4">
                    <FeatureCard feature={feature} />
                  </div>
                ))
            )}
          </div>
        </div>
        </div>
      </section>
      
      {/* Platform Preview */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Customize Your Platform</h2>
            <p className="text-muted">Preview how your branded platform will look</p>
          </div>
          <PlatformPreview />
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-title">
            <h2>What Our Clients Say</h2>
            <p className="text-muted">Trusted by educational institutions</p>
          </div>
          
          <div className="row">
            {testimonialsLoading ? (
              <div className="col-12 text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2 text-muted">Loading testimonials...</p>
              </div>
            ) : testimonials && testimonials.length > 0 ? (
              testimonials.slice(0, 3).map((testimonial) => (
                <div key={testimonial.id} className="col-md-4 mb-4">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <div className="alert alert-info">
                  <p className="mb-0">Testimonials will appear here once available.</p>
                </div>
              </div>
            )}
          </div>
          
          {/* CTA Section */}
          <div className="text-center mt-5">
            <div className="card border-0 shadow-lg p-5 bg-primary text-white">
              <h3 className="mb-3">Ready to Transform Your Institution?</h3>
              <p className="mb-4">
                Get your custom proposal with one-time deployment fee. No monthly subscriptions.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <a href="/proposal" className="btn btn-light btn-lg">
                  Generate Proposal
                </a>
                <a href="/demo" className="btn btn-outline-light btn-lg">
                  Try Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

<style jsx>{`
    .gradient-text {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 700;
      position: relative;
      display: inline-block;
    }
    .gradient-text::before {
      content: '';
      position: absolute;
      inset: -2px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 6px;
      z-index: -1;
    }
  `}</style>