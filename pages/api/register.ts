import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';
import crypto from 'crypto';

function hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Método ${req.method} não permitido`);
    }
    const { email, password, role, requesterRole } = req.body;

    // if (requesterRole !== 'tecnico') {
    //     return res.status(403).json({ message: 'Acesso negado' });
    // }
   
    // if (role !== 'professor' && role !== 'tecnico') {
    //     return res.status(400).json({ message: 'Papel inválido' });
    // }

    const hashedPassword = hashPassword(password);

    const { data, error } = await supabase
    .from('users')
    .insert([
      { email, password: hashedPassword, role },
    ]);

    if (error) {
        return res.status(500).json({ message: 'Erro ao cadastrar usuário', error });
    }

    return res.status(201).json({ message: 'Usuário cadastrado com sucesso', user: data });
}