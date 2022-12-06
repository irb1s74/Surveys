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
import ReactPlayer from "react-player/lazy";


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
                {data.type === "radio" || data.type === "checkbox" ? (
                    <Stack direction="column">
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
                    </Stack>
                ) : data.type === "text" ? (
                    <Stack direction="column">
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
                    </Stack>
                ) : data.type === "image" ? (
                    <Stack direction="column">
                        {data.required && (
                            <Typography sx={{mb: '20px'}} color="error" variant="h5">*</Typography>
                        )}
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
                    </Stack>
                ) : data.type === "video" ? (
                    <Stack direction="column">
                        {data.required && (
                            <Typography sx={{mb: '20px'}} color="error" variant="h5">*</Typography>
                        )}
                        {data.title && (
                            <ReactPlayer
                                className='react-player'
                                url={`${data.title}`}
                                width='100%'
                                height='600px'
                                volume={0.1}
                            />
                        )}
                        <TextField
                            name={`${data.id}`}
                            sx={{mt: '20px'}}
                            value={value}
                            onChange={handleChange}
                            label="Мой Ответ"
                            fullWidth
                        />
                    </Stack>
                ): (
                    <div/>
                )}
                {error && (
                    <Typography color="error">{error}</Typography>
                )}
            </CardContent>
        </Card>
    );
}

export default memo(Question);
