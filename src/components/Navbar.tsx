'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between">
        <div className="space-x-4">
            {isAuthenticated && (
            <>
                <Link href="/notes" className="hover:underline">Notes</Link>
                <Link href="/tags" className="hover:underline">Tags</Link>
            </>
            )}
        </div>
        {isAuthenticated && (
            <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-400"
            >
            Logout
            </button>
        )}
        </nav>
    );
}