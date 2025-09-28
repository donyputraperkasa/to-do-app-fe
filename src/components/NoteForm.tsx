'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

interface NoteFormProps {
    onSuccess?: () => void;
}

export default function NoteForm({ onSuccess }: NoteFormProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
        await api.post('/notes', { title, content });
        toast.success('Note berhasil dibuat');
        setTitle('');
        setContent('');
        onSuccess?.();
        } catch (err) {
        toast.error('Gagal membuat note');
        } finally {
        setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-6">
        <h2 className="text-lg font-semibold mb-2">Tambah Note</h2>
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul note"
            className="border w-full p-2 mb-3 rounded"
            required
        />
        <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Isi note"
            className="border w-full p-2 mb-3 rounded"
        />
        <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
            {loading ? 'Menyimpan...' : 'Simpan'}
        </button>
        </form>
    );
}