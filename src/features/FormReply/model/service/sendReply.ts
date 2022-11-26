import {createAsyncThunk} from "@reduxjs/toolkit";
import {Reply} from "entities/Reply";
import axios from "axios";
import {getUrl} from "shared/lib/getUrl/getUrl";

interface sendReplyProps {
    replyId: number
    token: string;
}

export const sendReply = createAsyncThunk<Reply, sendReplyProps, { rejectValue: string }>("reply/sendReply",
    async ({token, replyId}, thunkAPI) => {
        try {
            const response = await axios.post("answers/reply",
                {
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
