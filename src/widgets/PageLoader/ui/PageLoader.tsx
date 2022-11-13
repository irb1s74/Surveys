import {FC} from 'react';
import {Stack} from "@mui/material";
import {Loader} from "shared/ui/Loader/Loader";

interface PageLoaderProps {
    className?: string
}

export const PageLoader: FC<PageLoaderProps> = () => {
    return (
        <Stack sx={{height: "100%"}} justifyContent='center' alignItems='center'>
            <Loader/>
        </Stack>
    );
};
