import React from 'react'
import { useAuthState } from '~/stores/authStore';
import { Spinner } from '../features';
import { Navigate } from 'react-router';

type Props = {
    roles: string[];
    children: React.ReactNode;
}

const ProtectedRoute = ({ roles, children }: Props) => {
    const { isAuthenticated, user, loading } = useAuthState();
    if (loading) return <Spinner />;
    if (!isAuthenticated()) return <Navigate to="/sign-in" />
    if (!user?.role?.some((r) => roles.includes(r))) {
        return <Navigate to="/" />
    }
    return (
        <>{children}</>
    )
}

export default ProtectedRoute
