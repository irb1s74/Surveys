import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AddFormSchema} from "../types/addFormSchema";
import {createForm} from "features/AddForm/model/services/createForm";

const initialState: AddFormSchema = {
    isLoading: false,
    title: '',
    error: undefined
}

export const addFormSlice = createSlice({
    name: 'addForm',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createForm.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(createForm.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(createForm.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
    }
})

export const {actions: addFormActions} = addFormSlice
export const {reducer: addFormReducer} = addFormSlice
