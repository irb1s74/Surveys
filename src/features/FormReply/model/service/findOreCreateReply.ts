import {createAsyncThunk} from "@reduxjs/toolkit";
import {Reply} from "entities/Reply";
import {getUrl} from "shared/lib/getUrl/getUrl";
import {getFormById} from "entities/Form";
import axios from "axios";

interface findOreCreateReplyProps {
    formId: string,
    token: string;
}

export const findOreCreateReply = createAsyncThunk<Reply, findOreCreateReplyProps, { rejectValue: string }>(
    "reply/findOreCreateReply",
    async ({token, formId}, thunkAPI) => {
        try {
            await thunkAPI.dispatch(getFormById({formId, token}))
            const response = await axios.post("answers",
                {
                    formId
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
