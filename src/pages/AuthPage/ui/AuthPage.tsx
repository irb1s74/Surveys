import {Suspense} from 'react';
import {Stack} from "@mui/material";
import {Loader} from "shared/ui/Loader/Loader";
import {AuthAsync} from "features/Auth";


const AuthPage = () => {
    return (
        <Stack sx={{height: "100%"}} justifyContent="center" alignItems="center">
            <Suspense fallback={<Loader/>}>
                <AuthAsync/>
            </Suspense>
        </Stack>
    );
};

export default AuthPage;
