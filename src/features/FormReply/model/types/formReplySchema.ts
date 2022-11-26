import {Form} from "entities/Form";
import {Reply} from "entities/Reply";

export interface FormReplySchema {
    form: Form,
    reply: Reply,
    isLoading: boolean;
    error: string;
}
