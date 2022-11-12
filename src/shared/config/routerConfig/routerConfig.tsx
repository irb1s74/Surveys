import {RouteProps} from 'react-router-dom';
import {PageLoader} from "widgets/PageLoader";
import {Main} from "pages/Main";


export enum AppRoutes {
    MAIN = 'MAIN',
    NOT_FOUND = 'NOT_FOUND'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.MAIN,
        element: <Main/>,
    },

    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.NOT_FOUND,
        element: <PageLoader/>,
    },
};
