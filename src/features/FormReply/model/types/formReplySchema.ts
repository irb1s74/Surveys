import {Form} from "entities/Form";

export interface FormReplySchema {
    form: Form
    isLoading: boolean;
    error: string;
}
