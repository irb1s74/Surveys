import React from 'react';
import {Stack} from "@mui/material";
import {RegForm} from "features/Auth";


const Auth = () => {
    return (
        <Stack sx={{height: "100%"}} justifyContent="center" alignItems="center">
            <RegForm/>
        </Stack>
    );
};

export default Auth;
