import {Form} from "entities/Form";

export interface FormResultsSchema {
    form: Form
    isLoading: boolean;
    error: string;
}
