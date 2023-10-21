import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/main-svg.svg';
import ArticlesIcon from 'shared/assets/icons/document.svg';
import AboutIcon from 'shared/assets/icons/about-svg.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';

import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: RoutePath.main,
                Icon: MainIcon,
                text: 'Головна',
            },
            {
                path: RoutePath.about,
                Icon: AboutIcon,
                text: 'Про сайт',
            },
        ];

        if (userData) {
            sidebarItemsList.push(
                {
                    path: RoutePath.articles,
                    Icon: ArticlesIcon,
                    text: 'Статті',
                    authOnly: true,
                },
                {
                    path: RoutePath.profile + userData.id,
                    Icon: ProfileIcon,
                    text: 'Профіль',
                    authOnly: true,
                },
            );
        }

        return sidebarItemsList;
    },
);
