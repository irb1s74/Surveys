import {ChangeEvent, FC, memo, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader";
import {Button, Card, CardActions, CardContent, CardHeader, Divider, Stack, TextField, Typography} from "@mui/material";
import {getAuthEmail} from "../../model/selectors/getAuthEmail/getAuthEmail";
import {getAuthPassword} from "../../model/selectors/getAuthPassword/getAuthPassword";
import {getAuthFullName} from "../../model/selectors/getAuthFullName/getAuthFullName";
import {getAuthError} from "../../model/selectors/getAuthError/getAuthError";
import {getAuthIsLoading} from "../../model/selectors/getAuthIsLoading/getAuthIsLoading";
import {regByEmail} from "features/Auth/model/services/regByEmail";
import {authActions, authReducer} from "features/Auth/model/slice/authSlice";

interface RegFormProps {
    setTypeAuth: () => void
}

const initialReducers: ReducersList = {
    authForm: authReducer
}

const RegForm: FC<RegFormProps> = ({setTypeAuth}) => {
    const dispatch = useDispatch();
    const email = useSelector(getAuthEmail);
    const password = useSelector(getAuthPassword);
    const full_name = useSelector(getAuthFullName);
    const error = useSelector(getAuthError);
    const isLoading = useSelector(getAuthIsLoading);

    const onChangeEmail = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(authActions.setEmail(event.target.value))
    }, [dispatch]);

    const onChangeFullName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(authActions.setFullName(event.target.value))
    }, [dispatch]);

    const onChangePassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(authActions.setPassword(event.target.value))
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
                    <Stack spacing={2} sx={{mb: 3}}>
                        <TextField fullWidth label="Email" type="email" value={email} onChange={onChangeEmail}/>
                        <TextField fullWidth label="ФИО" value={full_name} onChange={onChangeFullName}/>
                        <TextField fullWidth label="Пароль" type="password" value={password}
                            onChange={onChangePassword}/>
                        {Array.isArray(error) ? (
                            <Typography color="error">
                                {error[0]}
                            </Typography>
                        ) : (
                            <Typography color="error">
                                {error}
                            </Typography>
                        )}
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                        <Typography>Уже есть аккаунт?</Typography>
                        <Typography sx={{cursor: "pointer"}} onClick={setTypeAuth} color="primary">Войти</Typography>
                    </Stack>
                </CardContent>
                <Divider/>
                <CardActions>
                    <Button onClick={onAuthClick} disabled={isLoading} fullWidth variant="contained">Создать
                        аккаунт</Button>
                </CardActions>
            </Card>
        </DynamicModuleLoader>
    );
};

export default memo(RegForm);
