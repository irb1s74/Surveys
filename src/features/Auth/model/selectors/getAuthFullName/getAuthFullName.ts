import {StateSchema} from "app/providers/StoreProvider";

export const getAuthFullName = (state: StateSchema) => state?.authForm?.full_name || ""
