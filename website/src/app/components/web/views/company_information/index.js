// CompanyInformation.js

import React from 'react';

const CompanyInformation = () => {
  return (
    <div className="company-information">
      <section className="hero-section">
        <div className="container">
          <h1>Welcome to Our Company</h1>
          <p>
            We are a leading company dedicated to providing high-quality products and services.
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <h2>About Us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at massa non erat scelerisque maximus.
            Suspendisse sit amet augue arcu. Fusce at eros in nulla tincidunt ultrices. Integer tincidunt, justo a
            aliquam fermentum, nisl turpis commodo felis, at vulputate turpis lacus in dolor. Sed posuere nisi ac
            ligula scelerisque, eget convallis ex bibendum. Pellentesque habitant morbi tristique senectus et netus et
            malesuada fames ac turpis egestas. Integer finibus sapien nec libero ullamcorper condimentum. Phasellus
            quis ex sit amet eros fermentum pulvinar.
          </p>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-list">
            <div className="service-item">
              <h3>Product Development</h3>
              <p>We specialize in developing innovative and user-friendly products.</p>
            </div>
            <div className="service-item">
              <h3>Customer Support</h3>
              <p>Our dedicated support team is available 24/7 to assist our customers.</p>
            </div>
            <div className="service-item">
              <h3>Quality Assurance</h3>
              <p>We ensure the highest quality standards in all our products and services.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <h2>Contact Us</h2>
          <p>
            If you have any questions or inquiries, feel free to contact us using the information below.
          </p>
          <div className="contact-info">
            <p><strong>Email:</strong> info@example.com</p>
            <p><strong>Phone:</strong> +123 456 7890</p>
            <p><strong>Address:</strong> 123 Company St, City, Country</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyInformation;
