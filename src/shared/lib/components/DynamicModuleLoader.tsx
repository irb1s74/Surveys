import {ReactNode, useEffect, Fragment} from 'react';
import {Reducer} from "@reduxjs/toolkit";
import {useStore} from "react-redux";
import {ReduxStoreWithManager, StateSchemaKey} from "app/providers/StoreProvider/config/StateSchema";

export type ReducersList = {
    [reducerKey in StateSchemaKey]?: Reducer;
}

type ReducerListEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
    children: ReactNode;
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
    const {children, removeAfterUnmount = true, reducers} = props;
    const store = useStore() as ReduxStoreWithManager;

    useEffect(() => {
        console.log(Object.entries(reducers))
        Object.entries(reducers).forEach(([reducerKey, reducer]: ReducerListEntry) => {
            store.reducerManager.add(reducerKey, reducer);
        })

        if (removeAfterUnmount) {
            return () => {
                Object.entries(reducers).forEach(([reducerKey]: ReducerListEntry) => {
                    store.reducerManager.remove(reducerKey);
                })
            }
        }
    }, [])
    return (
        <Fragment>
            {children}
        </Fragment>
    );
};

