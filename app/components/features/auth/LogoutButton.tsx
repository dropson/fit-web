import React from 'react'
import { useNavigate } from 'react-router';
import { useAuthState } from '~/stores/authStore';

type Props = {
    children: React.ReactNode;
}

const LogoutButton = ({ children }: Props) => {

    const { logout, loading } = useAuthState();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/sign-in', { replace: true });
        } catch (error) {
            console.error('Error during logout:', error);
            navigate('/', { replace: true });
        }
    };
    return (
        <button
            onClick={handleLogout}
            disabled={loading}
        >
            {children}
        </button>
    )
}

export default LogoutButton
