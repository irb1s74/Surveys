import {FC, useEffect, useLayoutEffect} from 'react';
import {
    Card, CardContent, Skeleton,
    TextField,
} from "@mui/material";
import {IoImage, IoLogoYoutube, IoText, IoCheckbox} from "react-icons/io5";
import {DialActions} from "widgets/DialActions";
import {Question} from "widgets/Question/ui/Question";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader";
import {getEditFormFoundForm} from "../model/selectors/getEditFormFoundForm/getEditFormFoundForm";
import {getEditFormIsLoading} from "../model/selectors/getEditFormIsLoading/getEditFormIsLoading";
import {editFormReducer} from "../model/slice/editFormSlice";
import {getFormById} from "../model/service/getFormById";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserAuthData} from "entities/User";
import {createQuestion} from "features/EditForm/model/service/createQuestion";


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
    const isLoading = useSelector(getEditFormIsLoading);


    const actions = [
        {
            icon: <IoLogoYoutube size={22}/>,
            name: 'Видео',
            onClick: () => dispatch(createQuestion({token: authData.token, type: "video", formId: id, title: ""}))
        },
        {
            icon: <IoImage size={22}/>,
            name: 'Изображение',
            onClick: () => dispatch(createQuestion({token: authData.token, type: "image", formId: id, title: ""}))
        },
        {
            icon: <IoCheckbox size={22}/>,
            name: 'Варианты',
            onClick: () => dispatch(createQuestion({token: authData.token, type: "variants", formId: id, title: ""}))
        },
        {
            icon: <IoText size={22}/>,
            name: 'Текст',
            onClick: () => dispatch(createQuestion({token: authData.token, type: "text", formId: id, title: ""}))
        },
    ];

    useLayoutEffect(() => {
        dispatch(getFormById({formId: id, token: authData.token}));
    }, [id])


    return (
        <DynamicModuleLoader reducers={initialReducers}>
            {isLoading ? (
                <Skeleton variant="rounded" width="100%" height="600px"/>
            ) : (
                <>
                    <Card>
                        <CardContent>
                            <TextField fullWidth variant="standard" value={title} placeholder="Название формы"/>
                        </CardContent>
                    </Card>
                    {questions && questions.map((question) => (
                        <Question key={question.id} data={question}/>
                    ))}
                </>
            )}
            <DialActions actions={actions}/>
        </DynamicModuleLoader>
    );
};

export default EditForm;
