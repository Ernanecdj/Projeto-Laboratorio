import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        //Faz uma requisição POST para a API de login
        const res = await fetch('api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if(res.ok) {
            router.push('/dashboard');
        } else {
            setError('Credenciais inválidas');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem'}}
                        />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Senha</label>
                    <input 
                        type="password" 
                        name="password" 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem'}}
                    />
                </div>
                {error && <p style={{color: 'red' }}>{error}</p>}
                <button type='submit' style={{ padding: '0.5rem 1rem' }}>
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default Login;