import {FC, ReactNode} from 'react';
import {Provider} from "react-redux";
import {createReduxStore} from "../config/store";
import {StateSchema} from "app/providers/StoreProvider/config/StateSchema";
import {DeepPartial, ReducersMapObject} from "@reduxjs/toolkit";

interface StoreProviderProps {
    children?: ReactNode,
    initialStore?: DeepPartial<StateSchema>
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider: FC<StoreProviderProps> = ({children, initialStore, asyncReducers}) => {
    const store = createReduxStore(initialStore as StateSchema);
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
