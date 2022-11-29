import {StateSchema} from "app/providers/StoreProvider";

export const getFormResultsIsLoading = (state: StateSchema) => state?.formResults?.isLoading;
