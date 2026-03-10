import React from "react";
import "./footer.css";

function Footer() {
    return (
        <footer className="footer pt-5">
            <div className="container">
                <div className="row g-4">
                    {/* Company Info */}
                    <div className="col-lg-4 col-md-6">
                        <h3 className="footer-title">About Company</h3>
                        <p className="mb-4">We're dedicated to delivering innovative solutions that empower businesses to thrive in the digital age.</p>
                        <div className="social-links mb-4">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
                            <a href="#"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-lg-2 col-md-6">
                        <h3 className="footer-title">Quick Links</h3>
                        <ul className="footer-links">
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Products</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="col-lg-2 col-md-6">
                        <h3 className="footer-title">Support</h3>
                        <ul className="footer-links">
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Community</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Cookie Policy</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-lg-4 col-md-6">
                        <h3 className="footer-title">Newsletter</h3>
                        <p className="mb-4">Subscribe to our newsletter for updates, news, and exclusive offers.</p>
                        <form className="mb-4">
                            <div className="input-group">
                                <input type="email" className="form-control newsletter-input" placeholder="Enter your email" />
                                <button className="btn btn-subscribe text-white" type="submit">Subscribe</button>
                            </div>
                        </form>
                        <p className="small">By subscribing, you agree to our Privacy Policy and consent to receive updates.</p>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom mt-5">
                <div className="container">
                    <div className="row py-3">
                        <div className="col-md-6 text-center text-md-start">
                            <p className="mb-0">&copy; 2024 Your Company. All rights reserved.</p>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <p className="mb-0">Designed with <i className="fas fa-heart text-danger"></i> by <a href="#">YourBrand</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </footer >
    );
}

export default Footer;