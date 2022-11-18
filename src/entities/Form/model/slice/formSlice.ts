import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Form, FormSchema} from "../types/Form";
import {getForms} from "../service/getForms";

const initialState: FormSchema = {
    form: [],
    isLoading: false,
    error: undefined
}

export const formSlice = createSlice(
    {
        name: "form",
        initialState,
        reducers: {
            setForm: (state, action: PayloadAction<Form[]>) => {
                state.form = action.payload;
            },
            addForm: (state, action: PayloadAction<Form>) => {
                state.form.push(action.payload);
            },
            deleteForm: (state, action: PayloadAction<number>) => {
                state.form = state.form.filter((form) => form.id !== action.payload);
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(getForms.pending, (state, action) => {
                    state.isLoading = true;
                    state.error = undefined;
                })
                .addCase(getForms.fulfilled, (state, action) => {
                    state.form = action.payload;
                    state.isLoading = false;
                })
                .addCase(getForms.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                })
        }
    }
)

export const {actions: formActions} = formSlice;
export const {reducer: formReducer} = formSlice;
