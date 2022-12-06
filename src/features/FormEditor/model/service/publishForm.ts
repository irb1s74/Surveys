import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {getUrl} from "shared/lib/getUrl/getUrl";
import {Form} from "entities/Form";

interface publishFormProps {
    formId: number;
    token: string;
}

export const publishForm = createAsyncThunk<Form, publishFormProps, { rejectValue: string }>(
    "form/publishForm",
    async ({formId, token}, thunkAPI) => {
        try {
            const response = await axios.get(`forms/${formId}/publish`,
                {
                    baseURL: getUrl,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (!response.data) {
                throw new Error();
            }
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue("Произошла ошибка")
        }
    })
