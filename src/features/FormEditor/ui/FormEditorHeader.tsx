import {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import {Card, CardContent, Stack, TextField} from "@mui/material";
import {Form} from "entities/Form";
import useDebounce from "shared/lib/useDebounce/useDebounce";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

interface FormEditorHeaderProps {
    formData: Form;
    onUpdate: (form: Form) => void
}

const FormEditorHeader: FC<FormEditorHeaderProps> = ({formData, onUpdate}) => {
    const [form, setForm] = useState(formData);
    const debouncedValue = useDebounce(form, 650)
    const isChanged = useRef(false);

    useEffect(() => {
        if (isChanged.current) {
            onUpdate(form);
        }
    }, [debouncedValue])

    const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        isChanged.current = true;
        setForm({...form, title: event.target.value})
    }
    const handleChangeData = (value: string) => {
        isChanged.current = true;
        setForm({...form, date: value})
    }

    return (
        <Card>
            <CardContent>
                <TextField
                    variant="filled"
                    label="Название формы"
                    value={form.title}
                    onChange={handleChangeTitle}
                    color="secondary"
                    fullWidth
                    focused
                />
                <Stack
                    direction="row"
                    sx={{mt: "20px", width: "100%"}}
                    alignContent="center"
                    justifyContent="flex-end"
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Дата окончания"
                            value={form.date}
                            onChange={(newValue) => {
                                handleChangeData(newValue);
                            }}
                        />
                    </LocalizationProvider>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default FormEditorHeader;
