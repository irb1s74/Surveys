import {createAsyncThunk} from "@reduxjs/toolkit";
import {User, userActions} from "entities/User";
import {USER_LOCALSTORAGE_KEY} from "shared/const/localstorage";
import {getUrl} from "shared/lib/getUrl/getUrl";
import axios from "axios";


interface LoginProps {
    username: string;
    password: string;
}

export const loginByEmail = createAsyncThunk<User, LoginProps, { rejectValue: string }>(
    'loginByEmail/loginByEmail',
    async ({username, password}, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:8000/login", {
                username,
                password
            },
            {
                baseURL: getUrl(),
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
