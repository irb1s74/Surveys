import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {LoginSchema} from "../types/loginSchema";
import {loginByEmail} from "../services/loginByEmail";


const initialState: LoginSchema = {
    isLoading: false,
    username: '',
    password: '',
    error: undefined,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
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

export const {actions: authActions} = authSlice
export const {reducer: authReducer} = authSlice

