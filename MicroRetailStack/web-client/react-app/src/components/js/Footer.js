import React from 'react';
import '../css/Footer.css'; // Create and import footer styles

function Footer() {
    return (
        <footer className="footer">
            <p>© {new Date().getFullYear()} EcoFusionMart</p>
            <p>Where you can buy imaginary products with imaginary money :)</p>
        </footer>
    );
}

export default Footer;