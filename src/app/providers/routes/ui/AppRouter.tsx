import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRouteProps, routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader';

import { RolesGuard } from './RolesGuard';
import { AuthGuard } from './AuthGuard';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRouteProps) => {
        let element = (
            <Suspense fallback={<PageLoader />}>
                {route.element}
            </Suspense>
        );

        if (route.authOnly) {
            element = <AuthGuard>{element}</AuthGuard>;
        }

        if (route.roles) {
            element = <RolesGuard roles={route.roles}>{element}</RolesGuard>;
        }

        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? <AuthGuard>{element}</AuthGuard> : element}
            />
        );
    }, []);

    return (
        <Routes>
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Routes>
    );
};

export default memo(AppRouter);
