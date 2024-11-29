import React from 'react';
import { useRouter } from 'next/router';

const Dashboard = () => {
    const router = useRouter();

    const handleRegisterLab = () => {
        // Redireciona para a página de registro de laboratório (a ser implementada futuramente)
        router.push('/auth/labRegister');
    };

    return (
        <div style={{ padding: '2rem', position: 'relative', height: '100vh' }}>
            <button
                onClick={handleRegisterLab}
                style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Registrar Laboratório
            </button>
            <h1>Bem-vindo ao Dashboard</h1>
        </div>
    );
};

export default Dashboard;