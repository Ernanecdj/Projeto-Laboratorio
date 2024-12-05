import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                setError(null);
                router.push("/auth/dashboard")
            } else {
                // login falhou
                const errorData = await response.json();
                setError(errorData.message); // Define o erro a ser exibido
            }
        } catch (err) {
            setError('Ocorreu um erro. Tente novamente.'); 
        }
    };

    const handleRegisterRedirect = () => {
        // if (user && user.role === 'tecnico'){
            router.push('/auth/register')
        // } else {
        //     setError('Apenas técnicos podem acessar a página de registro.')
        // }

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">Login</h1>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '1rem' }}>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Senha</label>
                    <input 
                        type="password" 
                        name="password" 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                <button type='submit'className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                    Entrar
                </button>
            </form>
            <button onClick={handleRegisterRedirect} className="bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full cursor-not-allowed" style={{ marginTop: '1rem' }}>
                Registrar
            </button>
        </div>
    );
};

export default Login;