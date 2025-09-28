'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
        await api.post('/auth/register', { email, password, name });
        toast.success('Registrasi berhasil! Silakan login.');
        router.push('/login');
        } catch (err: any) {
        console.error(err);
        toast.error(err?.response?.data?.message || 'Registrasi gagal!');
        } finally {
        setLoading(false);
        }
    };

    return (
        <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
        <h2 className="text-2xl font-bold text-center mb-4">Daftar Akun</h2>

        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
            Nama
            </label>
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Nama lengkap"
            />
        </div>

        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
            </label>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Alamat email"
            />
        </div>

        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
            </label>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Minimal 6 karakter"
            />
        </div>

        <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-500 transition"
        >
            {loading ? 'Memproses...' : 'Daftar'}
        </button>
        </form>
    );
}