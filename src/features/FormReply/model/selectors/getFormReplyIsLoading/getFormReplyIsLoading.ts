import {StateSchema} from "app/providers/StoreProvider";

export const getFormReplyIsLoading = (state:StateSchema) =>  state?.formReply?.isLoading;
