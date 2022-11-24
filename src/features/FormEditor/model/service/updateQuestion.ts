import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {getUrl} from "shared/lib/getUrl/getUrl";
import {Form} from "entities/Form";

interface updateQuestionProps {
    data: {
        questionId: number;
        title: string;
        type: string;
        required: boolean;
    }
    token: string
}

export const updateQuestion = createAsyncThunk<Form, updateQuestionProps, { rejectValue: string }>(
    "form/updateQuestion",
    async ({data,token}, thunkAPI) => {
        try {
            const response = await axios.post("questions/update",
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
