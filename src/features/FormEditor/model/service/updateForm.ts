import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {getUrl} from "shared/lib/getUrl/getUrl";
import {Form} from "entities/Form";

interface updateFormProps {
    data: {
        formId: number;
        title: string;
        date: string;
    }
    token: string
}

export const updateForm = createAsyncThunk<Form, updateFormProps, { rejectValue: string }>(
    "form/updateForm",
    async ({data, token}, thunkAPI) => {
        try {
            const response = await axios.post("forms/update",
                data,
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
