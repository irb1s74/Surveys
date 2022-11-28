import * as yup from "yup";
import {Questions} from "entities/Form";

export function createYupSchema(schema: any, question: Questions) {
    const validationType = question.type === "checkbox" ? "array" : "string";
    const validations = [];
    if (!(yup as any)[validationType]) {
        return schema;
    }

    let validator = (yup as any)[validationType]();
    if (question.required && validationType !== "array") {
        validations.push({type: "required", params: ["Это обязательный вопрос"]});
    }

    validations.forEach((validation: any) => {
        const {params, type} = validation;
        if (!validator[type]) {
            return;
        }
        validator = validator[type](...params);
    });

    schema[question.id] = validator;
    return schema;
}
