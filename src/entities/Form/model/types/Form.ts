import {Questions} from "./Questions";
import {Reply} from "entities/Reply";

export interface Form {
    id: number,
    title: string;
    userId: number
    questions: Questions[] | undefined
    reply?: Reply[]
}

export interface FormSchema {
    form: Form[],
    isLoading: boolean,
    error: string;
}
