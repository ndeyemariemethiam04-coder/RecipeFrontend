import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p className="copyright">&copy; {new Date().getFullYear()} ChipiFoodBlog. All rights reserved.</p>
                <p className="author">Designed by <span className="author-name">Ndeye Mariem Thiam</span></p>
            </div>
        </footer>
    );
};

export default Footer;
