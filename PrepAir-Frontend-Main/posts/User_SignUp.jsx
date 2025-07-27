import React, { useState } from 'react';
import './usersignup.css';
import config from '../manifest/config.json';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [apiStatus, setApiStatus] = useState({ success: null, message: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setApiStatus({ success: null, message: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setApiStatus({ success: null, message: '' });
    try {
      const response = await fetch(
        config.config_data["user-auth-routes"]["user-signup"],
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        setApiStatus({ success: true, message: 'Sign up successful!' });
        setFormData({ username: '', email: '', password: '' });
      } else {
        const data = await response.json();
        setApiStatus({ success: false, message: data.message || 'Sign up failed.' });
      }
    } catch (error) {
      setApiStatus({ success: false, message: 'Network error. Please try again.' });
    }
  };

  return (
    <div className="signup-layout">
      <div className="signup-image-section">
        <img
          src="/signup_image.png"
          alt="Profile"
          className="signup-image"
        />
      </div>
      <div className="signup-form-section">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Sign Up</h2>

          <div className="form-group">
            <label>Username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <RiEyeOffFill size={22} /> : <RiEyeFill size={22} />}
              </button>
            </div>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <button type="submit" className="submit-btn">
            Create Account
          </button>
          {apiStatus.message && (
            <div className={apiStatus.success ? 'signup-success' : 'error'} style={{marginTop: '1rem', textAlign: 'center'}}>
              {apiStatus.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
