import React from 'react';
import './App.css';
import Header from './components/js/Header';
import Footer from './components/js/Footer';

function App() {
  return (
      <div className="App">
          <Header />
          <div className="main-content">
              <div className="buttons-container">
                  <button className="btn">New User</button>
                  <button className="btn">Sign In</button>
              </div>
          </div>
          <Footer />
      </div>
  );
}

export default App;
