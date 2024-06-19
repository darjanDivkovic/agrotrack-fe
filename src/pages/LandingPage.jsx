// src/pages/LandingPage.js
import { useState } from 'react';
import LogoSmall from '../assets/LogoSmall';
import TextInput from '../common/TextInput/TextInput';
import { login } from '../helpers/apiService';
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        try {
            console.log('TRYNA LOGIN1', email, password);
            const result = await login(email, password);
            console.log('resulaaat', result.message);

            if (result.message === 'Login successful') {
                console.log('yo');
                // Save user data in local storage
                localStorage.setItem('userFullName', result.full_name);
                localStorage.setItem('userId', result.user_id);
                localStorage.setItem('token', result.token);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent default form submission
        handleLogin(email, password);
    };

    const handleEmailChange = (e) => {
        console.log('Email change event:', e);
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        console.log('Password change event:', e);
        setPassword(e.target.value);
    };

    return (
        <div className='flex flex-col h-[100vh] items-center justify-center gap-8 w-[100%] mx-auto px-[10%]'>
            <LogoSmall />
            <h1 className='text-[1.5rem] text-center font-bold w-full'>👋Dobrodošli nazad! </h1>
            <p className='opacity-50 font-light text-center'>Unesite svoje detalje da pristupite VRA mapa mapama...</p>

            <form onSubmit={handleSubmit} className='w-full flex flex-col gap-6'>
                <TextInput
                    label="Email"
                    placeholder="Unesite Email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <TextInput
                    label="Password"
                    type="password"
                    placeholder="Unesite Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <button
                    type='submit'
                    className='bg-white w-full bg-opacity-20 py-3 rounded-xl font-bold mt-8 hover:bg-opacity-40'
                >
                    Nastavi
                </button>
            </form>
        </div>
    );
};

export default LandingPage;