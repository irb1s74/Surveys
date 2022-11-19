import {createAsyncThunk} from "@reduxjs/toolkit";
import {getUrl} from "shared/lib/getUrl/getUrl";
import {Form} from "entities/Form";
import axios from "axios";

interface getFormByIdProps {
    formId: string;
    token: string;
}

export const getFormById = createAsyncThunk<Form, getFormByIdProps, { rejectValue: string }>(
    "form/getFormById",
    async ({formId, token}, thunkAPI) => {
        try {
            const response = await axios.get(`forms/${formId}`,
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

        }
    }
)
