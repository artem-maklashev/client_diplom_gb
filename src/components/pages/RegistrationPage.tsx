// src/RegistrationPage.tsx
import React, { useState } from 'react';
import axios from "axios";


interface User {
    username: string;
    email: string;
    password: string;
}

const RegistrationPage: React.FC = () => {
    const [registrationData, setRegistrationData] = useState<User>({
        username: '',
        email: '',
        password: '',
    });
    const [registrationMessage, setRegistrationMessage] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setRegistrationData((prevData) => ({ ...prevData, [name]: value }));
    };

    const register = async (): Promise<void> => {
        try {
            console.log('REACT_APP_AUTH_URL:', 'URL:', `${process.env.REACT_APP_AUTH_URL}/register`);
            // Отправляем запрос на бэкенд для регистрации
            const response = await axios.post(`${process.env.REACT_APP_AUTH_URL}/register`, registrationData);

            // Обрабатываем успешный ответ от бэкенда
            setRegistrationMessage('Registration successful!');
        } catch (error) {
            // Обрабатываем ошибку регистрации
            console.error('Registration failed:', error);
            setRegistrationMessage('Registration failed. Please try again.');
        }
    };

    return (
        <div className="registration-page d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1>Register</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username:
                        </label>
                        <input type="text" id="username" name="username" value={registrationData.username} onChange={handleInputChange} className="form-control" required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email:
                        </label>
                        <input type="email" id="email" name="email" value={registrationData.email} onChange={handleInputChange} className="form-control" required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password:
                        </label>
                        <input type="password" id="password" name="password" value={registrationData.password} onChange={handleInputChange} className="form-control" required />
                    </div>

                    <button type="button" onClick={register} className="btn btn-primary">
                        Register
                    </button>
                </form>
                <p>{registrationMessage}</p>
            </div>
        </div>
    );
};

export default RegistrationPage;
