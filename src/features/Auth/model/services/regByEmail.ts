import {createAsyncThunk} from "@reduxjs/toolkit";
import {User, userActions} from "entities/User";
import {USER_LOCALSTORAGE_KEY} from "shared/const/localstorage";
import {getUrl} from "shared/lib/getUrl/getUrl";
import axios from "axios";


interface RegProps {
    email: string;
    full_name: string;
    password: string;
}

export const regByEmail = createAsyncThunk<User, RegProps, { rejectValue: string }>(
    'auth/regByEmail',
    async ({email, password, full_name}, thunkAPI) => {
        try {
            const response = await axios.post("auth/reg", {
                email,
                full_name,
                password
            },
            {
                baseURL: getUrl,
            })
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
