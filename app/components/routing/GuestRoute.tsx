import React from 'react'
import { Navigate } from 'react-router';
import { useAuthState } from '~/stores/authStore';
import { Spinner } from '../features';
type Props = {
    children: React.ReactNode;
}

const GuestRoute = ({ children }: Props) => {

    const { isAuthenticated, user, loading } = useAuthState();

    if (loading) return <Spinner />;

    if (isAuthenticated()) {
        if (user?.role.includes('admin') || user?.role.includes('moderator')) {
            return <Navigate to="admin/home" />
        }
        return <Navigate to="/" />
    }

    return (
        <>{children}</>
    )
}

export default GuestRoute
