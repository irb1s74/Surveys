import {StateSchema} from "app/providers/StoreProvider";

export const getAddFormError = (state: StateSchema) => state?.addForm?.error || undefined;
