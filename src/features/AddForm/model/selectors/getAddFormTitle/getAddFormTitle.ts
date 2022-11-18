import {StateSchema} from "app/providers/StoreProvider";

export const getAddFormTitle = (state: StateSchema) => state?.addForm?.title || ""
