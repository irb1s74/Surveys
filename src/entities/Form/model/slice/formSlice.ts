import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Form, FormSchema} from "../types/Form";

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
                state.form = action.payload
            }
        },
        extraReducers: {}
    }
)

export const {actions: formActions} = formSlice
export const {reducer: formReducer} = formSlice
