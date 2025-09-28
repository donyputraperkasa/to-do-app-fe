'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Note } from '@/types/note';
import { Tag } from '@/types/tag';

export default function HomePage() {
  const [noteCount, setNoteCount] = useState<number | null>(null);
  const [tagCount, setTagCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    setError(false);
    try {
      const [notesRes, tagsRes] = await Promise.all([
        api.get<Note[]>('/notes'),
        api.get<Tag[]>('/tags'),
      ]);
      setNoteCount(notesRes.data.length);
      setTagCount(tagsRes.data.length);
    } catch (err) {
      console.error(err);
      toast.error('Gagal memuat data dashboard');
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Kondisi Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center h-40 text-gray-500">
          <svg
            className="animate-spin h-8 w-8 mb-2 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8h4z"
            ></path>
          </svg>
          <p>Memuat data...</p>
        </div>
      )}

      {/* Kondisi Error */}
      {error && !loading && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <strong className="font-bold">Oops!</strong>
          <span className="block sm:inline ml-2">
            Gagal memuat data dashboard.
          </span>
          <button
            onClick={fetchStats}
            className="ml-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 text-sm"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Kondisi Sukses */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="bg-white shadow rounded p-4 text-center">
              <h2 className="text-xl font-semibold">Total Notes</h2>
              <p className="text-3xl font-bold mt-2">{noteCount ?? '-'}</p>
            </div>
            <div className="bg-white shadow rounded p-4 text-center">
              <h2 className="text-xl font-semibold">Total Tags</h2>
              <p className="text-3xl font-bold mt-2">{tagCount ?? '-'}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              href="/notes"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500 transition"
            >
              Ke Notes
            </Link>
            <Link
              href="/tags"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-500 transition"
            >
              Ke Tags
            </Link>
          </div>
        </>
      )}
    </div>
  );
}