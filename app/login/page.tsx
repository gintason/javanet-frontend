// app/login/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [redirectPath, setRedirectPath] = useState('/');
  
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const { login, loading, error, user } = useAuthContext();

  // Get redirect URL from query params on component mount
  useEffect(() => {
    const redirect = searchParams.get('redirect');
    if (redirect) {
      setRedirectPath(redirect);
    }
  }, [searchParams]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push(redirectPath);
    }
  }, [user, redirectPath, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      // No need to call router.push here - the useEffect above will handle it
    } catch (err) {
      // Error is handled by the auth context
      console.error('Login error:', err);
    }
  };

  // If already logged in, show loading while redirecting
  if (user) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Redirecting you to {redirectPath}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5 mt-5 pt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          {/* Login Card */}
          <div className="card border-0 shadow-lg">
             <div className="card-header text-white text-center py-4 " style={{ backgroundColor: '#1A237E' }}>
              <h4 className="mb-0">
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Welcome Back
              </h4>
              <p className="mb-0 small">Login to your JavaNet EdTech account</p>
            </div>
            
            <div className="card-body p-4 p-md-5">
              {/* Show redirect info if coming from protected page */}
              {redirectPath !== '/' && (
                <div className="alert alert-info mb-4">
                  <i className="bi bi-info-circle me-2"></i>
                  Please login to access the requested page
                </div>
              )}

              {/* Error Alert */}
              {error && (
                <div className="alert alert-danger">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Email Input */}
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    <i className="bi bi-envelope me-2"></i>
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                {/* Password Input */}
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    <i className="bi bi-lock me-2"></i>
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      id="rememberMe"
                      disabled={loading}
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  
                  {/* FORGOT PASSWORD LINK - Added exactly as requested */}
                  <Link 
                    href={email ? `/forgot-password?email=${encodeURIComponent(email)}` : '/forgot-password'} 
                    className="text-decoration-none"
                  >
                    <i className="bi bi-key me-1"></i>
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <div className="d-grid mb-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg py-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Logging in...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Login to Account
                      </>
                    )}
                  </button>
                </div>

                {/* Divider */}
                <div className="position-relative text-center mb-4">
                  <hr />
                  <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">
                    OR
                  </span>
                </div>

                {/* Alternative Actions */}
                <div className="text-center">
                  <p className="text-muted mb-3">
                    Don't have an account?
                    <Link href={`/register${redirectPath !== '/' ? `?redirect=${encodeURIComponent(redirectPath)}` : ''}`} 
                          className="text-primary fw-bold ms-2">
                      Create Account
                    </Link>
                  </p>
                  
                  <Link href="/" className="btn btn-outline-secondary">
                    <i className="bi bi-house me-2"></i>
                    Back to Home
                  </Link>
                </div>
              </form>
            </div>

            {/* Demo Account Info */}
            <div className="card-footer bg-light text-center py-3">
              <p className="small text-muted mb-0">
                <i className="bi bi-info-circle me-1"></i>
                Demo account: demo@javanet.com / password
              </p>
            </div>
          </div>

          {/* Features List */}
          <div className="mt-5">
            <h5 className="text-center mb-4">Why Create an Account?</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <div className="bg-primary text-white rounded-circle p-2 me-3">
                    <i className="bi bi-file-text"></i>
                  </div>
                  <div>
                    <h6 className="mb-1">Save Proposals</h6>
                    <small className="text-muted">Access your custom proposals anytime</small>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <div className="bg-success text-white rounded-circle p-2 me-3">
                    <i className="bi bi-chat-dots"></i>
                  </div>
                  <div>
                    <h6 className="mb-1">Chat History</h6>
                    <small className="text-muted">Continue conversations with JN Assistant</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;