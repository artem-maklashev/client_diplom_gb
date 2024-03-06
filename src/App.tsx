import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import NavigationBar from "./components/navigation/NavigationBar";
import GypsumBoardShow2 from "./components/pages/GypsumBoardShow2";
import DelaysShow from "./components/pages/DelaysShow";
import DefectsShow from "./components/pages/DefectsShow";
import BoardProductionInputForm from "./components/pages/BoardProductionInputForm";
import MainPage from "./components/pages/MainPage";
import Footer from "./components/navigation/Footer";
import RegistrationPage from "./components/pages/RegistrationPage";
import LoginPage from "./components/pages/LoginPage";


function App() {
    if (localStorage.getItem('authToken') !== null) {
        return (
            <div>
                <NavigationBar />
                <Routes>
                    <Route path="/board" element={<GypsumBoardShow2 />} />
                    <Route path="/boardDelays" element={<DelaysShow />} />
                    <Route path="/boardDefects" element={<DefectsShow />} />
                    <Route path="/boardReport" element={<BoardProductionInputForm />} />
                    <Route path="/" element={<MainPage />} />
                </Routes>
                <Footer />
            </div>
        );
    }

    return (
        // <Router>
            <div>
                {/*<nav>*/}
                {/*    <ul>*/}
                {/*        <li>*/}
                {/*            <Link to="/login">Login</Link>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <Link to="/register">Register</Link>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</nav>*/}

                <Routes>
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/*" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        // </Router>
    );
}

export default App;
