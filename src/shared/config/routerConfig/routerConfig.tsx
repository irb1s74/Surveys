import {RouteProps} from 'react-router-dom';
import {Main} from "pages/Main";
import {NotFoundPage} from "pages/NotFoundPage";
import {Auth} from "pages/Auth";
import {Form} from "pages/Form";


export enum AppRoutes {
    NOT_FOUND = 'NOT_FOUND',
    AUTH = 'AUTH'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.AUTH]: '/',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.NOT_FOUND,
        element: <NotFoundPage/>,
    },
    [AppRoutes.AUTH]: {
        path: RoutePath.AUTH,
        element: <Auth/>,
    },
};


export enum AppRoutesPrivate {
    MAIN = 'MAIN',
    EDIT_FORM = 'EDIT_FORM',
    NOT_FOUND = 'NOT_FOUND'
}

export const RoutePathPrivate: Record<AppRoutesPrivate, string> = {
    [AppRoutesPrivate.MAIN]: '/',
    [AppRoutesPrivate.EDIT_FORM]: '/form/',// + id
    [AppRoutesPrivate.NOT_FOUND]: '*',
};

export const routeConfigPrivate: Record<AppRoutesPrivate, RouteProps> = {
    [AppRoutesPrivate.MAIN]: {
        path: RoutePathPrivate.MAIN,
        element: <Main/>,
    },
    [AppRoutesPrivate.NOT_FOUND]: {
        path: RoutePathPrivate.NOT_FOUND,
        element: <NotFoundPage/>,
    },
    [AppRoutesPrivate.EDIT_FORM]: {
        path: `${RoutePathPrivate.EDIT_FORM}:id`,
        element: <Form/>,
    },
}
