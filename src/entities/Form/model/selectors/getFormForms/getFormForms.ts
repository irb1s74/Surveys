import {StateSchema} from "app/providers/StoreProvider";

export const getFormForms = (state: StateSchema) => state.forms?.form || []
