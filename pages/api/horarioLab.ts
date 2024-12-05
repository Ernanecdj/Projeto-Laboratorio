import { supabase } from '../../lib/supabaseClient';

export interface Schedule {
  lab_id: number;
  professor_id: number;
  class_group: string;
  schedule_time: string;
  subject: string;
}

// Cria um novo registro na tabela schedules
export async function createSchedule(schedule: Schedule) {
  const { data, error } = await supabase.from('schedules').insert(schedule);

  if (error) {
    console.error('Erro ao criar horário:', error.message);
    throw new Error('Não foi possível registrar o horário.');
  }

  return data;
}

// Lista os laboratórios para o dropdown
export async function fetchLabs() {
  const { data, error } = await supabase.from('labs').select('id, name');
  
  if (error) {
    console.error('Erro ao buscar laboratórios:', error.message);
    throw new Error('Não foi possível carregar os laboratórios.');
  }

  return data;
}