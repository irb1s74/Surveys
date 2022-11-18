import {Form} from "../types/Form";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {getUrl} from "shared/lib/getUrl/getUrl";
import {USER_LOCALSTORAGE_KEY} from "shared/const/localstorage";
import axios from "axios";
import {formActions} from "../slice/formSlice";

interface deleteFormProps {
    formId: number;
}

export const deleteForm = createAsyncThunk<Form[], deleteFormProps, { rejectValue: string }>(
    "form/delete",
    async ({formId}, thunkAPI) => {
        try {
            const user = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY));
            const response = await axios.delete(`forms/delete/${formId}`,
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
            thunkAPI.dispatch(formActions.deleteForm(formId));
        } catch (e) {
            return thunkAPI.rejectWithValue("Вы ввели неверный логин или пароль")
        }
    }
)
