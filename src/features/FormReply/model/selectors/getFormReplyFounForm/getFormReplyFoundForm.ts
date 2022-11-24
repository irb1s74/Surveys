import {StateSchema} from "app/providers/StoreProvider";
import {Form} from "entities/Form";

export const getFormReplyFoundForm = (state: StateSchema) => state?.formReply?.form || {} as Form;
