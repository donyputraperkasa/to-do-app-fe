'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Note } from '@/types/note';
import NoteCard from '@/components/NoteCard';
import NoteForm from '@/components/NoteForm';
import toast from 'react-hot-toast';

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    // Ambil semua note dari API
    const fetchNotes = async () => {
        try {
        const res = await api.get<Note[]>('/notes');
        setNotes(res.data);
        } catch (err) {
        console.error(err);
        toast.error('Gagal memuat notes');
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div className="p-6">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Daftar Note</h1>
            <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
            >
            {showForm ? 'Tutup Form' : 'Tambah Note'}
            </button>
        </div>

        {/* Form tambah note */}
        {showForm && (
            <NoteForm
            onSuccess={() => {
                fetchNotes();
                setShowForm(false);
            }}
            />
        )}

        {/* List notes */}
        {loading ? (
            <p className="text-gray-500">Memuat data...</p>
        ) : notes.length === 0 ? (
            <p className="text-gray-500">Belum ada note.</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((notes) => (
                <NoteCard
                key={notes.id}
                note={notes}
                onDelete={fetchNotes}
                onUpdate={fetchNotes}
                />
            ))}
            </div>
        )}
        </div>
    );
}