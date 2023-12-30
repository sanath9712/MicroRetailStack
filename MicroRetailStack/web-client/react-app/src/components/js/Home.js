import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="main-content">
            <div className="buttons-container">
                <Link to="/login"><button className="btn">Login</button></Link>
                <Link to="/signup"><button className="btn">Sign Up</button></Link>
            </div>
        </div>
    );
}

export default Home;
