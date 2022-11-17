import {ChangeEvent, memo, useCallback} from 'react';
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, CardActions, CardContent, CardHeader, Divider, Stack, TextField, Typography} from "@mui/material";
import {regActions, regReducer} from "../../model/slice/regSlice";
import {getAuthEmail} from "../../model/selectors/getAuthEmail/getAuthEmail";
import {getAuthPassword} from "../../model/selectors/getAuthPassword/getAuthPassword";
import {getAuthFullName} from "../../model/selectors/getAuthFullName/getAuthFullName";
import {getAuthError} from "../../model/selectors/getAuthError/getAuthError";
import {regByEmail} from "features/Auth/model/services/regByEmail";

const initialReducers: ReducersList = {
    regForm: regReducer
}

const RegForm = () => {
    const dispatch = useDispatch();
    const email = useSelector(getAuthEmail);
    const password = useSelector(getAuthPassword);
    const full_name = useSelector(getAuthFullName);
    const error = useSelector(getAuthError);

    const onChangeEmail = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(regActions.setEmail(event.target.value))
    }, [dispatch]);

    const onChangeFullName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(regActions.setFullName(event.target.value))
    }, [dispatch]);

    const onChangePassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(regActions.setPassword(event.target.value))
    }, [dispatch]);

    const onAuthClick = useCallback(() => {
        dispatch(regByEmail({email, full_name, password}));
    }, [dispatch, full_name, email, password]);

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <Card sx={{maxWidth: "420px", width: "420px"}}>
                <CardHeader title="Регистрация"/>
                <Divider/>
                <CardContent>
                    <Stack spacing={2}>
                        <TextField fullWidth label="Email" type="email" value={email} onChange={onChangeEmail}/>
                        <TextField fullWidth label="ФИО" value={full_name} onChange={onChangeFullName}/>
                        <TextField fullWidth label="Пароль" type="password" value={password}
                            onChange={onChangePassword}/>
                    </Stack>
                    {error && (
                        <Typography color="error">
                            {error}
                        </Typography>
                    )}
                </CardContent>
                <Divider/>
                <CardActions>
                    <Button onClick={onAuthClick} sx={{ml: "auto"}} variant="contained">Отправить</Button>
                </CardActions>
            </Card>
        </DynamicModuleLoader>
    );
};

export default memo(RegForm);
