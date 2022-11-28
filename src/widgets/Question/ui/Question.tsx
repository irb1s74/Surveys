import {memo} from 'react';
import {
    Card,
    CardContent, CardHeader,
    Stack,
    TextField, Typography,
} from "@mui/material";
import {Questions} from "entities/Form";
import Variant from "shared/ui/Variant/Variant";


interface QuestionEditorProps {
    data: Questions,
    value: string | string[],
    error?: string,
    handleChange: any
}

const Question = ({
    data,
    value,
    handleChange,
    error
}: QuestionEditorProps) => {

    return (
        <Card>
            <CardHeader title={`${data.title || ""} ${data.required && "*"}`}/>
            <CardContent>
                <Stack direction="column">
                    {data.type === "radio" || data.type === "checkbox" ? (
                        data.variants && data.variants.map((variant) => (
                            <Variant
                                key={variant.id}
                                variant={variant}
                                type={data.type}
                                editor={false}
                                onChange={handleChange}
                                value={value}
                            />
                        ))
                    ) : data.type === "text" ? (
                        <TextField name={`${data.id}`} value={value} onChange={handleChange} label="Мой Ответ" fullWidth/>
                    ) : (
                        <div/>
                    )}
                </Stack>
                {error && (
                    <Typography color="error">{error}</Typography>
                )}
            </CardContent>
        </Card>
    );
}

export default memo(Question);
