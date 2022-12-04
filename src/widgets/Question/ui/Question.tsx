import {Fragment, memo} from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Stack,
    TextField, Typography,
} from "@mui/material";
import {Questions} from "entities/Form";
import Variant from "shared/ui/Variant/Variant";
import {getUrl} from "shared/lib/getUrl/getUrl";


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
            <CardContent>
                <Stack direction="column">
                    {data.type === "radio" || data.type === "checkbox" ? (
                        <Fragment>
                            <Stack direction="row">
                                <Typography sx={{mb: '20px'}} variant="h5">{data.title}</Typography>
                                {data.required && (
                                    <Typography sx={{mb: '20px'}} color="error" variant="h5">*</Typography>
                                )}
                            </Stack>
                            {data.variants && data.variants.map((variant) => (
                                <Variant
                                    key={variant.id}
                                    variant={variant}
                                    type={data.type}
                                    editor={false}
                                    onChange={handleChange}
                                    value={value}
                                />
                            ))}
                        </Fragment>

                    ) : data.type === "text" ? (
                        <Fragment>
                            <Stack direction="row">
                                <Typography sx={{mb: '20px'}} variant="h5">{data.title}</Typography>
                                {data.required && (
                                    <Typography sx={{mb: '20px'}} color="error" variant="h5">*</Typography>
                                )}
                            </Stack>
                            <TextField
                                name={`${data.id}`}
                                value={value}
                                onChange={handleChange}
                                label="Мой Ответ"
                                fullWidth
                            />
                        </Fragment>
                    ) : data.type === "image" ? (
                        <Fragment>
                            {data.title && (
                                <CardMedia
                                    component="img"
                                    height="400"
                                    image={`${getUrl}questions/${data.title}`}
                                    alt={`${data.id}`}
                                    sx={{mb: '20px'}}
                                />
                            )}
                            <TextField
                                name={`${data.id}`}
                                value={value}
                                onChange={handleChange}
                                label="Мой Ответ"
                                fullWidth
                            />
                        </Fragment>
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
