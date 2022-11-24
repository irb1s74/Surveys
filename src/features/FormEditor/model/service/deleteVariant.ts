import {createAsyncThunk} from "@reduxjs/toolkit";
import {getUrl} from "shared/lib/getUrl/getUrl";
import {Form} from "entities/Form";
import axios from "axios";
import {formEditorActions} from "features/FormEditor";

interface deleteVariantProps {
    token: string;
    variantId: number;
    questionId: number;
}

export const deleteVariant = createAsyncThunk<Form, deleteVariantProps, { rejectValue: string }>(
    "form/deleteVariant",
    async ({token, variantId, questionId}, thunkAPI) => {
        try {
            const response = await axios.delete(`variant/delete/${variantId}`,
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
            thunkAPI.dispatch(formEditorActions.deleteVariant({questionId, variantId}))
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue("Произошла ошибка")
        }
    })
