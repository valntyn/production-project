import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about-svg.svg';
import MainIcon from 'shared/assets/icons/main-svg.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';

export interface SidebarItemType {
    path: string;
    text: string;
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const SidebarItemsList: SidebarItemType[] = [
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
    {
        path: RoutePath.profile,
        Icon: ProfileIcon,
        text: 'Профіль',
    },
];
