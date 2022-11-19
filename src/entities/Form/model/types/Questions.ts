import {Variant} from "./Variant";

export interface Questions {
    id: number;
    formId: number;
    title: string | null;
    type: string;
    multipleAnswers: boolean;
    variants: Variant[] | undefined;
}
