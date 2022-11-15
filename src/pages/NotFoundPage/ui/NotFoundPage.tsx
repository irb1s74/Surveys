import {FC} from 'react';
import {Stack, Typography} from "@mui/material";

interface NotFoundPageProps {
}

export const NotFoundPage: FC<NotFoundPageProps> = () => {
    return (
        <Stack sx={{height: "100%"}} alignItems="center" justifyContent="center">
            <Typography variant="h5">Страница не найдена</Typography>
        </Stack>
    );
};
