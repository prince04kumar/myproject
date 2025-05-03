'use client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '@/context/AuthContext';

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <GoogleOAuthProvider clientId='327873088395-64hgp15n6bdt5e2c5tln0je3qe213s47.apps.googleusercontent.com'>
      <AuthProvider>
        {children}
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}

export default Provider;
