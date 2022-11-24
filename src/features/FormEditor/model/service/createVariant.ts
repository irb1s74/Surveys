import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {getUrl} from "shared/lib/getUrl/getUrl";
import {Form} from "entities/Form";

interface createQuestionProps {
    questionId: number;
    token: string;
}

export const createVariant = createAsyncThunk<Form, createQuestionProps, { rejectValue: string }>(
    "form/createVariant",
    async ({questionId, token}, thunkAPI) => {
        try {
            const response = await axios.post("variant/create",
                {
                    questionId
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
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue("Произошла ошибка")
        }
    })
