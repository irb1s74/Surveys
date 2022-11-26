import {StateSchema} from "app/providers/StoreProvider";
import {Reply} from "entities/Reply";

export const getFormReplyFoundReply = (state:StateSchema)=> state?.formReply?.reply || {} as Reply
