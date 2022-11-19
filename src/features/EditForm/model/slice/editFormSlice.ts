import {createSlice} from "@reduxjs/toolkit";
import {EditFormSchema} from "../../model/types/editFormSchema";
import {getFormById} from "../service/getFormById";

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
                state.form = action.payload;
                state.isLoading = false;
            })
            .addCase(getFormById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export const {actions: editFormActions} = editFormSlice;
export const {reducer: editFormReducer} = editFormSlice;
