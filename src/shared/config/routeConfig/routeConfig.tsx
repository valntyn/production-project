import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { RouteProps } from 'react-router-dom';

type AppRouteProps = RouteProps & {
    authOnly?: boolean;
}

export enum AppRouter {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',

    // LAST
    NOTFOUND = 'notfound',
}

export const RoutePath: Record<AppRouter, string> = {
    [AppRouter.MAIN]: '/',
    [AppRouter.ABOUT]: '/about',
    [AppRouter.NOTFOUND]: '*',
    [AppRouter.PROFILE]: '/profile',
};

export const routeConfig: Record<AppRouter, AppRouteProps> = {
    [AppRouter.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRouter.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />,
    },
    [AppRouter.PROFILE]: {
        path: RoutePath.profile,
        element: <ProfilePage />,
        authOnly: true,
    },

    // last
    [AppRouter.NOTFOUND]: {
        path: RoutePath.notfound,
        element: <NotFoundPage />,
    },
};
