import {FC} from 'react';
import {Stack} from "@mui/material";
import {Loader} from "shared/ui/Loader/Loader";

interface PageLoaderProps {
    className?: string
}

export const PageLoader: FC<PageLoaderProps> = () => {
    return (
        <Stack sx={{mt: "64px", height: "calc(100vh - 64px)"}} justifyContent='center' alignItems='center'>
            <Loader/>
        </Stack>
    );
};
