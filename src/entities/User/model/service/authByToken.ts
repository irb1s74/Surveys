import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from '../types/user'
import {userActions} from "../slice/userSlice";
import {USER_LOCALSTORAGE_KEY} from "shared/const/localstorage";
import {getUrl} from "shared/lib/getUrl/getUrl";
import axios from "axios";

export const authByToken = createAsyncThunk<User, undefined, { rejectValue: string }>(
    'user/authByToken',
    async ({}, thunkAPI) => {
        try {
            const user = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY));
            const response = await axios.get("auth/ref",
                {
                    baseURL: getUrl,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            )
            if (!response.data) {
                throw new Error();
            }
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
            thunkAPI.dispatch(userActions.setAuthData(response.data))
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue("Вы ввели неверный логин или пароль")
        }
    }
)
