import React from 'react';
import './App.css';
import {Route, BrowserRouter as Router, Navigate, Routes} from 'react-router-dom';
import NavigationBar from './components/navigation/NavigationBar';
// import GypsumBoardShow from './components/pages/GypsumBoardShow';
import MainPage from './components/pages/MainPage';
import GypsumBoardShow2 from "./components/pages/GypsumBoardShow2";

function App() {
    return (

        <div>
            <NavigationBar/>
            <div className="container-fluid">
                <div className='flex-grow-1'>
                    <Router>
                        <Routes>
                            {/*<Route path="/board" element={<GypsumBoardShow2/>}/>*/}
                            {/*<Route path="/" element={<MainPage/>}/>*/}
                        </Routes>
                    </Router>

                </div>
            </div>
        </div>
    );
}

export default App;
