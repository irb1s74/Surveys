import {AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject} from "@reduxjs/toolkit";
import {AuthSchema} from "features/Auth";
import {UserSchema} from "entities/User";
import {AddFormSchema} from "features/AddForm";
import {FormSchema} from "entities/Form/model/types/Form";

export interface StateSchema {
    user: UserSchema,
    forms: FormSchema
    authForm?: AuthSchema,
    addForm?: AddFormSchema
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

