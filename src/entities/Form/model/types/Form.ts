import {Questions} from "./Questions";

export interface Form {
    id: number,
    title: string;
    userId: number
    questions: Questions[] | undefined
}

export interface FormSchema {
    form: Form[],
    isLoading: boolean,
    error: string;
}
