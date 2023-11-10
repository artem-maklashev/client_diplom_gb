import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router,  Navigate, Routes } from 'react-router-dom';
import NavigationBar from './components/navigation/NavigationBar';
import GypsumBoardShow from './components/pages/GypsumBoardShow';
import MainPage from './components/pages/MainPage';

function App() {
  return (

    <div>
      <NavigationBar />
      <div className='flex-grow-1'>       
        <Router>
          <Routes>            
            <Route path="/board" element={<GypsumBoardShow />} />
            <Route path="/" element={<MainPage />} />
          </Routes>
        </Router> 

      </div>
    </div>
  );
}

export default App;
