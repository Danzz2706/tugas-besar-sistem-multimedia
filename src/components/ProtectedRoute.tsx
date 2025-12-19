import { Navigate } from 'react-router-dom';
// Protected Route Component
import { useStore } from '../store/useStore';
import type { ReactNode } from 'react';

export const ProtectedRoute = ({ children, allowedRoles }: { children: ReactNode, allowedRoles?: ('student' | 'teacher')[] }) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const user = useStore((state) => state.user);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Redirect based on role if unauthorized
        return <Navigate to={user.role === 'teacher' ? '/teacher-dashboard' : '/dashboard'} replace />;
    }

    return <>{children}</>;
};
