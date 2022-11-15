import {RouteProps} from 'react-router-dom';
import {Main} from "pages/Main";
import {EditForm} from "pages/EditForm";
import {NotFoundPage} from "pages/NotFoundPage";
import {Auth} from "pages/Auth";



export enum AppRoutes {
    MAIN = 'MAIN',
    NOT_FOUND = 'NOT_FOUND',
    EDIT_FORM = 'EDIT_FORM',
    AUTH = 'AUTH'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.EDIT_FORM]: '/edit',
    [AppRoutes.AUTH]: '/auth',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.MAIN,
        element: <Main/>,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.NOT_FOUND,
        element: <NotFoundPage/>,
    },
    [AppRoutes.EDIT_FORM]: {
        path: RoutePath.EDIT_FORM,
        element: <EditForm/>,
    },
    [AppRoutes.AUTH]: {
        path: RoutePath.AUTH,
        element: <Auth/>,
    },
};
