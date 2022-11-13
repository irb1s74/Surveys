import {FC, useState} from 'react';
import {MenuItem, Select, SelectChangeEvent, Stack, TextField} from "@mui/material";

interface QuestionHeaderProps {
    option: string;
    setOption: (option: string) => void;
}

export const QuestionHeader: FC<QuestionHeaderProps> = ({option,setOption}) => {
    const [open, setOpen] = useState(false);

    const handleChange = (event: SelectChangeEvent) => {
        setOption(event.target.value);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <Stack direction="row" sx={{mb: "20px"}} justifyContent="space-between">
            <TextField label="Вопрос"/>
            <Select
                sx={{width: "252px", display: "flex"}}
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={option}
                onChange={handleChange}>
                <MenuItem value="radio">
                    Один вариант
                </MenuItem>
                <MenuItem value="checkbox">
                    Несколько вариантов
                </MenuItem>
            </Select>
        </Stack>
    );
};
