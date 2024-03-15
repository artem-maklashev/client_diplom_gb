// src/App.tsx
import React, {useState} from 'react';
import axios from 'axios';
import { Link, useNavigate  } from 'react-router-dom';
import { setAuthToken } from "../../service/Api";


interface Credentials {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const [credentials, setCredentials] = useState<Credentials>({email: '', password: ''});
    const [loginMessage, setLoginMessage] = useState<string>('');
    const navigate = useNavigate();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.target;
        setCredentials((prevCredentials) => ({...prevCredentials, [name]: value}));
    };

    const login = async (): Promise<void> => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_AUTH_URL}/authenticate`, credentials);
            const {token} = response.data; // Предполагаем, что бэкенд возвращает токен в свойстве "token"
            setAuthToken(token);
            // В реальном приложении вы, вероятно, сохраните токен в localStorage или в состоянии приложения
            // Например: localStorage.setItem('authToken', token);

            setLoginMessage('Login successful!');
            // В этом месте вы можете перенаправить пользователя на другую страницу или выполнить другие действия после успешного входа.
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            setLoginMessage('Invalid username or password. Please try again.');
        }
    };

    return (
        <div className="login-page d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1>Login</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email:
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <button type="button" onClick={login} className="btn btn-primary">
                        Login
                    </button>
                </form>
                <p>{loginMessage}</p>
                <p>
                    Don't have an account? <Link to="/register">Register here</Link>.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
