import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import {ArweaveWalletKit} from 'arweave-wallet-kit'
import Login from './Login'; // Import your Login component
// import Game from './Game';   // Import your Game component
import './index.css';
import LeaderBoard from './components/LeaderBoard';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

<ArweaveWalletKit
   config={{
      permissions: ["ACCESS_ADDRESS" , "ACCESS_ALL_ADDRESSES", "DISPATCH" , "SIGN_TRANSACTION" ],
      ensurePermissions: true,
      
       }}
   
   >
    <Router>
      <Routes>
        {/* <Route path="/" element={<App />} />      Main Route */}
        <Route path="/" element={<Login />} /> {/* Login Route */}
        <Route path="/game" element={<App />} />   {/* Game Route */}
        <Route path="/leaderboard" element={<LeaderBoard />} />   {/* Game Route */}
      </Routes>
    </Router>
    </ArweaveWalletKit>
  </React.StrictMode>,
);
