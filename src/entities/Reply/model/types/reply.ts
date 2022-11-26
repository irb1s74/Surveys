import {Answers} from "entities/Form";

export interface Reply {
    id: number;
    formId: number;
    userId: number;
    draft: boolean;
    answers: Answers[]
}
