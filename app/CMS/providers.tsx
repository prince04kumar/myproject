'use client';

import React, { useContext, useEffect, useState } from 'react';
import { GetAuthUserData } from '@/services/GlobalApi';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';

const Provider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const router = useRouter();
    const { authState, login } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState([]);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            checkUserAuth();
        }
    }, []);

  

    const checkUserAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                router.replace('/api/sign-in');
                return;
            }
            
            const userData = await GetAuthUserData(token);
          
            
            if (!userData?.email) {
                localStorage.removeItem('token');
                router.replace('/api/sign-in');
                return;
            }
            
            // Store the authenticated user data in context
            login(userData);
            setLoading(false);
        } catch (error) {
            console.error('Authentication error:', error);
            localStorage.removeItem('token');
            router.replace('/api/sign-in');
        }
    };

    // Show loading or redirect while checking auth
    if (loading && typeof window !== 'undefined') {
        return <div>Loading...</div>;
    }

    return (
        <div suppressHydrationWarning>
            {children}
        </div>
    );
};

export default Provider;