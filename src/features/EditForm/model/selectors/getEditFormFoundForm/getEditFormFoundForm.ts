import {StateSchema} from "app/providers/StoreProvider";
import {Form} from "entities/Form";

export const getEditFormFoundForm = (state: StateSchema) => state?.editForm?.form || {} as Form;
