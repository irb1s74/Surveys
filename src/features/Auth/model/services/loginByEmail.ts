import {createAsyncThunk} from "@reduxjs/toolkit";
import {User, userActions} from "entities/User";
import {USER_LOCALSTORAGE_KEY} from "shared/const/localstorage";
import {getUrl} from "shared/lib/getUrl/getUrl";
import axios from "axios";


interface LoginProps {
    email: string;
    password: string;
}

export const loginByEmail = createAsyncThunk<User, LoginProps, { rejectValue: string[] }>(
    'loginByEmail/loginByEmail',
    async ({email, password}, thunkAPI) => {
        try {
            const response = await axios.post("auth/login", {
                email,
                password
            },
            {
                baseURL: getUrl,
            }
            )
            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
            thunkAPI.dispatch(userActions.setAuthData(response.data))

            return response.data
        } catch (e) {
            console.log(e.response)
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)
