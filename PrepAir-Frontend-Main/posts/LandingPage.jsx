import React from 'react';
import './userlogin.css';

const LandingPage = () => {
  return (
    <div className="signup-layout">
      <div className="signup-image-section">
        <img
          src="/image.png"
          alt="Welcome"
          className="signup-image"
        />
      </div>
      <div className="signup-form-section">
        <div className="signup-form">
          <h2 className="form-title">Welcome</h2>

          <div className="form-group">
            <button type="button" className="submit-btn" onClick={() => alert('Navigate to Login Page')}>
              Login
            </button>
          </div>

          <div className="form-group">
            <button type="button" className="submit-btn" onClick={() => alert('Navigate to Signup Page')}>
              New User Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;