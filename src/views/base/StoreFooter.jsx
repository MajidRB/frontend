import React from "react";

function StoreFooter() {
    return (
        <div>
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-column">
                        <h4>About Us</h4>
                        <ul>
                            <li>
                                <a href="/about">Who we are</a>
                            </li>
                            <li>
                                <a href="/team">Our Team</a>
                            </li>
                            <li>
                                <a href="/careers">Careers</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>Help</h4>
                        <ul>
                            <li>
                                <a href="/faq">FAQ</a>
                            </li>
                            <li>
                                <a href="/support">Support</a>
                            </li>
                            <li>
                                <a href="/contact">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>Legal</h4>
                        <ul>
                            <li>
                                <a href="/terms">Terms of Service</a>
                            </li>
                            <li>
                                <a href="/privacy">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="/cookie-policy">Cookie Policy</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>Follow Us</h4>
                        <div className="social-links">
                            <a href="https://facebook.com" target="_blank" rel="noreferrer">
                                Facebook
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer">
                                Twitter
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer">
                                Instagram
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>
                        &copy; {new Date().getFullYear()} Your Store Name. All rights
                        reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default StoreFooter;
