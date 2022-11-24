import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {getUrl} from "shared/lib/getUrl/getUrl";
import {Variants} from "entities/Form";

interface updateVariantProps {
    data: {
        variantId: number;
        questionId: number;
        title: string;
        correct: boolean;
    }
    token: string
}

export const updateVariant = createAsyncThunk<Variants, updateVariantProps, { rejectValue: string }>(
    "form/updateVariant",
    async ({data, token}, thunkAPI) => {
        try {
            const response = await axios.post("variant/update",
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
