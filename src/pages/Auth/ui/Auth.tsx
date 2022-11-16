import {Suspense} from 'react';
import {Stack} from "@mui/material";
import {Loader} from "shared/ui/Loader/Loader";
import RegForm from "features/Auth/ui/RegForm/RegForm";


const Auth = () => {
    return (
        <Stack sx={{height: "100%"}} justifyContent="center" alignItems="center">
            <Suspense fallback={<Loader/>}>
                <RegForm/>
            </Suspense>
        </Stack>
    );
};

export default Auth;
