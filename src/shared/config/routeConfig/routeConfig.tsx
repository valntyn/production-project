import { AboutPage } from 'pages/AboutPage';
import { ArticleDetailsPage } from 'pages/ArticleDetailsPage';
import { ArticlesPage } from 'pages/ArticlesPage';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { RouteProps } from 'react-router-dom';
import { ArticleEditPage } from 'pages/ArticleEditPage';

export type AppRouteProps = RouteProps & {
    authOnly?: boolean;
}

export enum AppRouter {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',

    // LAST
    NOTFOUND = 'notfound',
}

export const RoutePath: Record<AppRouter, string> = {
    [AppRouter.MAIN]: '/',
    [AppRouter.ABOUT]: '/about',
    [AppRouter.PROFILE]: '/profile/', // + id
    [AppRouter.NOTFOUND]: '*',
    [AppRouter.ARTICLES]: '/articles',
    [AppRouter.ARTICLE_DETAILS]: '/articles/', // + :id
    [AppRouter.ARTICLE_CREATE]: '/articles/create',
    [AppRouter.ARTICLE_EDIT]: '/articles/:id/edit',
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
        path: `${RoutePath.profile}:id`,
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRouter.ARTICLES]: {
        path: RoutePath.articles,
        element: <ArticlesPage />,
        authOnly: true,
    },
    [AppRouter.ARTICLE_DETAILS]: {
        path: `${RoutePath.article_details}:id`,
        element: <ArticleDetailsPage />,
        authOnly: true,
    },
    [AppRouter.ARTICLE_CREATE]: {
        path: `${RoutePath.article_create}`,
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [AppRouter.ARTICLE_EDIT]: {
        path: `${RoutePath.article_edit}`,
        element: <ArticleEditPage />,
        authOnly: true,
    },

    // last
    [AppRouter.NOTFOUND]: {
        path: RoutePath.notfound,
        element: <NotFoundPage />,
    },
};
