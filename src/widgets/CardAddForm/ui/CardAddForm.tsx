import {FC} from 'react';
import {Card, CardActionArea, Stack, useTheme} from "@mui/material";
import {IoAddCircle} from "react-icons/io5";

interface CardAddFormProps {
    onClick?: () => void;
}

export const CardAddForm: FC<CardAddFormProps> = ({onClick}) => {
    const theme = useTheme();
    return (
        <Card sx={{
            maxHeight: "220px",
            height: "220px",
            width: "228px",
            display: "flex",
        }}>
            <CardActionArea onClick={onClick} color="primary" sx={{flexGrow: 1, color: theme.palette.primary.main}}>
                <Stack sx={{height: "100%"}} justifyContent="center" alignItems="center">
                    <IoAddCircle color="" size={44}/>
                </Stack>
            </CardActionArea>
        </Card>
    );
};
