// src/lib/auth.ts

// Simpan token JWT ke localStorage
export function setToken(token: string) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
    }
    }

    // Ambil token JWT dari localStorage
    export function getToken(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
    }

    // Hapus token JWT dari localStorage
    export function removeToken() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
    }
}