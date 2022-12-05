import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {getUrl} from "shared/lib/getUrl/getUrl";
import {Form} from "entities/Form";

interface updateImageQuestionProps {
    token: string;
    questionId: string;
    files: any;
}

export const updateImageQuestion = createAsyncThunk<Form, updateImageQuestionProps, { rejectValue: string }>(
    "form/updateImageQuestion",
    async ({token, files, questionId}, thunkAPI) => {
        try {
            let formData = new FormData();
            for (let i = 0, file; i < files.length; i++) {
                file = files.item(i);
                formData.append('image', file);
            }
            formData.append('questionId', questionId);
            const response = await axios.post("questions/image",
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
