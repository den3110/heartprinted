import React from 'react';

const SignUpSuccess = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center" style={{marginTop: 120}}>
              <h2 className="card-title">Sign Up Successful!</h2>
              <p className="card-text">Thank you for registering. Your account has been created successfully.</p>
              <p className="card-text">You can now log in to your account using your email and password.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpSuccess;
