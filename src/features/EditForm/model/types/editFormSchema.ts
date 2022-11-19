import {Form} from "entities/Form";

export interface EditFormSchema {
    form: Form
    isLoading: boolean;
    error: string;
}
