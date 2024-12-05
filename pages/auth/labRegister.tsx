import React, { useState } from 'react';
import { useRouter } from 'next/router';

const RegisterLaboratory = () => {
    const [instituicao, setInstituicao] = useState('');
    const [numeroLaboratorio, setNumeroLaboratorio] = useState('');
    const [descricao, setDescricao] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleRegisterLaboratory = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/registerLaboratory', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ instituicao, numeroLaboratorio, descricao }),
            });

            if (response.ok) {
                setMessage('Laboratório registrado com sucesso!');
                setTimeout(() => router.push('/dashboard'), 2000); // Redireciona para o dashboard após 2s
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
            <h1>Registrar Laboratório</h1>
            <form onSubmit={handleRegisterLaboratory}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Instituição</label>
                    <input
                        type="text"
                        value={instituicao}
                        onChange={(e) => setInstituicao(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Número do Laboratório</label>
                    <input
                        type="text"
                        value={numeroLaboratorio}
                        onChange={(e) => setNumeroLaboratorio(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Descrição</label>
                    <textarea
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.5rem', height: '100px', marginBottom: '0.5rem' }}
                    />
                </div>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button type="submit" 
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: '#0070f3',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                transition: 'background-color 0.3s ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#005bb5')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0070f3')}>
                            Registrar Laboratório
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterLaboratory;