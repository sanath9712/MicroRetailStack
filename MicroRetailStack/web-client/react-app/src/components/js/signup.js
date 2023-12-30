import React, { useState } from 'react';
import '../css/signup.css'; // Import the CSS file here
import '../css/globalStyles.css';

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [isError, setIsError] = useState(false); // New state to track if the message is an error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:3000/api/users/register';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.status === 201) {
                setIsError(false); // Not an error
                setPopupMessage('Success: ' + data.message);
                setShowPopup(true);
            } else {
                setIsError(true); // It's an error
                setPopupMessage('Error: ' + data.message);
                setShowPopup(true);
            }
        } catch (error) {
            setPopupMessage('Error: ' + error.toString());
            setShowPopup(true);
        }
    };

    const hidePopup = () => setShowPopup(false);

    return (
        <div>
            <h2>Sign Up</h2>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <button type="submit" className="btn">Sign Up</button>
            </form>
            {showPopup && (
                <div className="popup">
                    <p style={{ color: isError ? 'red' : 'inherit' }}>{popupMessage}</p>
                    <button onClick={hidePopup}>Close</button>
                </div>
            )}
        </div>
    );
}

export default SignUp;
