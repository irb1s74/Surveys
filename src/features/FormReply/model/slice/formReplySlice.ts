import {createSlice} from "@reduxjs/toolkit";
import {FormReplySchema} from "../types/formReplySchema";
import {getFormById} from "entities/Form";
import {findOreCreateReply} from "features/FormReply/model/service/findOreCreateReply";

const initialState: FormReplySchema = {
    form: undefined,
    reply: undefined,
    error: undefined,
    isLoading: false
}

export const formReplySlice = createSlice({
    name: "formReply",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFormById.fulfilled, (state, action) => {
                state.form = action.payload;
            })
            .addCase(findOreCreateReply.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(findOreCreateReply.fulfilled, (state, action) => {
                state.reply = action.payload;
                state.isLoading = false;
            })
            .addCase(findOreCreateReply.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
    }
})
export const {actions: formReplyActions} = formReplySlice;
export const {reducer: formReplyReducer} = formReplySlice;
