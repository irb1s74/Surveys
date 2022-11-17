import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AuthSchema} from "../types/authSchema";
import {regByEmail} from "../../model/services/regByEmail";
import {loginByEmail} from "../../model/services/loginByEmail";


const initialState: AuthSchema = {
    isLoading: false,
    full_name: '',
    email: '',
    password: '',
    error: undefined,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setFullName: (state, action: PayloadAction<string>) => {
            state.full_name = action.payload
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(regByEmail.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(regByEmail.fulfilled, (state, action) => {
                state.error = undefined;
                state.isLoading = false;
            })
            .addCase(regByEmail.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(loginByEmail.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginByEmail.fulfilled, (state, action) => {
                state.error = undefined;
                state.isLoading = false;
            })
            .addCase(loginByEmail.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
    }
})

export const {actions: authActions} = authSlice;
export const {reducer: authReducer} = authSlice;
