/* eslint-disable no-undef */
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useMemo } from 'react';
import { getUserRoles } from 'entities/User/model/selectors/roleSelector';
import { UserRole } from 'entities/User/consts/consts';

export interface RolesGuardProps {
    children: JSX.Element;
    roles: UserRole[];
}

export function RolesGuard({ children, roles }: RolesGuardProps) {
    const userRoles = useSelector(getUserRoles);
    const location = useLocation();

    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            return true;
        }

        return roles.some((requiredRole) => userRoles?.includes(requiredRole));
    }, [roles, userRoles]);

    if (!hasRequiredRoles) {
        return <Navigate to={RoutePath.guard} state={{ from: location }} replace />;
    }

    return children;
}
