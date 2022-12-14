import {createAsyncThunk} from "@reduxjs/toolkit";
import {Form} from "../types/Form";
import axios from "axios";
import {getUrl} from "shared/lib/getUrl/getUrl";
import {USER_LOCALSTORAGE_KEY} from "shared/const/localstorage";



export const getForms = createAsyncThunk<Form[], undefined, { rejectValue: string }>(
    "form/getForms",
    async ({}, thunkAPI) => {
        try {
            const user = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY));
            const response = await axios.get("forms",
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

            return response.data
        }catch (e) {
            return thunkAPI.rejectWithValue("Вы ввели неверный логин или пароль")
        }
    }
)
