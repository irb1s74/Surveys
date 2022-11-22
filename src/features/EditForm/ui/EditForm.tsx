import {FC, useCallback, useLayoutEffect} from 'react';
import {
    Card, CardContent, Skeleton,
    TextField,
} from "@mui/material";
import {IoImage, IoLogoYoutube, IoText, IoCheckbox} from "react-icons/io5";
import {DialActions} from "widgets/DialActions";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader";
import {getEditFormFoundForm} from "../model/selectors/getEditFormFoundForm/getEditFormFoundForm";
import {getEditFormIsLoading} from "../model/selectors/getEditFormIsLoading/getEditFormIsLoading";
import {updateVariant} from "../model/service/updateVariant";
import {editFormReducer} from "../model/slice/editFormSlice";
import {getFormById} from "../model/service/getFormById";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserAuthData} from "entities/User";
import {createQuestion} from "../model/service/createQuestion";
import {deleteQuestion} from "../model/service/deleteQuestion";
import {updateQuestion} from "../model/service/updateQuestion";
import {createVariant} from "features/EditForm/model/service/createVariant";
import {deleteVariant} from "features/EditForm/model/service/deleteVariant";
import {Questions, Variants} from "entities/Form";
import {Question} from "widgets/Question";

interface EditFormProps {

}

const initialReducers: ReducersList = {
    editForm: editFormReducer
}

const EditForm: FC<EditFormProps> = ({}) => {
    const dispatch = useDispatch();
    let {id} = useParams();
    const {title, questions} = useSelector(getEditFormFoundForm);
    const authData = useSelector(getUserAuthData);
    const isLoading = useSelector(getEditFormIsLoading);

    const handleDeleteQuestion = useCallback((questionId: number) => () => {
        dispatch(deleteQuestion({questionId, token: authData.token}));
    }, [])

    const handleUpdateQuestion = useCallback((question: Questions) => {
        dispatch(updateQuestion({
            data: {formId: question.formId, title: question.title, type: question.type, required: question.required},
            token: authData.token
        }))
    }, [])

    const handleCreateVariant = useCallback((questionId: number) => {
        dispatch(createVariant({
            questionId,
            token: authData.token
        }))
    }, [])

    const handleUpdateVariant = useCallback((variant: Variants) => {
        dispatch(updateVariant({
            data: {
                variantId: variant.id,
                questionId: variant.questionId,
                title: variant.title,
                correct: variant.correct,
            },
            token: authData.token
        }))
    }, [])

    const handleDeleteVariant = useCallback((variantId: number, questionId: number) => {
        dispatch(deleteVariant({
            variantId: variantId,
            questionId: questionId,
            token: authData.token
        }))
    }, [])

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
            onClick: () => dispatch(createQuestion({token: authData.token, type: "radio", formId: id, title: ""}))
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
                        <Question
                            key={question.id}
                            data={question}
                            onDelete={handleDeleteQuestion}
                            onUpdate={handleUpdateQuestion}
                            onCreateVariant={handleCreateVariant}
                            onUpdateVariant={handleUpdateVariant}
                            onDeleteVariant={handleDeleteVariant}
                        />
                    ))}
                </>
            )}
            <DialActions actions={actions}/>
        </DynamicModuleLoader>
    );
};

export default EditForm;
