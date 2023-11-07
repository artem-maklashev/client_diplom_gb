import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router,  Navigate, Routes } from 'react-router-dom';
import NavigationBar from './components/navigation/NavigationBar';
import GypsumBoard from './components/pages/GypsumBoard';
import MainPage from './components/pages/MainPage';

function App() {
  return (

    <div>
      <NavigationBar />
      <div className='flex-grow-1'>       
        <Router>
          <Routes>            
            <Route path="/board" element={<GypsumBoard />} />
            <Route path="/" element={<MainPage />} />
          </Routes>
        </Router> 

      </div>
    </div>
  );
}

export default App;
