'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { setToken } from '@/lib/auth';
import axios from 'axios'; // tetap import default

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
        // ✅ tambahkan generic type agar TS tahu tipe data response
        const res = await api.post<{ access_token: string }>('/auth/login', {
            email,
            password,
        });

        const token = res.data.access_token;
        if (!token) throw new Error('Token tidak ditemukan di response');

        setToken(token);
        toast.success('Login berhasil!');
        router.push('/');
        } catch (err: unknown) {
        // ✅ perbaiki penanganan error tanpa isAxiosError
        const error = err as any;

        if (error.response && error.response.data) {
            toast.error(error.response.data.message || 'Login gagal!');
        } else if (error instanceof Error) {
            toast.error(error.message);
        } else {
            toast.error('Terjadi kesalahan tak terduga.');
        }

        console.error('Login error:', err);
        } finally {
        setLoading(false);
        }
    };

    return (
        <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

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
            placeholder="Masukkan email"
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
            placeholder="Masukkan password"
            />
        </div>

        <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-500 transition"
        >
            {loading ? 'Memproses...' : 'Login'}
        </button>
        </form>
    );
}