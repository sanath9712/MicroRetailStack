import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import '../css/Header.css'; // Adjust the path if necessary

function Header() {
    // Accessing the user context
    const { user } = useContext(UserContext);

    return (
        <header className="header">
            <h1>EcoFusionMart Eco-Commerce</h1>
            {/* Displaying the username if the user is logged in */}
            {user && (
                <div className="user-info">
                    Welcome, {user.username}
                </div>
            )}
            {/* Other header content */}
        </header>
    );
}

export default Header;
