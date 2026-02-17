// app/reset-password/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { authApi } from '@/utils/api';
import { PASSWORD_RULES } from '@/utils/constants';

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [uid, setUid] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Extract uid and token from URL on mount
  useEffect(() => {
    const uidParam = searchParams.get('uid');
    const tokenParam = searchParams.get('token');
    
    if (uidParam && tokenParam) {
      setUid(uidParam);
      setToken(tokenParam);
      verifyToken(uidParam, tokenParam);
    } else {
      setError('Invalid password reset link. Missing required parameters.');
      setVerifying(false);
      setIsValidToken(false);
    }
  }, [searchParams]);

  // Verify if the token is valid
  const verifyToken = async (uid: string, token: string) => {
    setVerifying(true);
    setError(null);
    
    try {
      await authApi.verifyResetToken(uid, token);
      setIsValidToken(true);
      setError(null);
    } catch (err: any) {
      console.error('Token verification failed:', err);
      setIsValidToken(false);
      setError(err.message || 'Invalid or expired reset link. Please request a new one.');
    } finally {
      setVerifying(false);
    }
  };

  const validateForm = (): boolean => {
    if (newPassword.length < PASSWORD_RULES.MIN_LENGTH) {
      setError(`Password must be at least ${PASSWORD_RULES.MIN_LENGTH} characters`);
      return false;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uid || !token) {
      setError('Missing reset information. Please request a new reset link.');
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      await authApi.resetPassword(uid, token, newPassword);
      
      setSuccess('Password reset successful! Redirecting to login...');
      
      // Clear form
      setNewPassword('');
      setConfirmPassword('');
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login?reset=success');
      }, 3000);
      
    } catch (err: any) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (verifying) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Verifying...</span>
          </div>
          <p className="mt-3 text-muted">Verifying your reset link...</p>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (!isValidToken) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="card border-0 shadow-lg">
                <div className="card-header bg-danger text-white text-center py-4">
                  <h4 className="mb-0">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    Invalid Reset Link
                  </h4>
                </div>
                <div className="card-body p-4 p-md-5 text-center">
                  <div className="mb-4">
                    <i className="bi bi-shield-lock text-danger" style={{ fontSize: '4rem' }}></i>
                  </div>
                  <h5 className="mb-3">This password reset link is invalid or has expired.</h5>
                  <p className="text-muted mb-4">
                    {error || 'Password reset links expire after 24 hours for security reasons.'}
                  </p>
                  <Link href="/forgot-password" className="btn btn-primary btn-lg">
                    <i className="bi bi-arrow-repeat me-2"></i>
                    Request New Reset Link
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Valid token - show reset password form
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            {/* Reset Password Card */}
            <div className="card border-0 shadow-lg">
              <div className="card-header text-white text-center py-4" style={{ backgroundColor: '#1A237E' }}>
                <h4 className="mb-0">
                  <i className="bi bi-shield-lock me-2"></i>
                  Reset Your Password
                </h4>
                <p className="mb-0 small">Enter your new password below</p>
              </div>
              
              <div className="card-body p-4 p-md-5">
                {/* Error Alert */}
                {error && (
                  <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    <div>{error}</div>
                  </div>
                )}
                
                {/* Success Alert */}
                {success && (
                  <div className="alert alert-success d-flex align-items-center" role="alert">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    <div>{success}</div>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* New Password */}
                  <div className="mb-4">
                    <label htmlFor="newPassword" className="form-label fw-bold">
                      <i className="bi bi-lock me-2"></i>
                      New Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-key"></i>
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control form-control-lg"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        required
                        disabled={loading || success !== null}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading || success !== null}
                      >
                        <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                      </button>
                    </div>
                    <small className="text-muted">
                      Minimum {PASSWORD_RULES.MIN_LENGTH} characters
                    </small>
                  </div>

                  {/* Password Strength Indicator */}
                  {newPassword && (
                    <div className="mb-3">
                      <div className="d-flex align-items-center gap-2">
                        <span className="text-muted small">Password strength:</span>
                        <div className="flex-grow-1" style={{ maxWidth: '200px' }}>
                          <div className="progress" style={{ height: '8px' }}>
                            <div 
                              className={`progress-bar ${
                                newPassword.length < PASSWORD_RULES.MIN_LENGTH
                                  ? 'bg-danger'
                                  : newPassword.length < 10
                                  ? 'bg-warning'
                                  : 'bg-success'
                              }`}
                              style={{ 
                                width: `${
                                  newPassword.length < PASSWORD_RULES.MIN_LENGTH
                                    ? 33
                                    : newPassword.length < 10
                                    ? 66
                                    : 100
                                }%` 
                              }}
                              role="progressbar"
                            ></div>
                          </div>
                        </div>
                        <span className="small">
                          {newPassword.length < PASSWORD_RULES.MIN_LENGTH
                            ? 'Weak'
                            : newPassword.length < 10
                            ? 'Good'
                            : 'Strong'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Confirm Password */}
                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label fw-bold">
                      <i className="bi bi-check-circle me-2"></i>
                      Confirm New Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-check2-circle"></i>
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control form-control-lg"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        required
                        disabled={loading || success !== null}
                      />
                    </div>
                    
                    {/* Password Match Indicator */}
                    {confirmPassword && (
                      <div className="mt-1">
                        {newPassword === confirmPassword ? (
                          <small className="text-success">
                            <i className="bi bi-check-circle-fill me-1"></i>
                            Passwords match
                          </small>
                        ) : (
                          <small className="text-danger">
                            <i className="bi bi-exclamation-circle-fill me-1"></i>
                            Passwords do not match
                          </small>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg py-3"
                      disabled={loading || success !== null}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Resetting Password...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check-circle me-2"></i>
                          Reset Password
                        </>
                      )}
                    </button>
                  </div>

                  {/* Back to Login */}
                  <div className="text-center">
                    <Link href="/login" className="text-decoration-none">
                      <i className="bi bi-arrow-left me-1"></i>
                      Back to Login
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;