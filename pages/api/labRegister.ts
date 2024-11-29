import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Método ${req.method} não permitido`);
    }

    const { instituicao, numero, descricao } = req.body;

    // Validação dos campos
    if (!instituicao || !numero || !descricao) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        const { data, error } = await supabase
            .from('labs')
            .insert([{ instituicao, numero, descricao }]);

        if (error) throw error;

        return res.status(201).json({ message: 'Laboratório registrado com sucesso!', laboratorio: data });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao registrar laboratório', error });
    }
}