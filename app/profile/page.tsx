// app/profile/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import api from '@/utils/api';
import { API_ENDPOINTS, COUNTRIES, CURRENCIES, PASSWORD_RULES } from '@/utils/constants';
import { userApi } from '@/utils/api';

const ProfilePage = () => {
  const { user, loading: authLoading, logout } = useAuthContext();
  const router = useRouter();
  
  // State for profile data
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    company: '',
    country: 'Nigeria',
    currency: 'NGN',
    phone: '',
  });

  // Password change state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  // Fetch profile data
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/profile');
      return;
    }

    if (user) {
      fetchProfile();
    }
  }, [user, authLoading, router]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get(API_ENDPOINTS.PROFILE);
      setProfile(response.data);
      
      // Initialize form with user data
      setFormData({
        first_name: response.data.first_name || '',
        last_name: response.data.last_name || '',
        company: response.data.company || '',
        country: response.data.country || 'Nigeria',
        currency: response.data.currency || 'NGN',
        phone: response.data.phone || '',
      });
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await api.patch(API_ENDPOINTS.PROFILE, formData);
      setProfile(response.data);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  // Password change handlers
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    setPasswordError('');
    setPasswordSuccess('');
  };

  const toggleShowPassword = (field: 'old' | 'new' | 'confirm') => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const validatePasswordForm = (): boolean => {
    // Check if passwords match
    if (passwordData.new_password !== passwordData.confirm_password) {
      setPasswordError('New passwords do not match');
      return false;
    }

    // Check password length
    if (passwordData.new_password.length < PASSWORD_RULES.MIN_LENGTH) {
      setPasswordError(`Password must be at least ${PASSWORD_RULES.MIN_LENGTH} characters`);
      return false;
    }

    // Check if old password is empty
    if (!passwordData.old_password.trim()) {
      setPasswordError('Current password is required');
      return false;
    }

    // Check if new password is same as old
    if (passwordData.old_password === passwordData.new_password) {
      setPasswordError('New password must be different from current password');
      return false;
    }

    return true;
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) {
      return;
    }

    setPasswordLoading(true);
    setPasswordError('');
    setPasswordSuccess('');

    try {
      await userApi.changePassword({
        old_password: passwordData.old_password,
        new_password: passwordData.new_password,
      });

      setPasswordSuccess('Password changed successfully!');
      
      // Clear password form
      setPasswordData({
        old_password: '',
        new_password: '',
        confirm_password: '',
      });

      // Close modal after 2 seconds
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordSuccess('');
      }, 2000);
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to change password. Please try again.');
    } finally {
      setPasswordLoading(false);
    }
  };

  const resetPasswordForm = () => {
    setPasswordData({
      old_password: '',
      new_password: '',
      confirm_password: '',
    });
    setPasswordError('');
    setPasswordSuccess('');
    setShowPassword({
      old: false,
      new: false,
      confirm: false,
    });
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    resetPasswordForm();
  };

  // Check authentication
  if (authLoading || loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="bg-light min-vh-100 py-5 mt-5 pt-5">
      <div className="container mt-3 pt-3">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-primary fw-bold mb-0">
            <i className="bi bi-person-circle me-2"></i>
            My Profile
          </h2>
          {!isEditing ? (
            <button
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
            >
              <i className="bi bi-pencil-square me-2"></i>
              Edit Profile
            </button>
          ) : (
            <button
              className="btn btn-secondary"
              onClick={() => {
                setIsEditing(false);
                // Reset form to original data
                setFormData({
                  first_name: profile.first_name || '',
                  last_name: profile.last_name || '',
                  company: profile.company || '',
                  country: profile.country || 'Nigeria',
                  currency: profile.currency || 'NGN',
                  phone: profile.phone || '',
                });
              }}
            >
              <i className="bi bi-x-circle me-2"></i>
              Cancel
            </button>
          )}
        </div>

        {/* Alerts */}
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
            <button type="button" className="btn-close" onClick={() => setError('')}></button>
          </div>
        )}
        
        {success && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <i className="bi bi-check-circle me-2"></i>
            {success}
            <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
          </div>
        )}

        {/* Main Content */}
        <div className="row g-4">
          {/* Left Column - Profile Summary */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center p-4">
                {/* Profile Picture Placeholder */}
                <div className="position-relative d-inline-block mb-4">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-4">
                    <i className="bi bi-person-circle display-1 text-primary"></i>
                  </div>
                </div>
                
                <h4 className="fw-bold mb-1">
                  {profile?.first_name || profile?.username || 'User'}
                  {profile?.last_name && ` ${profile.last_name}`}
                </h4>
                <p className="text-muted mb-3">{profile?.email}</p>
                
                <div className="d-grid gap-2">
                  <button 
                    className="btn btn-outline-primary"
                    onClick={() => {
                      resetPasswordForm();
                      setShowPasswordModal(true);
                    }}
                  >
                    <i className="bi bi-key me-2"></i>
                    Change Password
                  </button>
                  <button 
                    className="btn btn-outline-danger"
                    onClick={async () => {
                      if (confirm('Are you sure you want to logout?')) {
                        await logout();
                        router.push('/');
                      }
                    }}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                {isEditing ? (
                  /* Edit Mode */
                  <form onSubmit={handleSubmit}>
                    <h5 className="text-primary mb-4">
                      <i className="bi bi-pencil-square me-2"></i>
                      Edit Profile Information
                    </h5>
                    
                    <div className="row g-3">
                      {/* First Name */}
                      <div className="col-md-6">
                        <label className="form-label fw-bold">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleInputChange}
                          placeholder="Enter first name"
                        />
                      </div>
                      
                      {/* Last Name */}
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleInputChange}
                          placeholder="Enter last name"
                        />
                      </div>
                      
                      {/* Email (Read Only) */}
                      <div className="col-12">
                        <label className="form-label fw-bold">Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          value={profile?.email || ''}
                          disabled
                          readOnly
                        />
                        <small className="text-muted">Email cannot be changed</small>
                      </div>
                      
                      {/* Company */}
                      <div className="col-12">
                        <label className="form-label fw-bold">Company/Institution</label>
                        <input
                          type="text"
                          className="form-control"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Enter company name"
                        />
                      </div>
                      
                      {/* Phone */}
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Phone Number</label>
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter phone number"
                        />
                      </div>
                      
                      {/* Country */}
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Country</label>
                        <select
                          className="form-select"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                        >
                          {COUNTRIES.map(country => (
                            <option key={country} value={country}>{country}</option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Currency */}
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Preferred Currency</label>
                        <select
                          className="form-select"
                          name="currency"
                          value={formData.currency}
                          onChange={handleInputChange}
                        >
                          {CURRENCIES.map(currency => (
                            <option key={currency.code} value={currency.code}>
                              {currency.symbol} {currency.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <button type="submit" className="btn btn-primary">
                        <i className="bi bi-check-circle me-2"></i>
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  /* View Mode */
                  <>
                    <h5 className="text-primary mb-4">
                      <i className="bi bi-info-circle me-2"></i>
                      Profile Information
                    </h5>
                    
                    <div className="row g-4">
                      {/* Personal Info */}
                      <div className="col-md-6">
                        <div className="bg-light p-3 rounded">
                          <h6 className="text-primary mb-3">
                            <i className="bi bi-person me-2"></i>
                            Personal Details
                          </h6>
                          <table className="table table-sm table-borderless mb-0">
                            <tbody>
                              <tr>
                                <td className="text-muted">Username:</td>
                                <td className="fw-bold">{profile?.username || '—'}</td>
                              </tr>
                              <tr>
                                <td className="text-muted">First Name:</td>
                                <td>{profile?.first_name || '—'}</td>
                              </tr>
                              <tr>
                                <td className="text-muted">Last Name:</td>
                                <td>{profile?.last_name || '—'}</td>
                              </tr>
                              <tr>
                                <td className="text-muted">Email:</td>
                                <td>{profile?.email}</td>
                              </tr>
                              <tr>
                                <td className="text-muted">Phone:</td>
                                <td>{profile?.phone || '—'}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      {/* Organization Info */}
                      <div className="col-md-6">
                        <div className="bg-light p-3 rounded">
                          <h6 className="text-primary mb-3">
                            <i className="bi bi-building me-2"></i>
                            Organization
                          </h6>
                          <table className="table table-sm table-borderless mb-0">
                            <tbody>
                              <tr>
                                <td className="text-muted">Company:</td>
                                <td className="fw-bold">{profile?.company || '—'}</td>
                              </tr>
                              <tr>
                                <td className="text-muted">Country:</td>
                                <td>{profile?.country || 'Nigeria'}</td>
                              </tr>
                              <tr>
                                <td className="text-muted">Currency:</td>
                                <td>
                                  {profile?.currency === 'NGN' ? '₦ Naira' : 
                                   profile?.currency === 'USD' ? '$ US Dollar' : 
                                   profile?.currency || 'NGN'}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      {/* Account Info */}
                      <div className="col-12">
                        <div className="bg-light p-3 rounded">
                          <h6 className="text-primary mb-3">
                            <i className="bi bi-shield-check me-2"></i>
                            Account Information
                          </h6>
                          <table className="table table-sm table-borderless mb-0">
                            <tbody>
                              <tr>
                                <td className="text-muted">Account Type:</td>
                                <td>
                                  {profile?.is_client ? (
                                    <span className="badge bg-success">Client</span>
                                  ) : (
                                    <span className="badge bg-info">User</span>
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td className="text-muted">Member Since:</td>
                                <td>{new Date(profile?.date_joined).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div 
          className="modal fade show" 
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} 
          tabIndex={-1} 
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="bi bi-key me-2"></i>
                  Change Password
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={handleClosePasswordModal}
                  disabled={passwordLoading}
                ></button>
              </div>
              
              <form onSubmit={handlePasswordSubmit}>
                <div className="modal-body p-4">
                  {/* Password Error Alert */}
                  {passwordError && (
                    <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                      <i className="bi bi-exclamation-triangle-fill me-2"></i>
                      <div>{passwordError}</div>
                    </div>
                  )}
                  
                  {/* Password Success Alert */}
                  {passwordSuccess && (
                    <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
                      <i className="bi bi-check-circle-fill me-2"></i>
                      <div>{passwordSuccess}</div>
                    </div>
                  )}

                  {/* Current Password */}
                  <div className="mb-3">
                    <label htmlFor="old_password" className="form-label fw-bold">
                      Current Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-lock"></i>
                      </span>
                      <input
                        type={showPassword.old ? 'text' : 'password'}
                        className="form-control"
                        id="old_password"
                        name="old_password"
                        value={passwordData.old_password}
                        onChange={handlePasswordChange}
                        placeholder="Enter current password"
                        disabled={passwordLoading}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => toggleShowPassword('old')}
                        disabled={passwordLoading}
                      >
                        <i className={`bi bi-${showPassword.old ? 'eye-slash' : 'eye'}`}></i>
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="mb-3">
                    <label htmlFor="new_password" className="form-label fw-bold">
                      New Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-shield-lock"></i>
                      </span>
                      <input
                        type={showPassword.new ? 'text' : 'password'}
                        className="form-control"
                        id="new_password"
                        name="new_password"
                        value={passwordData.new_password}
                        onChange={handlePasswordChange}
                        placeholder="Enter new password"
                        disabled={passwordLoading}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => toggleShowPassword('new')}
                        disabled={passwordLoading}
                      >
                        <i className={`bi bi-${showPassword.new ? 'eye-slash' : 'eye'}`}></i>
                      </button>
                    </div>
                    <small className="text-muted">
                      Minimum {PASSWORD_RULES.MIN_LENGTH} characters
                    </small>
                  </div>

                  {/* Password Strength Indicator */}
                  {passwordData.new_password && (
                    <div className="mb-3">
                      <div className="d-flex align-items-center gap-2">
                        <span className="text-muted small">Password strength:</span>
                        <div className="flex-grow-1" style={{ maxWidth: '200px' }}>
                          <div className="progress" style={{ height: '8px' }}>
                            <div 
                              className={`progress-bar ${
                                passwordData.new_password.length < PASSWORD_RULES.MIN_LENGTH
                                  ? 'bg-danger'
                                  : passwordData.new_password.length < 10
                                  ? 'bg-warning'
                                  : 'bg-success'
                              }`}
                              style={{ 
                                width: `${
                                  passwordData.new_password.length < PASSWORD_RULES.MIN_LENGTH
                                    ? 33
                                    : passwordData.new_password.length < 10
                                    ? 66
                                    : 100
                                }%` 
                              }}
                              role="progressbar"
                            ></div>
                          </div>
                        </div>
                        <span className="small">
                          {passwordData.new_password.length < PASSWORD_RULES.MIN_LENGTH
                            ? 'Weak'
                            : passwordData.new_password.length < 10
                            ? 'Good'
                            : 'Strong'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Confirm New Password */}
                  <div className="mb-3">
                    <label htmlFor="confirm_password" className="form-label fw-bold">
                      Confirm New Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-check-circle"></i>
                      </span>
                      <input
                        type={showPassword.confirm ? 'text' : 'password'}
                        className="form-control"
                        id="confirm_password"
                        name="confirm_password"
                        value={passwordData.confirm_password}
                        onChange={handlePasswordChange}
                        placeholder="Confirm new password"
                        disabled={passwordLoading}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => toggleShowPassword('confirm')}
                        disabled={passwordLoading}
                      >
                        <i className={`bi bi-${showPassword.confirm ? 'eye-slash' : 'eye'}`}></i>
                      </button>
                    </div>
                    
                    {/* Password Match Indicator */}
                    {passwordData.confirm_password && (
                      <div className="mt-1">
                        {passwordData.new_password === passwordData.confirm_password ? (
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
                </div>
                
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleClosePasswordModal}
                    disabled={passwordLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={passwordLoading}
                  >
                    {passwordLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Changing...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Change Password
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;