import React from "react";
import {Link } from "react-router-dom"
import ContactPopup from "./contact";

const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <section className="section-padding bg-white border-top">
        <div className="container" style={{maxWidth: "100%"}}>
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="feature-box">
                <i className="mdi mdi-truck-fast" />
                <h6>Free &amp; Next Day Delivery</h6>
                <p>Lorem ipsum dolor sit amet, cons...</p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="feature-box">
                <i className="mdi mdi-basket" />
                <h6>100% Satisfaction Guarantee</h6>
                <p>Rorem Ipsum Dolor sit amet, cons...</p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="feature-box">
                <i className="mdi mdi-tag-heart" />
                <h6>Great Daily Deals Discount</h6>
                <p>Sorem Ipsum Dolor sit amet, Cons...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding footer bg-white border-top">
        <div className="container" style={{maxWidth: "100%"}}>
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <h4 className="mb-5 mt-0">
                <a className="logo" href="index.html">
                  <img style={{width: 50}} src="https://res.cloudinary.com/cockbook/image/upload/v1692940937/single/z4632199152859_dad394451a5b88ca2fcee448e0dee6f8_vh4w0p.jpg" alt="Shop boutique" />
                </a>
              </h4>
              <p className="mb-0">
                <a className="text-dark" href="#">
                  <i className="mdi mdi-phone" /> +61 525 240 310
                </a>
              </p>
              <p className="mb-0">
                <a className="text-dark" href="#">
                  <i className="mdi mdi-cellphone-iphone" /> 12345 67890,
                  56847-98562
                </a>
              </p>
            </div>

            <div className="col-lg-2 col-md-2">
              <h6 className="mb-4">ABOUT US</h6>
              <ul>
                <li style={{padding: 10}}>
                  <a href="#">Company Information</a>
                </li>
                <li style={{padding: 10}}>
                  <a href="#">Careers</a>
                </li>
                <li style={{padding: 10}}>
                  <a href="#">Store Location</a>
                </li>
                <li style={{padding: 10}}>
                  <a href="#">Affillate Program</a>
                </li>
                <li style={{padding: 10}}>
                  <a href="#">Copyright</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-2">
              <h6 className="mb-4">Contact</h6>
              <ul>
                <li>
                  <ContactPopup />
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-3">
              <h6 className="mb-4">Download App</h6>
              <div className="app">
                <a href="#">
                  <img src="https://yt3.googleusercontent.com/UlCw6skRB67meHd_jffAzV6DeXzAk1YzEFyhxI4meSgYAjA0wRhEnhT3TfHvuo7R-VwISzRTTao=s900-c-k-c0x00ffffff-no-rj" alt />
                </a>
                <a href="#">
                  <img src="https://www.apple.com/v/app-store/b/images/overview/icon_appstore__ev0z770zyxoy_large_2x.png" alt />
                </a>
              </div>
              <h6 className="mb-3 mt-4">GET IN TOUCH</h6>
              <div className="footer-social">
                <a className="btn-facebook" href="#" style={{marginLeft: 12}}>
                  <i className="mdi mdi-facebook" />
                </a>
                <a className="btn-twitter" href="#" style={{marginLeft: 12}}>
                  <i className="mdi mdi-twitter" />
                </a>
                <a className="btn-instagram" href="#" style={{marginLeft: 12}}>
                  <i className="mdi mdi-instagram" />
                </a>
                <a className="btn-whatsapp" href="#" style={{marginLeft: 12}}>
                  <i className="mdi mdi-whatsapp" />
                </a>
                <a className="btn-messenger" href="#" style={{marginLeft: 12}}>
                  <i className="mdi mdi-facebook-messenger" />
                </a>
                <a className="btn-google" href="#" style={{marginLeft: 12}}>
                  <i className="mdi mdi-google" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Footer */}
      {/* Copyright */}
      <section className="pt-4 pb-4 footer-bottom">
        <div className="container" style={{maxWidth: "100%"}}>
          <div className="row no-gutters">
            <div className="col-lg-6 col-sm-6">
              <p className="mt-1 mb-0">
                © {new Date().getFullYear()}{" "}
                <strong className="text-dark"></strong>. All Rights Reserved
                <br />
                <small className="mt-0 mb-0">
                  Made with <i className="mdi mdi-heart text-danger" /> by 
                </small>
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* End Copyright */}
    </div>
  );
};

export default Footer;
