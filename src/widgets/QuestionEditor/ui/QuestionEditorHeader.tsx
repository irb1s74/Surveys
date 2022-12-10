import {ChangeEvent, FC, useState} from 'react';
import {Button, MenuItem, Select, SelectChangeEvent, Stack, TextField} from "@mui/material";

interface QuestionHeaderProps {
    title: string;
    type: string;
    setTitle: (title: string) => void;
    setType: (type: string) => void;
    handleOpenInput: () => void
}

export const QuestionEditorHeader: FC<QuestionHeaderProps> = ({type, setType, title, setTitle, handleOpenInput}) => {
    const [open, setOpen] = useState(false);

    const handleChangeType = (event: SelectChangeEvent) => {
        setType(event.target.value);
    };
    const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };


    return (
        <Stack direction="row" sx={{mb: "20px", width: "100%"}} justifyContent="space-between">
            {type === "video" ? (
                <Button size="small" variant="contained" onClick={handleOpenInput} color="secondary">
                    Выбрать видео
                </Button>
            ) : type === "image" ? (
                <Button size="small" variant="contained" onClick={handleOpenInput} color="secondary">
                    Выбрать изображение
                </Button>
            ) : (
                <TextField sx={{flex: 0.6}} label="Вопрос" value={title} onChange={handleChangeTitle}/>
            )}
            <Select
                sx={{width: "252px", display: "flex"}}
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={type}
                onChange={handleChangeType}>
                <MenuItem value="radio">
                    Один вариант
                </MenuItem>
                <MenuItem value="checkbox">
                    Несколько вариантов
                </MenuItem>
                <MenuItem value="text">
                    Текст
                </MenuItem>
                <MenuItem value="image">
                    Изображение
                </MenuItem>
                <MenuItem value="video">
                    Видео
                </MenuItem>
            </Select>
        </Stack>
    );
};
