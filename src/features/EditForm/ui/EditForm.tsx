import {FC, useEffect} from 'react';
import {
    Card, CardContent,
    TextField,
} from "@mui/material";
import {IoImage, IoLogoYoutube, IoText} from "react-icons/io5";
import {DialActions} from "widgets/DialActions";
import {Question} from "widgets/Question/ui/Question";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader";
import {getEditFormFoundForm} from "../model/selectors/getEditFormFoundForm/getEditFormFoundForm";
import {editFormReducer} from "../model/slice/editFormSlice";
import {getFormById} from "../model/service/getFormById";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserAuthData} from "entities/User";


interface EditFormProps {

}

const initialReducers: ReducersList = {
    editForm: editFormReducer
}

const EditForm: FC<EditFormProps> = ({}) => {
    const dispatch = useDispatch();
    let {id} = useParams();
    const authData = useSelector(getUserAuthData);
    const {title, questions} = useSelector(getEditFormFoundForm);
    const actions = [
        {icon: <IoLogoYoutube size={22}/>, name: 'Видео'},
        {icon: <IoImage size={22}/>, name: 'Изображение'},
        {icon: <IoText size={22}/>, name: 'Текст'},
    ];
    useEffect(() => {
        dispatch(getFormById({formId: id, token: authData.token}));
    }, [id])


    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <Card>
                <CardContent>
                    <TextField fullWidth variant="standard" value={title} label="Название формы"/>
                </CardContent>
            </Card>
            <Question/>
            <DialActions actions={actions}/>
        </DynamicModuleLoader>
    );
};

export default EditForm;
