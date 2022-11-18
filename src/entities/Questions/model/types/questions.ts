export interface Questions {
    id: number;
    formId: number;
    title: string | null;
    type: string;
    correct: boolean;
    answer: string | null;
}
