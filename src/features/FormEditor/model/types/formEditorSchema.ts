import {Form} from "entities/Form";

export interface FormEditorSchema {
    form: Form
    isLoading: boolean;
    error: string;
}
