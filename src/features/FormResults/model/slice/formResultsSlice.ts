import {createSlice} from "@reduxjs/toolkit";
import {FormResultsSchema} from '../types/formResultsSchema'
import {getFormById} from "entities/Form";

const initialState: FormResultsSchema = {
    form: undefined,
    isLoading: false,
    error: undefined
}

export const formResultsSlice = createSlice(
    {
        name: "formResults",
        initialState,
        reducers: {},
        extraReducers: (builder)=>{
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
    }
)
export const {actions: formResultsActions} = formResultsSlice;
export const {reducer: formResultsReducer} = formResultsSlice;
