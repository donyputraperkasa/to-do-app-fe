'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

interface Tag {
    id: number;
    name: string;
}

export default function TagsPage() {
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);
    const [newTag, setNewTag] = useState('');
    const [role, setRole] = useState<string | null>(null);

    // Ambil role user dari token (opsional: bisa decode JWT)
    useEffect(() => {
        const stored = localStorage.getItem('role');
        if (stored) setRole(stored);
    }, []);

    const fetchTags = async () => {
    try {
        const res = await api.get<Tag[]>('/tags');
        setTags(res.data);
    } catch (err) {
        toast.error('Gagal memuat tags');
    } finally {
        setLoading(false);
    }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    const handleAddTag = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTag.trim()) return toast.error('Nama tag tidak boleh kosong');
        try {
        await api.post('/tags', { name: newTag });
        toast.success('Tag berhasil ditambahkan');
        setNewTag('');
        fetchTags();
        } catch (err) {
        toast.error('Gagal menambahkan tag');
        }
    };

    return (
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Daftar Tag</h1>

        {/* Hanya tampilkan form jika admin */}
        {role === 'ADMIN' && (
            <form onSubmit={handleAddTag} className="mb-6 flex gap-2">
            <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Nama tag baru"
                className="border p-2 rounded flex-1"
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
            >
                Tambah
            </button>
            </form>
        )}

        {loading ? (
            <p className="text-gray-500">Memuat data...</p>
        ) : tags.length === 0 ? (
            <p className="text-gray-500">Belum ada tag.</p>
        ) : (
            <ul className="space-y-2">
            {tags.map((tags) => (
                <li
                key={tags.id}
                className="bg-white border rounded p-3 shadow-sm flex justify-between"
                >
                <span>{tags.name}</span>
                {role === 'ADMIN' && (
                    <span className="text-xs text-gray-500">id: {tags.id}</span>
                )}
                </li>
            ))}
            </ul>
        )}
        </div>
    );
}