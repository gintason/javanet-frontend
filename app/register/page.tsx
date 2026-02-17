'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { COUNTRIES } from '@/utils/constants';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    company: '',
    country: 'Nigeria',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  
  const { register, loading, error } = useAuthContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.password2) {
      alert('Passwords do not match');
      return;
    }
    
    try {
      await register(formData);
      router.push('/');
    } catch (err) {
      // Error is handled by the auth context
    }
  };

  return (
    <div className="container py-5 mt-5 pt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">
          <div className="card border-0 shadow-lg">
            <div className="card-header text-white text-center py-4 " style={{ backgroundColor: '#1A237E' }}>
              <h4 className="mb-0">
                <i className="bi bi-person-plus me-2"></i>
                Create Account
              </h4>
              <p className="mb-0 small">Join JavaNet EdTech Suite platform</p>
            </div>
            
            <div className="card-body p-4 p-md-5">
              {error && (
                <div className="alert alert-danger">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Personal Information */}
                  <div className="col-md-6">
                    <h5 className="text-primary mb-4">
                      <i className="bi bi-person me-2"></i>
                      Personal Information
                    </h5>
                    
                    <div className="mb-3">
                      <label className="form-label fw-bold">First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        className="form-control"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label fw-bold">Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        className="form-control"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label fw-bold">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <small className="text-muted">This will be your login email</small>
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label fw-bold">Username *</label>
                      <input
                        type="text"
                        name="username"
                        className="form-control"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Account & Organization */}
                  <div className="col-md-6">
                    <h5 className="text-primary mb-4">
                      <i className="bi bi-building me-2"></i>
                      Organization Details
                    </h5>
                    
                    <div className="mb-3">
                      <label className="form-label fw-bold">Institution/Company</label>
                      <input
                        type="text"
                        name="company"
                        className="form-control"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label fw-bold">Country *</label>
                      <select
                        name="country"
                        className="form-select"
                        value={formData.country}
                        onChange={handleChange}
                        required
                      >
                        {COUNTRIES.map(country => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label fw-bold">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    
                    {/* Passwords */}
                    <div className="mb-3">
                      <label className="form-label fw-bold">Password *</label>
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className="form-control"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          minLength={6}
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                        </button>
                      </div>
                      <small className="text-muted">Minimum 6 characters</small>
                    </div>
                    
                    <div className="mb-4">
                      <label className="form-label fw-bold">Confirm Password *</label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password2"
                        className="form-control"
                        value={formData.password2}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="terms"
                      required
                    />
                    <label className="form-check-label" htmlFor="terms">
                      I agree to the{' '}
                      <Link href="/terms" className="text-primary">
                        Terms of Service
                      </Link>
                      {' '}and{' '}
                      <Link href="/privacy" className="text-primary">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg py-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-person-plus me-2"></i>
                        Create Account
                      </>
                    )}
                  </button>
                </div>
                
                {/* Login Link */}
                <div className="text-center mt-4">
                  <p className="text-muted mb-0">
                    Already have an account?{' '}
                    <Link href="/login" className="text-primary fw-bold">
                      Login here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="row mt-5">
            <div className="col-md-4 mb-3">
              <div className="card border-0 bg-light h-100">
                <div className="card-body text-center">
                  <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                       style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-file-text fs-4"></i>
                  </div>
                  <h6>Save Proposals</h6>
                  <p className="small text-muted mb-0">
                    Generate and save unlimited custom proposals
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-3">
              <div className="card border-0 bg-light h-100">
                <div className="card-body text-center">
                  <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                       style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-chat-dots fs-4"></i>
                  </div>
                  <h6>AI Assistant</h6>
                  <p className="small text-muted mb-0">
                    24/7 access to JN Assistant for support
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-3">
              <div className="card border-0 bg-light h-100">
                <div className="card-body text-center">
                  <div className="bg-warning text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                       style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-graph-up fs-4"></i>
                  </div>
                  <h6>Track Progress</h6>
                  <p className="small text-muted mb-0">
                    Monitor your proposal status and communications
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;