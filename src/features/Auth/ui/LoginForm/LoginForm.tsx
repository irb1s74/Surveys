import {ChangeEvent, FC, memo, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, CardActions, CardContent, CardHeader, Divider, Stack, TextField, Typography} from "@mui/material";
import {getAuthEmail} from "../../model/selectors/getAuthEmail/getAuthEmail";
import {getAuthPassword} from "../../model/selectors/getAuthPassword/getAuthPassword";
import {getAuthError} from "../../model/selectors/getAuthError/getAuthError";
import {loginByEmail} from "../../model/services/loginByEmail";
import {getAuthIsLoading} from "../../model/selectors/getAuthIsLoading/getAuthIsLoading";
import {authActions, authReducer} from "../../model/slice/authSlice";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader";

interface LoginFormProps {
    setTypeAuth: () => void;
}

const initialReducers: ReducersList = {
    authForm: authReducer
}
const LoginForm: FC<LoginFormProps> = ({setTypeAuth}) => {
    const dispatch = useDispatch();
    const email = useSelector(getAuthEmail);
    const password = useSelector(getAuthPassword);
    const isLoading = useSelector(getAuthIsLoading);
    const error = useSelector(getAuthError);

    const onChangeEmail = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(authActions.setEmail(event.target.value))
    }, [dispatch]);

    const onChangePassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(authActions.setPassword(event.target.value))
    }, [dispatch]);

    const onAuthClick = useCallback(() => {
        dispatch(loginByEmail({email, password}));
    }, [dispatch, email, password]);

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <Card sx={{maxWidth: "420px", width: "420px"}}>
                <CardHeader title="Авторизация"/>
                <Divider/>
                <CardContent>
                    <Stack spacing={2} sx={{mb: 3}}>
                        <TextField fullWidth label="Email" type="email" value={email} onChange={onChangeEmail}/>
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
                        <Typography>Нету аккаунт?</Typography>
                        <Typography sx={{cursor: "pointer"}} onClick={setTypeAuth} color="primary">Создать</Typography>
                    </Stack>
                </CardContent>
                <Divider/>
                <CardActions>
                    <Button onClick={onAuthClick} disabled={isLoading} fullWidth variant="contained">Войти</Button>
                </CardActions>
            </Card>
        </DynamicModuleLoader>
    );
};

export default memo(LoginForm);
