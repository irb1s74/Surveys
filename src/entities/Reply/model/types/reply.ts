import {Answers} from "entities/Form";
import {User} from "entities/User";

export interface Reply {
    id: number;
    formId: number;
    userId: number;
    draft: boolean;
    answers: Answers[],
    user?: User
}
