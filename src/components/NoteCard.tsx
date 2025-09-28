'use client';
import { Note } from '@/types/note';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

interface NoteCardProps {
    note: Note;
    onDelete?: () => void;
    onUpdate?: () => void;
}

export default function NoteCard({ note, onDelete }: NoteCardProps) {
    const handleDelete = async () => {
        if (!confirm('Hapus note ini?')) return;
        try {
        await api.delete(`/notes/${note.id}`);
        toast.success('Note berhasil dihapus');
        onDelete?.();
        } catch {
        toast.error('Gagal menghapus note');
        }
    };

    return (
        <div className="bg-white shadow rounded p-4 flex flex-col justify-between">
        <div>
            <h2 className="text-lg font-semibold">{note.title}</h2>
            <p className="text-gray-600">{note.content}</p>
            <div className="mt-2 text-sm text-gray-500">
            Tags: {note.tags?.map(t => t.tag.name).join(', ') || '-'}
            </div>
            {note.user && (
            <p className="text-xs text-gray-400 mt-2">
                By: {note.user.email}
            </p>
            )}
        </div>
        <button
            onClick={handleDelete}
            className="mt-4 bg-red-500 text-white text-sm py-1 px-3 rounded hover:bg-red-400 transition"
        >
            Hapus
        </button>
        </div>
    );
}