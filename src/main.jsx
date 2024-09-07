import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './Login'; // Import your Login component
// import Game from './Game';   // Import your Game component
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* <Route path="/" element={<App />} />      Main Route */}
        <Route path="/" element={<Login />} /> {/* Login Route */}
        <Route path="/game" element={<App />} />   {/* Game Route */}
      </Routes>
    </Router>
  </React.StrictMode>,
);
