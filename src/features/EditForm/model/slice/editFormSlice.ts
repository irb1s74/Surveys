import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EditFormSchema} from "../../model/types/editFormSchema";
import {getFormById} from "../service/getFormById";
import {createQuestion} from "../service/createQuestion";
import {createVariant} from "features/EditForm/model/service/createVariant";

const initialState: EditFormSchema = {
    form: undefined,
    isLoading: false,
    error: undefined
}

export const editFormSlice = createSlice({
    name: "editForm",
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
                state.isLoading = false;
                state.form = action.payload;
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

export const {actions: editFormActions} = editFormSlice;
export const {reducer: editFormReducer} = editFormSlice;
