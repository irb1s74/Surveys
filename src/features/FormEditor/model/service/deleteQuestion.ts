import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {getUrl} from "shared/lib/getUrl/getUrl";
import {formEditorActions} from "../slice/formEditorSlice";
import {Questions} from "entities/Form";

interface deleteQuestionProps {
    token: string;
    questionId: number;
}

export const deleteQuestion = createAsyncThunk<Questions, deleteQuestionProps, { rejectValue: string }>(
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
            thunkAPI.dispatch(formEditorActions.deleteQuestion(questionId))
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue("Произошла ошибка")
        }
    })
