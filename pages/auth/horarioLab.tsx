import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createSchedule, fetchLabs } from '../api/horarioLab';

const RegisterLabSchedule = () => {
  const [labs, setLabs] = useState<any[]>([]);
  const [selectedLab, setSelectedLab] = useState('');
  const [classGroup, setClassGroup] = useState('');
  const [schedule, setSchedule] = useState('');
  const [subject, setSubject] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert('Faça login antes de acessar essa página.');
      router.push('/auth/login');
      return;
    }

    const { id: professorId } = JSON.parse(storedUser);

    try {
      await createSchedule({
        lab_id: Number(selectedLab),
        professor_id: professorId,
        class_group: classGroup,
        schedule_time: schedule,
        subject: subject,
      });
      setSuccess('Horário registrado com sucesso!');
      setClassGroup('');
      setSchedule('');
      setSubject('');
      setSelectedLab('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const labsData = await fetchLabs();
        setLabs(labsData);
      } catch (err) {
        setError('Erro ao carregar os laboratórios.');
      }
    })();
  }, []);

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
      <h1>Registrar Horário do Laboratório</h1>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Selecione o Laboratório:</label>
          <select
            value={selectedLab}
            onChange={(e) => setSelectedLab(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          >
            <option value="">Selecione um laboratório</option>
            {labs.map((lab) => (
              <option key={lab.id} value={lab.id}>
                {lab.name}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Turma:</label>
          <input
            type="text"
            value={classGroup}
            onChange={(e) => setClassGroup(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Horário:</label>
          <input
            type="datetime-local"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Matéria:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" style={{
                            padding: '0.75rem 1.5rem',
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
                Registrar Horário
            </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterLabSchedule;