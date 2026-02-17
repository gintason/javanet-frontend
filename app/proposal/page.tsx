// app/proposal/page.tsx
"use client";

import React, { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import ProposalForm from '@/components/ProposalForm';
import { useCurrency } from '@/hooks/useCurrency';

// Create a client component wrapper
function ProposalContent() {
  const { user, loading } = useAuthContext();
  const { currencyInfo } = useCurrency();
  const router = useRouter();

  // Check authentication on component mount
  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login with return URL
      router.push(`/login?redirect=${encodeURIComponent('/proposal')}`);
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
          <p className="mt-3 text-muted">Loading proposal...</p>
        </div>
      </div>
    );
  }

  // Don't render content if not authenticated
  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="proposal-page">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold mb-4 text-warning">
                Get Your Custom Proposal
              </h1>
              <p className="lead mb-4">
                Receive a detailed proposal with one-time deployment fee. No monthly subscriptions, 
                no hidden costs. Complete ownership of your platform.
              </p>
              
              {currencyInfo && (
                <div className="bg-white text-dark rounded-3 p-4 mb-4">
                  <div className="d-flex align-items-center">
                    <div className="bg-primary text-white rounded-circle p-3 me-3">
                      <i className="bi bi-cash-coin fs-3"></i>
                    </div>
                    <div>
                      <h4 className="mb-1">One-Time Deployment Fee</h4>
                      <p className="mb-0 fw-bold fs-5 text-primary">
                        {currencyInfo.deployment_fee.range}
                        <small className="text-muted ms-2">
                          ({currencyInfo.country})
                        </small>
                      </p>
                      <small className="text-muted">
                        Complete setup • Full customization • No recurring fees
                      </small>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="d-flex flex-wrap gap-3">
                <a href="#proposal-form" className="btn btn-light btn-lg">
                  <i className="bi bi-file-text me-2"></i>
                  Generate Proposal Now
                </a>
                <a href="/demo" className="btn btn-outline-light btn-lg">
                  <i className="bi bi-play-circle me-2"></i>
                  Try Demo First
                </a>
              </div>
            </div>
            
            <div className="col-lg-6 text-center mt-5 mt-lg-0">
  <div className="position-relative d-inline-block">
    <div className="bg-white rounded-3 p-5 shadow-lg">
      <div className="mb-4">
        <i className="bi bi-file-text display-1 text-primary"></i>
      </div>
      <h5 className="text-dark mb-2">
        Welcome, {user.first_name || user.company || user.email}!
      </h5>
      <p className="text-muted mb-2">Your custom proposal will include:</p>
      <ul className="list-unstyled text-start mb-0">
        <li className="mb-2 text-warning ">
          <i className="bi bi-check-circle me-2 text-success "></i>
          Detailed cost breakdown
        </li>
        <li className="mb-2 text-warning">
          <i className="bi bi-check-circle text-success me-2"></i>
          Customization options
        </li>
        <li className="mb-2 text-warning">
          <i className="bi bi-check-circle text-success me-2"></i>
          Implementation timeline
        </li>
        <li className="mb-2 text-warning">
          <i className="bi bi-check-circle text-success me-2"></i>
          Support & maintenance plan
        </li>
      </ul>
    </div>
  </div>
</div>

          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-title">
            <h2>One-Time Fee vs Monthly Subscription</h2>
            <p className="text-muted">See how our pricing model saves you money in the long run</p>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card border-success border-3 h-100">
                <div className="card-header bg-success text-white text-center py-4">
                  <h4 className="mb-0">JavaNet EdTech</h4>
                  <p className="mb-0">One-Time Deployment Fee</p>
                </div>
                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <h2 className="text-success mb-0">
                      {currencyInfo?.deployment_fee.range}
                    </h2>
                    <small className="text-muted">One-time payment</small>
                  </div>
                  
                  <ul className="list-unstyled mb-4">
                    <li className="mb-3">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <strong>Complete ownership</strong> of platform
                    </li>
                    <li className="mb-3">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <strong>No monthly fees</strong> ever
                    </li>
                    <li className="mb-3">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <strong>Full source code</strong> access
                    </li>
                    <li className="mb-3">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <strong>Custom branding</strong> and features
                    </li>
                    <li>
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <strong>24/7 support</strong> included
                    </li>
                  </ul>
                  
                  <div className="mt-4 p-3 bg-success bg-opacity-10 rounded">
                    <h6 className="text-success">3-Year Savings</h6>
                    <div className="d-flex justify-content-between">
                      <span>Typical subscription:</span>
                      <span className="fw-bold">
                        {currencyInfo?.currency === 'NGN' ? '₦3.6M+' : '$10,800+'}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Our one-time fee:</span>
                      <span className="fw-bold text-success">
                        {currencyInfo?.deployment_fee.range}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 mb-4">
              <div className="card border-0 bg-white h-100">
                <div className="card-header bg-secondary text-white text-center py-4">
                  <h4 className="mb-0">Typical SaaS Platform</h4>
                  <p className="mb-0">Monthly Subscription Model</p>
                </div>
                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <h2 className="text-secondary mb-0">
                      {currencyInfo?.currency === 'NGN' ? '₦100K+' : '$300+'}/month
                    </h2>
                    <small className="text-muted">Recurring payments</small>
                  </div>
                  
                  <ul className="list-unstyled mb-4">
                    <li className="mb-3">
                      <i className="bi bi-x-circle-fill text-danger me-2"></i>
                      <strong>No ownership</strong> of platform
                    </li>
                    <li className="mb-3">
                      <i className="bi bi-x-circle-fill text-danger me-2"></i>
                      <strong>Monthly fees</strong> forever
                    </li>
                    <li className="mb-3">
                      <i className="bi bi-x-circle-fill text-danger me-2"></i>
                      <strong>No source code</strong> access
                    </li>
                    <li className="mb-3">
                      <i className="bi bi-x-circle-fill text-danger me-2"></i>
                      <strong>Limited customization</strong>
                    </li>
                    <li>
                      <i className="bi bi-x-circle-fill text-danger me-2"></i>
                      <strong>Extra fees</strong> for support
                    </li>
                  </ul>
                  
                  <div className="mt-4 p-3 bg-danger bg-opacity-10 rounded">
                    <h6 className="text-danger">3-Year Cost</h6>
                    <div className="d-flex justify-content-between">
                      <span>Monthly payments:</span>
                      <span className="fw-bold text-danger">
                        {currencyInfo?.currency === 'NGN' ? '₦3.6M+' : '$10,800+'}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Additional costs:</span>
                      <span className="fw-bold text-danger">
                        {currencyInfo?.currency === 'NGN' ? '₦500K+' : '$1,500+'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proposal Form Section */}
      <section id="proposal-form" className="section">
        <div className="container">
          <div className="section-title">
            <h2>Generate Your Custom Proposal</h2>
            <p className="text-muted">
              Fill out the form below to receive a detailed proposal with one-time deployment fee
            </p>
          </div>
          
          <ProposalForm />
        </div>
      </section>

      {/* Implementation Process */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-title">
            <h2>Implementation Process</h2>
            <p className="text-muted">From proposal to launch in 4 simple steps</p>
          </div>
          
          <div className="row">
            <div className="col-md-3 mb-4">
              <div className="card border-0 bg-white h-100 text-center">
                <div className="card-body p-4">
                  <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                       style={{ width: '60px', height: '60px' }}>
                    <span className="fs-4">1</span>
                  </div>
                  <h5 className="text-primary mb-3">Proposal & Agreement</h5>
                  <p className="text-muted small">
                    Review and approve your custom proposal
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-3 mb-4">
              <div className="card border-0 bg-white h-100 text-center">
                <div className="card-body p-4">
                  <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                       style={{ width: '60px', height: '60px' }}>
                    <span className="fs-4">2</span>
                  </div>
                  <h5 className="text-success mb-3">Customization</h5>
                  <p className="text-muted small">
                    Branding, features, and integration setup
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-3 mb-4">
              <div className="card border-0 bg-white h-100 text-center">
                <div className="card-body p-4">
                  <div className="bg-warning text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                       style={{ width: '60px', height: '60px' }}>
                    <span className="fs-4">3</span>
                  </div>
                  <h5 className="text-warning mb-3">Testing & Training</h5>
                  <p className="text-muted small">
                    Platform testing and staff training
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-3 mb-4">
              <div className="card border-0 bg-white h-100 text-center">
                <div className="card-body p-4">
                  <div className="bg-info text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                       style={{ width: '60px', height: '60px' }}>
                    <span className="fs-4">4</span>
                  </div>
                  <h5 className="text-info mb-3">Launch & Support</h5>
                  <p className="text-muted small">
                    Go live with ongoing support
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-5">
            <div className="card border-primary border-2">
              <div className="card-body p-4">
                <h4 className="text-primary mb-3">
                  <i className="bi bi-clock-history me-2"></i>
                  Typical Implementation Timeline
                </h4>
                <div className="row">
                  <div className="col-md-4">
                    <div className="text-center">
                      <h1 className="text-primary">2-4</h1>
                      <p className="text-muted mb-0">Weeks Setup</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="text-center">
                      <h1 className="text-success">1</h1>
                      <p className="text-muted mb-0">Week Training</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="text-center">
                      <h1 className="text-warning">24/7</h1>
                      <p className="text-muted mb-0">Support Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Frequently Asked Questions</h2>
            <p className="text-muted">Common questions about our proposal and pricing</p>
          </div>
          
          <div className="row">
            <div className="col-lg-6">
              <div className="accordion" id="proposalFAQ">
                {/* Question 1 */}
                <div className="accordion-item border-0 mb-3">
                  <h3 className="accordion-header">
                    <button
                      className="accordion-button collapsed bg-light"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq1"
                    >
                      What does the one-time deployment fee include?
                    </button>
                  </h3>
                  <div
                    id="faq1"
                    className="accordion-collapse collapse"
                    data-bs-parent="#proposalFAQ"
                  >
                    <div className="accordion-body">
                      The one-time fee includes: complete platform setup on your server or cloud, 
                      custom branding with your logo and colors, all selected features and modules, 
                      staff training, documentation, and 12 months of technical support and updates.
                    </div>
                  </div>
                </div>
                
                {/* Question 2 */}
                <div className="accordion-item border-0 mb-3">
                  <h3 className="accordion-header">
                    <button
                      className="accordion-button collapsed bg-light"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq2"
                    >
                      Are there any additional costs?
                    </button>
                  </h3>
                  <div
                    id="faq2"
                    className="accordion-collapse collapse"
                    data-bs-parent="#proposalFAQ"
                  >
                    <div className="accordion-body">
                      The main additional cost would be your hosting/server expenses if you choose 
                      cloud hosting. We can provide hosting at an additional monthly fee, or you can 
                      host on your own servers. Optional add-ons like mobile apps or custom feature 
                      development are quoted separately.
                    </div>
                  </div>
                </div>
                
                {/* Question 3 */}
                <div className="accordion-item border-0 mb-3">
                  <h3 className="accordion-header">
                    <button
                      className="accordion-button collapsed bg-light"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq3"
                    >
                      How long does implementation take?
                    </button>
                  </h3>
                  <div
                    id="faq3"
                    className="accordion-collapse collapse"
                    data-bs-parent="#proposalFAQ"
                  >
                    <div className="accordion-body">
                      Typical implementation takes 2-4 weeks from approval: 1-2 weeks for setup and 
                      customization, 1 week for testing, and 1 week for staff training. Complex 
                      customizations or integrations may take longer, which we'll specify in your 
                      proposal.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="accordion" id="proposalFAQ2">
                {/* Question 4 */}
                <div className="accordion-item border-0 mb-3">
                  <h3 className="accordion-header">
                    <button
                      className="accordion-button collapsed bg-light"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq4"
                    >
                      What about updates and support after launch?
                    </button>
                  </h3>
                  <div
                    id="faq4"
                    className="accordion-collapse collapse"
                    data-bs-parent="#proposalFAQ2"
                  >
                    <div className="accordion-body">
                      We include 12 months of free technical support and updates. After that, 
                      you can choose our optional support package or handle maintenance yourself 
                      (since you own the source code). Most clients continue with our support 
                      for peace of mind.
                    </div>
                  </div>
                </div>
                
                {/* Question 5 */}
                <div className="accordion-item border-0 mb-3">
                  <h3 className="accordion-header">
                    <button
                      className="accordion-button collapsed bg-light"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq5"
                    >
                      Can we add more features later?
                    </button>
                  </h3>
                  <div
                    id="faq5"
                    className="accordion-collapse collapse"
                    data-bs-parent="#proposalFAQ2"
                  >
                    <div className="accordion-body">
                      Yes! You can add features at any time. Since you own the platform, you can 
                      either hire us to develop new features or hire other developers. We provide 
                      complete documentation and can assist with feature additions as needed.
                    </div>
                  </div>
                </div>
                
                {/* Question 6 */}
                <div className="accordion-item border-0 mb-3">
                  <h3 className="accordion-header">
                    <button
                      className="accordion-button collapsed bg-light"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq6"
                    >
                      What payment options are available?
                    </button>
                  </h3>
                  <div
                    id="faq6"
                    className="accordion-collapse collapse"
                    data-bs-parent="#proposalFAQ2"
                  >
                    <div className="accordion-body">
                      We offer flexible payment options: 50% upfront and 50% upon completion, 
                      or customized payment plans for larger projects. We accept bank transfers, 
                      online payments, and credit cards. For Nigerian institutions, we accept 
                      Naira payments.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact for Questions */}
          <div className="text-center mt-5">
            <div className="card border-success border-2">
              <div className="card-body p-4">
                <h4 className="text-success mb-3">Still Have Questions?</h4>
                <p className="mb-4">
                  Contact our sales team for personalized assistance
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <a href="mailto:sales@javanetict.com" className="btn btn-success">
                    <i className="bi bi-envelope me-2"></i>
                    Email Sales
                  </a>
                  <a href="tel:+2347030673089" className="btn btn-outline-success">
                    <i className="bi bi-telephone me-2"></i>
                    Call +234 703 067 3089
                  </a>
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
const ProposalPage = () => {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=${encodeURIComponent('/proposal')}`);
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading proposal information...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Suspense fallback={
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading Proposal...</span>
          </div>
          <p className="mt-3 text-muted">Loading proposal information...</p>
        </div>
      </div>
    }>
      <ProposalContent />
    </Suspense>
  );
};

export default ProposalPage;