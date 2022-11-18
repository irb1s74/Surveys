import {createAsyncThunk} from "@reduxjs/toolkit";
import {Form, formActions} from "entities/Form";
import axios from "axios";
import {getUrl} from "shared/lib/getUrl/getUrl";

interface CreateFormProps {
    title: string,
    token: string;
}

export const createForm = createAsyncThunk<Form, CreateFormProps, { rejectValue: string }>(
    "form/create",
    async ({title, token}, thunkAPI) => {
        try {
            const response = await axios.post("forms/create", {
                title,
            },
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
            thunkAPI.dispatch(formActions.addForm(response.data))
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue("Заполните форму")
        }
    }
)
