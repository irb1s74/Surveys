import {StateSchema} from "app/providers/StoreProvider";

export const getEditFormIsLoading = (state: StateSchema) => state?.editForm?.isLoading;
