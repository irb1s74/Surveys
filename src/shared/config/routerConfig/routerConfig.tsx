import {RouteProps} from 'react-router-dom';
import {PageLoader} from "widgets/PageLoader";
import {Main} from "pages/Main";
import {EditForm} from "pages/EditForm";


export enum AppRoutes {
    MAIN = 'MAIN',
    NOT_FOUND = 'NOT_FOUND',
    EDIT_FORM = 'EDIT_FORM'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.EDIT_FORM]: '/edit',
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
    [AppRoutes.EDIT_FORM]: {
        path: RoutePath.EDIT_FORM,
        element: <EditForm/>,
    },
};
