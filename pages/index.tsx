import Head from 'next/head';
import { useRouter } from 'next/router';

const Home = () => {
    const router = useRouter();
    const handleLoginClick = () => {
        router.push('/auth/login');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <Head>
            <title>Página Inicial</title>
            <meta name="description" content="Bem-vindo ao sistema de agendamento de laboratórios" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
            <main>
                <h1 className="text-4xl font-bold mb-4">Bem-vindo ao sistema de agendamento de laboratórios</h1>

                <p className="text-lg mb-8">
                    Faça o login para ter acesso ao sistema
                </p>

                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200" onClick={handleLoginClick}>
                    Login
                </button>
            </main>
        </div>
    );
};


export default Home;