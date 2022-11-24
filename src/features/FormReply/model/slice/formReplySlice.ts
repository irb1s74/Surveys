import {createSlice} from "@reduxjs/toolkit";
import {FormReplySchema} from "../types/formReplySchema";
import {getFormById} from "entities/Form";

const initialState: FormReplySchema = {
    form: undefined,
    error: undefined,
    isLoading: false
}

export const formReplySlice = createSlice({
    name: "formReply",
    initialState,
    reducers: {},
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
    }
})
export const {actions: formReplyActions} = formReplySlice;
export const {reducer: formReplyReducer} = formReplySlice;
