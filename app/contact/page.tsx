'use client';

import React, { useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { useChatbotContext } from '@/contexts/ChatbotContext';
import Link from 'next/link';
export const dynamic = 'force-dynamic';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  // Get chatbot context for opening live chat
  const { openChatbot } = useChatbotContext();

  const { execute: submitContact, loading, data, error } = useApi(
    'core/contact/',
    'POST'
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitContact(formData);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold mb-4">
                Get in Touch With Us
              </h1>
              <p className="lead mb-4">
                Have questions about our platform, pricing, or implementation? 
                Our team is ready to help you transform your institution.
              </p>
              <div className="d-flex align-items-center mb-3">
                <div className="bg-white text-primary rounded-circle p-3 me-3">
                  <i className="bi bi-telephone fs-3"></i>
                </div>
                <div>
                  <h5 className="mb-1">Call Us Anytime</h5>
                  <p className="mb-0">+234 703 067 3089, +2349128688164</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 text-center mt-5 mt-lg-0">
              <div className="position-relative d-inline-block">
                <div className="bg-white rounded-3 p-5 shadow-lg">
                  <div className="mb-4">
                    <i className="bi bi-headset display-1 text-primary"></i>
                  </div>
                  <h5 className="text-dark mb-2">24/7 Support</h5>
                  <p className="text-muted mb-0">
                    Technical support always available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section">
        <div className="container">
          <div className="row">
            {/* Contact Form */}
            <div className="col-lg-7 mb-5 mb-lg-0">
              <div className="card border-0 shadow-lg">
                <div className="card-header bg-primary text-white">
                  <h4 className="mb-0">
                    <i className="bi bi-envelope me-2"></i>
                    Send Us a Message
                  </h4>
                </div>
                
                <div className="card-body p-4 p-md-5">
                  {data ? (
                    /* Success Message */
                    <div className="text-center py-5">
                      <div className="mb-4">
                        <i className="bi bi-check-circle text-success display-1"></i>
                      </div>
                      <h3 className="mb-3">Message Sent Successfully!</h3>
                      <p className="text-muted mb-4">
                        Thank you for contacting us. We'll get back to you within 24 hours.
                      </p>
                      <button 
                        className="btn btn-primary"
                        onClick={() => window.location.reload()}
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    /* Contact Form */
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-bold">Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-bold">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-bold">Institution/Company</label>
                          <input
                            type="text"
                            name="institution"
                            className="form-control"
                            value={formData.institution}
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-bold">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            className="form-control"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <label className="form-label fw-bold">Subject *</label>
                        <select
                          name="subject"
                          className="form-select"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Pricing Information">Pricing Information</option>
                          <option value="Technical Support">Technical Support</option>
                          <option value="Customization Request">Customization Request</option>
                          <option value="Partnership Inquiry">Partnership Inquiry</option>
                          <option value="Demo Request">Demo Request</option>
                        </select>
                      </div>
                      
                      <div className="mb-4">
                        <label className="form-label fw-bold">Message *</label>
                        <textarea
                          name="message"
                          className="form-control"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder="Tell us about your requirements, questions, or schedule a consultation..."
                        ></textarea>
                      </div>
                      
                      {error && (
                        <div className="alert alert-danger mb-4">
                          <i className="bi bi-exclamation-triangle me-2"></i>
                          {error}
                        </div>
                      )}
                      
                      <div className="d-grid">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg py-3"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                              Sending Message...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-send me-2"></i>
                              Send Message
                            </>
                          )}
                        </button>
                      </div>
                      
                      <div className="text-center mt-3">
                        <small className="text-muted">
                          <i className="bi bi-shield-check me-1"></i>
                          Your information is secure and will not be shared
                        </small>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="col-lg-5">
              <div className="sticky-top" style={{ top: '20px' }}>
                {/* Company Info */}
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-body">
                    <h5 className="text-primary mb-4">
                      <i className="bi bi-building me-2"></i>
                      JavaNet ICT Solutions Ltd
                    </h5>
                    <div className="mb-4">
                      <div className="d-flex align-items-start mb-3">
                        <div className="bg-primary text-white rounded-circle p-2 me-3">
                          <i className="bi bi-geo-alt"></i>
                        </div>
                        <div>
                          <h6 className="mb-1">Headquarters</h6>
                          <p className="text-muted mb-0">
                            Plot 544, House 26, T.O.S Benson Crescent<br />
                            Abuja, Nigeria<br />
                            <small>With support across Africa</small>
                          </p>
                        </div>
                      </div>
                      
                      <div className="d-flex align-items-start mb-3">
                        <div className="bg-success text-white rounded-circle p-2 me-3">
                          <i className="bi bi-envelope"></i>
                        </div>
                        <div>
                          <h6 className="mb-1">Email Address</h6>
                          <p className="text-muted mb-0">
                            info@javanetict.com<br />
                            sales@javanetict.com
                          </p>
                        </div>
                      </div>
                      
                      <div className="d-flex align-items-start mb-3">
                        <div className="bg-warning text-white rounded-circle p-2 me-3">
                          <i className="bi bi-telephone"></i>
                        </div>
                        <div>
                          <h6 className="mb-1">Phone Numbers</h6>
                          <p className="text-muted mb-0">
                            +234 703 067 3089<br />
                            +234 906 000 0000
                          </p>
                        </div>
                      </div>
                      
                      <div className="d-flex align-items-start">
                        <div className="bg-info text-white rounded-circle p-2 me-3">
                          <i className="bi bi-clock"></i>
                        </div>
                        <div>
                          <h6 className="mb-1">Business Hours</h6>
                          <p className="text-muted mb-0">
                            Monday - Friday: 8:00 AM - 6:00 PM<br />
                            Saturday: 9:00 AM - 2:00 PM<br />
                            24/7 Technical Support Available
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-body">
                    <h5 className="text-primary mb-4">Quick Actions</h5>
                    <div className="d-grid gap-2">
                      <Link href="/proposal" className="btn btn-primary">
                        <i className="bi bi-file-text me-2"></i>
                        Generate Proposal
                      </Link>
                      <Link href="/demo" className="btn btn-success">
                        <i className="bi bi-play-circle me-2"></i>
                        Try Platform Demo
                      </Link>
                      <a 
                        href="https://www.ischool.ng/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary"
                      >
                        <i className="bi bi-box-arrow-up-right me-2"></i>
                        Visit Live Demo Site
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Social Media */}
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="text-primary mb-4">Connect With Us</h5>
                    <div className="d-flex justify-content-center gap-3">
                      <a href="https://facebook.com/javanetict" className="text-primary fs-4">
                        <i className="bi bi-facebook"></i>
                      </a>
                      <a href="https://www.linkedin.com/in/peterson-ginta-ba113bbb" className="text-primary fs-4">
                        <i className="bi bi-linkedin"></i>
                      </a>
                      <a href="https://instagram.com/javanet_ict" className="text-danger fs-4">
                        <i className="bi bi-instagram"></i>
                      </a>
                      <a href="https://wa.me/2347030673089?text=Hello%20JavaNet%20ICT%20Solutions%2C%20I%20need%20technical%20support." className="text-success fs-4">
                        <i className="bi bi-whatsapp"></i>
                      </a>
                    </div>
                    <div className="text-center mt-3">
                      <small className="text-muted">
                        Follow us for updates, tips, and announcements
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

  

      {/* Support Channels */}
<section className="section">
  <div className="container">
    <div className="section-title">
      <h2>Multiple Support Channels</h2>
      <p className="text-muted">Choose how you want to connect with us</p>
    </div>
    
    <div className="row">
      <div className="col-md-4 mb-4">
        <div className="card border-0 shadow-sm h-100 text-center">
          <div className="card-body p-4">
            <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                 style={{ width: '80px', height: '80px' }}>
              <i className="bi bi-headset fs-2"></i>
            </div>
            <h5 className="text-primary mb-3">Technical Support</h5>
            <p className="text-muted mb-3">
              Quick responses via WhatsApp
            </p>
            <a 
              href="https://wa.me/2347030673089?text=Hello%20JavaNet%20ICT%20Solutions%2C%20I%20need%20technical%20support." 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-outline-primary"
            >
              <i className="bi bi-whatsapp me-2"></i>
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
      
      <div className="col-md-4 mb-4">
        <div className="card border-0 shadow-sm h-100 text-center">
          <div className="card-body p-4">
            <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                 style={{ width: '80px', height: '80px' }}>
              <i className="bi bi-chat-dots fs-2"></i>
            </div>
            <h5 className="text-success mb-3">Live Chat</h5>
            <p className="text-muted mb-3">
              Instant chat support during business hours
            </p>
            <button 
              className="btn btn-outline-success" 
              onClick={openChatbot}
            >
              <i className="bi bi-chat-left me-2"></i>
              Start Live Chat
            </button>
          </div>
        </div>
      </div>
      
      <div className="col-md-4 mb-4">
        <div className="card border-0 shadow-sm h-100 text-center">
          <div className="card-body p-4">
            <div className="bg-warning text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                 style={{ width: '80px', height: '80px' }}>
              <i className="bi bi-envelope fs-2"></i>
            </div>
            <h5 className="text-warning mb-3">Email Support</h5>
            <p className="text-muted mb-3">
              Detailed inquiries via email
            </p>
            <a href="mailto:support@javanetict.com" className="btn btn-outline-warning">
              <i className="bi bi-envelope me-2"></i>
              Email Support
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  );
};

export default ContactPage;