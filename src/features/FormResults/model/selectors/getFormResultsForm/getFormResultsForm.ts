import {StateSchema} from "app/providers/StoreProvider";
import {Form} from "entities/Form";

export const getFormResultsForm = (state: StateSchema) => state?.formResults?.form || {} as Form;
