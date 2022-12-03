import {createAsyncThunk} from "@reduxjs/toolkit";
import {Reply} from "entities/Reply";
import axios, {AxiosResponse} from "axios";
import {getUrl} from "shared/lib/getUrl/getUrl";

interface downLoadResultsProps {
    formId: string,
    token: string
}

export const downLoadResults = createAsyncThunk<Reply, downLoadResultsProps, { rejectValue: string }>(
    "reply/downLoadResults",
    async ({formId, token}, thunkAPI) => {
        try {
            await axios.post("answers/excel",
                {
                    formId
                },
                {
                    baseURL: getUrl,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    responseType: "blob",
                }
            ).then(async (response) => {
                const isJsonBlob = (data: AxiosResponse) => data instanceof Blob && data.type === "application/json";
                const responseData = isJsonBlob(response?.data) ? await (response?.data)?.text() : response?.data || {};
                const downloadUrl = window.URL.createObjectURL(responseData);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = "results.xlsx";
                document.body.appendChild(link);
                link.click();
                link.remove();
            });
        } catch (e) {
            return thunkAPI.rejectWithValue("Произошла ошибка")
        }
    })
