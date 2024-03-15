import React, {useEffect, useState} from 'react';
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
import axios from "axios";
import BoardProduction from "./model/production/BoardProduction";

//Старая версия
// function App() {
//     // useEffect(() => {
//     //     localStorage.removeItem('authToken');
//     // }, []);
//
//     if (localStorage.getItem('authToken') !== null) {
//         alert(localStorage.getItem('authToken'));
//         return (
//             <div>
//                 <NavigationBar />
//                 <Routes>
//                     <Route path="/board" element={<GypsumBoardShow2 />} />
//                     <Route path="/boardDelays" element={<DelaysShow />} />
//                     <Route path="/boardDefects" element={<DefectsShow />} />
//                     <Route path="/boardReport" element={<BoardProductionInputForm />} />
//                     <Route path="/" element={<MainPage />} />
//                 </Routes>
//                 <Footer />
//             </div>
//         );
//     }
//
//     return (
//         // <Router>
//             <div>
//                 {/*<nav>*/}
//                 {/*    <ul>*/}
//                 {/*        <li>*/}
//                 {/*            <Link to="/login">Login</Link>*/}
//                 {/*        </li>*/}
//                 {/*        <li>*/}
//                 {/*            <Link to="/register">Register</Link>*/}
//                 {/*        </li>*/}
//                 {/*    </ul>*/}
//                 {/*</nav>*/}
//
//                 <Routes>
//                     <Route path="/register" element={<RegistrationPage />} />
//                     <Route path="/login" element={<LoginPage />} />
//                     <Route path="/*" element={<Navigate to="/login" />} />
//                 </Routes>
//             </div>
//         // </Router>
//     );
// }
//
// export default App;


function App() {
    const [validatingToken, setValidatingToken] = useState(true);
    const [tokenValid, setTokenValid] = useState(false);
    useEffect(() => {
        async function validateToken() {
            // setValidatingToken(true);
            const authToken = localStorage.getItem('authToken');
            if (authToken) {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_AUTH_URL}/validate`, {
                        params: { token: authToken }
                    });
                    if (!response.data.valid) {
                        localStorage.removeItem('authToken'); // Удаление недействительного токена
                        setTokenValid(false);
                    } else {
                        setTokenValid(true);
                    }
                } catch (error) {
                    console.error('Ошибка при валидации токена:', error);
                }
            } else {
                setTokenValid(false);
            setValidatingToken(false);
            }
        }

        validateToken();
    }, []);

    if (validatingToken) {
        return null; // Пока происходит проверка токена, ничего не отображаем
    }
    return (
        // <Router>
            <div>
                <NavigationBar />
                <Routes>
                    <Route path="/board" element={<GypsumBoardShow2 />} />
                    <Route path="/boardDelays" element={<DelaysShow />} />
                    <Route path="/boardDefects" element={<DefectsShow />} />
                    <Route path="/boardReport" element={<BoardProductionInputForm />} />
                    <Route path="/" element={<MainPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/*" element={<Navigate to="/login" />} />
                </Routes>
                <Footer />
            </div>
        // </Router>
    );
}

export default App;