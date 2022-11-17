import {StateSchema} from "app/providers/StoreProvider/config/StateSchema";

export const getAuthFullName = (state: StateSchema) => state?.authForm?.full_name || ""
