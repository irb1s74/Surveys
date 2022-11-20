import {createSlice} from "@reduxjs/toolkit";
import {EditFormSchema} from "../../model/types/editFormSchema";
import {getFormById} from "../service/getFormById";
import {createQuestion} from "../service/createQuestion";
import {deleteQuestion} from "../service/deleteQuestion";
import {createVariant} from "features/EditForm/model/service/createVariant";

const initialState: EditFormSchema = {
    form: undefined,
    isLoading: false,
    error: undefined
}

export const editFormSlice = createSlice({
    name: "editForm",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFormById.pending, (state, action) => {
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
            .addCase(deleteQuestion.fulfilled, (state, action) => {
                state.form = action.payload;
            })
            .addCase(createVariant.fulfilled, (state, action) => {
                state.form = action.payload;
            })

    }
})

export const {actions: editFormActions} = editFormSlice;
export const {reducer: editFormReducer} = editFormSlice;
