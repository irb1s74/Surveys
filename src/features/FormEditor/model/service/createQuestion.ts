import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {getUrl} from "shared/lib/getUrl/getUrl";
import {Form} from "entities/Form";

interface createQuestionProps {
    token: string;
    formId: string;
    type: string;
    title: string;
}

export const createQuestion = createAsyncThunk<Form, createQuestionProps, { rejectValue: string }>(
    "form/createQuestion",
    async ({token, formId, title, type}, thunkAPI) => {
        try {
            const response = await axios.post("questions/create",
                {
                    formId,
                    title,
                    type
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
