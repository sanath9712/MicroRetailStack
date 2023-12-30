import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/js/Header';
import Footer from './components/js/Footer';
import Home from './components/js/Home'; // Your home page component
import Login from './components/js/Login'; // Your login page component
import SignUp from './components/js/signup';
import './components/css/globalStyles.css'
// Your signup page component
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}


export default App;
