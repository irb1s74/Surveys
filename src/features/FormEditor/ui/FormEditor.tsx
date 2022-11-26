import {FC, useCallback, useEffect} from 'react';
import {
    Card, CardContent, Skeleton,
    TextField,
} from "@mui/material";
import {IoImage, IoLogoYoutube, IoText, IoCheckbox} from "react-icons/io5";
import {DialActions} from "widgets/DialActions";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader";
import {getFormEditorFoundForm} from "../model/selectors/getFormEditorFoundForm/getFormEditorFoundForm";
import {getFormEditorIsLoading} from "../model/selectors/getFormEditorIsLoading/getFormEditorIsLoading";
import {updateVariant} from "../model/service/updateVariant";
import {formEditorReducer} from "../model/slice/formEditorSlice";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserAuthData} from "entities/User";
import {createQuestion} from "../model/service/createQuestion";
import {deleteQuestion} from "../model/service/deleteQuestion";
import {updateQuestion} from "../model/service/updateQuestion";
import {createVariant} from "features/FormEditor/model/service/createVariant";
import {deleteVariant} from "features/FormEditor/model/service/deleteVariant";
import {getFormById, Questions, Variants} from "entities/Form";
import {QuestionEditor} from 'widgets/QuestionEditor';

interface EditFormProps {

}

const initialReducers: ReducersList = {
    formEditor: formEditorReducer
}

const FormEditor: FC<EditFormProps> = ({}) => {
    const dispatch = useDispatch();
    let {id} = useParams();
    const {title, questions} = useSelector(getFormEditorFoundForm);
    const authData = useSelector(getUserAuthData);
    const isLoading = useSelector(getFormEditorIsLoading);

    const handleDeleteQuestion = useCallback((questionId: number) => () => {
        dispatch(deleteQuestion({questionId, token: authData.token}));
    }, [])

    const handleUpdateQuestion = useCallback((question: Questions) => {
        dispatch(updateQuestion({
            data: {questionId: question.id, title: question.title, type: question.type, required: question.required},
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

    useEffect(() => {
        dispatch(getFormById({formId: id, token: authData.token}));
    }, [id])


    return (
        <DynamicModuleLoader reducers={initialReducers}>
            {!isLoading && (
                <>
                    <Card>
                        <CardContent>
                            <TextField fullWidth variant="standard" value={title} placeholder="Название формы"/>
                        </CardContent>
                    </Card>
                    {questions && questions.map((question) => (
                        <QuestionEditor
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

export default FormEditor;
