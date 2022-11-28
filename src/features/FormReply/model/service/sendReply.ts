import {createAsyncThunk} from "@reduxjs/toolkit";
import {Reply} from "entities/Reply";
import axios from "axios";
import {getUrl} from "shared/lib/getUrl/getUrl";

interface sendReplyProps {
    replyId: number;
    token: string;
    answers: Record<number, string | string[]>
}

export const saveReply = createAsyncThunk<Reply, sendReplyProps, { rejectValue: string }>("reply/sendReply",
    async ({token, replyId, answers}, thunkAPI) => {
        try {
            const response = await axios.post("answers/reply",
                {
                    replyId,
                    answers
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
