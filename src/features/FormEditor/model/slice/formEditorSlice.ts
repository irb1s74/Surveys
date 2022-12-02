import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FormEditorSchema} from "../../model/types/formEditorSchema";
import {createQuestion} from "../service/createQuestion";
import {createVariant} from "../service/createVariant";
import {getFormById} from "entities/Form";

const initialState: FormEditorSchema = {
    form: undefined,
    isLoading: false,
    error: undefined
}

export const formEditorSlice = createSlice({
    name: "formEditor",
    initialState,
    reducers: {
        deleteQuestion: (state, action: PayloadAction<number>) => {
            state.form.questions = state.form.questions.filter((question) => question.id !== action.payload);
        },
        deleteVariant: (state, action: PayloadAction<{ questionId: number, variantId: number }>) => {
            const index = state.form.questions.findIndex((item) => item.id === action.payload.questionId)
            state.form.questions[index].variants =
                state.form.questions[index].variants.filter((variant) => variant.id !== action.payload.variantId);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFormById.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(getFormById.fulfilled, (state, action) => {
                state.form = action.payload;
                state.isLoading = false;
            })
            .addCase(getFormById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(createQuestion.fulfilled, (state, action) => {
                state.form = action.payload;
            })
            .addCase(createVariant.fulfilled, (state, action) => {
                state.form = action.payload;
            })

    }
})

export const {actions: formEditorActions} = formEditorSlice;
export const {reducer: formEditorReducer} = formEditorSlice;
