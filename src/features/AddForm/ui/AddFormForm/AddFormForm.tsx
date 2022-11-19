import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    IconButton,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {addFormActions, addFormReducer} from "../../model/slice/addFormSlice";
import {getAddFormTitle} from "../../model/selectors/getAddFormTitle/getAddFormTitle";
import {getAddFormIsLoading} from "../../model/selectors/getAddFormIsLoading/getAddFormIsLoading";
import {getAddFormError} from "../../model/selectors/getAddFormError/getAddFormError";
import {createForm} from "../../model/services/createForm";
import {useDispatch, useSelector} from "react-redux";
import {ChangeEvent, FC, useCallback} from "react";
import {IoClose} from "react-icons/io5";
import {getUserAuthData} from "entities/User";

export interface AddFormFormProps {
    onClose: () => void;
}

const initialReducers: ReducersList = {
    addForm: addFormReducer
}

const AddFormForm: FC<AddFormFormProps> = ({onClose}) => {
    const title = useSelector(getAddFormTitle);
    const isLoading = useSelector(getAddFormIsLoading);
    const error = useSelector(getAddFormError);
    const user = useSelector(getUserAuthData)
    const dispatch = useDispatch();

    const onChangeTitle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(addFormActions.setTitle(event.target.value))
    }, [])

    const onCreate = () => {
        dispatch(createForm({title, token: user.token}));
        onClose();
    }

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <Card sx={{maxWidth: "420px", width: "420px"}}>
                <Stack justifyContent='space-between' direction='row' sx={{p: "16px"}}>
                    <Typography variant='h5'>Создать фому</Typography>
                    <IconButton onClick={onClose}>
                        <IoClose/>
                    </IconButton>
                    {error && (
                        <Typography color="error">{error}</Typography>
                    )}
                </Stack>
                <Divider/>
                <CardContent>
                    <TextField label="Название" fullWidth value={title} onChange={onChangeTitle}/>
                </CardContent>
                <Divider/>
                <CardActions>
                    <Button onClick={onCreate} fullWidth disabled={isLoading} variant="contained">Создать</Button>
                </CardActions>
            </Card>
        </DynamicModuleLoader>
    );
};

export default AddFormForm;
