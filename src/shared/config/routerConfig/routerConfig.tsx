import {RouteProps} from 'react-router-dom';
import {MainPage} from "pages/MainPage";
import {NotFoundPage} from "pages/NotFoundPage";
import {AuthPage} from "pages/AuthPage";
import {FormAdminPage} from "pages/FormAdminPage";
import {FormPage} from "pages/FormPage";
import {FormResultsPage} from "pages/FormResultsPage";


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
        element: <AuthPage/>,
    },
};


export enum AppRoutesPrivate {
    MAIN = 'MAIN',
    EDIT_FORM = 'EDIT_FORM',
    FORM = 'FORM',
    FORM_RESULTS = 'FORM_RESULTS',
    NOT_FOUND = 'NOT_FOUND'
}

export const RoutePathPrivate: Record<AppRoutesPrivate, string> = {
    [AppRoutesPrivate.MAIN]: '/',
    [AppRoutesPrivate.EDIT_FORM]: '/form/edit/',// + id
    [AppRoutesPrivate.FORM]: '/form/',// + id
    [AppRoutesPrivate.FORM_RESULTS]: '/form/results/',// + id
    [AppRoutesPrivate.NOT_FOUND]: '*',
};

export const routeConfigPrivate: Record<AppRoutesPrivate, RouteProps> = {
    [AppRoutesPrivate.MAIN]: {
        path: RoutePathPrivate.MAIN,
        element: <MainPage/>,
    },
    [AppRoutesPrivate.NOT_FOUND]: {
        path: RoutePathPrivate.NOT_FOUND,
        element: <NotFoundPage/>,
    },
    [AppRoutesPrivate.EDIT_FORM]: {
        path: `${RoutePathPrivate.EDIT_FORM}:id`,
        element: <FormAdminPage/>,
    },
    [AppRoutesPrivate.FORM]: {
        path: `${RoutePathPrivate.FORM}:id`,
        element: <FormPage/>,
    },
    [AppRoutesPrivate.FORM_RESULTS]: {
        path: `${RoutePathPrivate.FORM_RESULTS}:id`,
        element: <FormResultsPage/>,
    },
}
