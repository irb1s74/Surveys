import {StateSchema} from "app/providers/StoreProvider";

export const getAddFormIsLoading = (state: StateSchema) => state?.addForm?.isLoading || false;
