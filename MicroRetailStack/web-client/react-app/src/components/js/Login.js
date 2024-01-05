import React, { useContext, useState } from 'react'; // import useState
import { useNavigate } from 'react-router-dom'; // import useNavigate
import '../css/signup.css';
import '../css/globalStyles.css';
import { UserContext } from '../../contexts/UserContext';


function Login() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate(); // create navigate instance
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:3000/api/users/login';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                setIsError(false);
                setPopupMessage('Success: ' + data.message);
                setShowPopup(true);

                // Set user context and redirect to home page
                setUser({ username: 'Logged In User' }); // Update with actual user data
                navigate('/'); // Redirect to the homepage
            } else {
                setIsError(true);
                setPopupMessage('Error: ' + data.message);
                setShowPopup(true);
            }
        } catch (error) {
            setIsError(true);
            setPopupMessage('Error: ' + error.toString());
            setShowPopup(true);
        }
    };

    const hidePopup = () => setShowPopup(false);

    return (
        <div>
            <h2>Login</h2>
            <form className="sign-up-form" onSubmit={handleSubmit}>
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
                <button type="submit" className="btn">Login</button>
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

export default Login;
