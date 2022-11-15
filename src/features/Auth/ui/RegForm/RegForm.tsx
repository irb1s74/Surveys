import {memo} from 'react';
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader";
import {authReducer} from "../../model/slice/authSlice";
import {useDispatch} from "react-redux";
import {Button, Card, CardActions, CardContent, CardHeader, Divider, Input, Stack, TextField} from "@mui/material";

const initialReducers: ReducersList = {
    authForm: authReducer
}
const RegForm = () => {
    const dispatch = useDispatch();
    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <Card sx={{maxWidth: "420px", width: "420px"}}>
                <CardHeader title="Регистрация"/>
                <Divider/>
                <CardContent>
                    <Stack spacing={2}>
                        <TextField fullWidth label="ФИО"/>
                        <TextField fullWidth label="ФИО"/>
                        <TextField fullWidth label="ФИО"/>
                    </Stack>
                </CardContent>
                <Divider/>
                <CardActions>
                    <Button sx={{ml: "auto"}} variant="contained">Отправить</Button>
                </CardActions>
            </Card>
        </DynamicModuleLoader>
    );
};

export default memo(RegForm);
