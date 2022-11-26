import {createAsyncThunk} from "@reduxjs/toolkit";
import {Reply} from "entities/Reply";
import axios from "axios";
import {getUrl} from "shared/lib/getUrl/getUrl";

interface createAnswersProps {
    questionId: number;
    title: string;
    replyId: number
    token: string;
}

export const createAnswers = createAsyncThunk<Reply, createAnswersProps, { rejectValue: string }>("reply/createAnswers",
    async ({token, questionId, title, replyId}, thunkAPI) => {
        try {
            const response = await axios.post("answers/create",
                {
                    questionId,
                    title,
                    replyId
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
