import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('professor');
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Verifica se o usuário está logado e se é um técnico
        const checkUserRole = async () => {
            try {
                const { data: session } = await supabase.auth.getSession();

                if (!session?.session) {
                    alert('Por favor, faça login antes de acessar a página de registro.');
                    router.push('/auth/login');
                    return;
                }

                const userEmail = session.session.user.email;

                // Consulta no Supabase para verificar o papel (role) do usuário
                const { data: user, error } = await supabase
                    .from('users')
                    .select('role')
                    .eq('email', userEmail)
                    .single();

                if (error || !user) {
                    alert('Erro ao verificar papel do usuário. Por favor, tente novamente.');
                    router.push('/auth/login');
                    return;
                }

                if (user.role !== 'tecnico') {
                    alert('Acesso negado: apenas técnicos podem registrar novos usuários.');
                    router.push('/dashboard'); // Redireciona para uma página segura
                }
            } catch (err) {
                alert('Ocorreu um erro. Por favor, tente novamente.');
                router.push('/auth/login');
            }
        };

        checkUserRole();
    }, [router]);

    
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role }),
            });

            if (response.ok) {
                setMessage('Usuário cadastrado com sucesso!');
                setTimeout(() => router.push('/auth/login'), 2000); // Redireciona para login
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        
        } catch (err) {
            setError('Ocorreu um erro. Tente novamente.');
        } 
};

return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
        <h1>Registrar</h1>
            <form onSubmit={handleRegister}>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem'}}
                />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <label>Função</label>
                <select 
                    value={role}
                    onChange={(e) => setRole(e.target.value)} 
                    style={{ width: '100%', padding: '0.5rem' }}
                >
                    <option value="professor">Professor</option>
                    <option value="tecnico">Técnico</option>
                </select>
            </div>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" style={{ padding: '0.5rem 1rem' }}>Registrar</button>
        </form>
    </div>
    );
};

export default Register;