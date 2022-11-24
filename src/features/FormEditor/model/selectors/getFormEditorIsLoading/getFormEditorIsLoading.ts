import {StateSchema} from "app/providers/StoreProvider";

export const getFormEditorIsLoading = (state: StateSchema) => state?.formEditor?.isLoading;
