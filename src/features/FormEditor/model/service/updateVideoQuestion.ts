import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {getUrl} from "shared/lib/getUrl/getUrl";
import {Form} from "entities/Form";

interface updateVideoQuestionProps {
    token: string;
    questionId: string;
    files: any;
}

export const updateVideoQuestion = createAsyncThunk<Form, updateVideoQuestionProps, { rejectValue: string }>(
    "form/updateImageQuestion",
    async ({token, files, questionId}, thunkAPI) => {
        try {
            let formData = new FormData();
            for (let i = 0, file; i < files.length; i++) {
                file = files.item(i);
                formData.append('video', file);
            }
            formData.append('questionId', questionId);
            const response = await axios.post("questions/video",
                formData,
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
