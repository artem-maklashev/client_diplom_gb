// src/App.tsx
import React, { useState } from 'react';
import axios from 'axios';


interface Credentials {
    username: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const [credentials, setCredentials] = useState<Credentials>({ username: '', password: '' });
    const [loginMessage, setLoginMessage] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }));
    };

    const login = async (): Promise<void> => {
        try {
            const response = await axios.post(`${process.env.AUTH_URL}`, credentials);
            const { token } = response.data; // Предполагаем, что бэкенд возвращает токен в свойстве "token"
            localStorage.setItem('authToken', token);
            // В реальном приложении вы, вероятно, сохраните токен в localStorage или в состоянии приложения
            // Например: localStorage.setItem('authToken', token);

            setLoginMessage('Login successful!');
            // В этом месте вы можете перенаправить пользователя на другую страницу или выполнить другие действия после успешного входа.
        } catch (error) {
            console.error('Login failed:', error);
            setLoginMessage('Invalid username or password. Please try again.');
        }
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={credentials.username} onChange={handleInputChange} required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={credentials.password} onChange={handleInputChange} required />

                <button type="button" onClick={login}>Login</button>
            </form>
            <p>{loginMessage}</p>
        </div>
    );
};

export default LoginPage;
