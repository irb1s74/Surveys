import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {getUrl} from "shared/lib/getUrl/getUrl";
import {Form} from "entities/Form";

interface deleteQuestionProps {
    token: string;
    questionId: number;
}

export const deleteQuestion = createAsyncThunk<Form, deleteQuestionProps, { rejectValue: string }>(
    "form/deleteQuestion",
    async ({token, questionId}, thunkAPI) => {
        try {
            const response = await axios.delete(`questions/delete/${questionId}`,
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
