import {Variants} from "./Variants";

export interface Questions {
    id: number;
    formId: number;
    title: string | null;
    type: string;
    required: boolean;
    variants: Variants[] | undefined;
}
