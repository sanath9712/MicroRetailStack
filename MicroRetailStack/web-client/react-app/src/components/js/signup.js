import React, { useState } from 'react';
import '../css/signup.css'; // Import the CSS file here
import '../css/globalStyles.css';
function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:3000/api/users/register'; // Adjust with your backend server URL and port
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
                // Handle successful registration
                console.log('Success:', data.message);
                // Redirect to login page or show success message
            } else {
                // Handle errors
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
        </div>
    );
}

export default SignUp;
