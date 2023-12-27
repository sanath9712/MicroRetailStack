import React from 'react';
import '../css/Footer.css'; // Create and import footer styles

function Footer() {
    return (
        <footer className="footer">
            <p>© {new Date().getFullYear()} Eco-Commerce Site</p>
        </footer>
    );
}

export default Footer;
