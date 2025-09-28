'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getToken, removeToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface AuthContextProps {
    isAuthenticated: boolean;
    logout: () => void;
    }

    const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    logout: () => {},
    });

    export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = getToken();
        if (!token) {
        router.push('/login'); // redirect ke login jika belum login
        } else {
        setIsAuthenticated(true);
        }
    }, [router]);

    const logout = () => {
        removeToken();
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);