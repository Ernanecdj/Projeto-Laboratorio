import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';
import crypto from 'crypto';

function hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        
        // Hash a senha fornecida pelo usuário
        const hashedPassword = hashPassword(password);

        const { data: user, error } = await supabase
            .from('users')
            .select('id, email, password')
            .eq('email', email)
            .eq('password', hashedPassword)
            .single();

        if (error || !user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        return res.status(200).json({ message: 'Login bem-sucedido!', user });
    }

    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} não permitido`);
}
