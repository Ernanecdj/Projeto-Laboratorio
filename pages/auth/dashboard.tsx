import React from 'react';
import { useRouter } from 'next/router';


const Dashboard = () => {
    const router = useRouter();

    const handleRegisterLab = () => {
        router.push('/auth/labRegister');
    };

    const handleRegisterLabSchedule = () => {
        router.push('/auth/horarioLab'); 
    };

    return (
        <div className="min-h-screen bg-gray-100" style={{ padding: '2rem', position: 'relative', height: '100vh' }}>
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

            <button
                onClick={handleRegisterLabSchedule}
                style={{
                    padding: '0.5rem 1rem',
                    margin: '1rem 0',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Registrar Horário do Laboratório
            </button>
        </div>
    );
};

export default Dashboard;