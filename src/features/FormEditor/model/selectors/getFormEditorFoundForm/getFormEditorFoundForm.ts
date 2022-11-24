import {StateSchema} from "app/providers/StoreProvider";
import {Form} from "entities/Form";

export const getFormEditorFoundForm = (state: StateSchema) => state?.formEditor?.form || {} as Form;
