import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader";
import {formReplyReducer} from "../model/slice/formReplySlice";
import {getFormReplyFoundForm} from "../model/selectors/getFormReplyFounForm/getFormReplyFoundForm";
import {getFormReplyIsLoading} from "../model/selectors/getFormReplyIsLoading/getFormReplyIsLoading";
import {findOreCreateReply} from "../model/service/findOreCreateReply";
import {getFormReplyFoundReply} from "../model/selectors/getFormReplyFoundReply/getFormReplyFoundReply";
import {sendReply} from "../model/service/sendReply";
import {useCallback, useEffect,} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getUserAuthData} from "entities/User";
import {Button, Card, CardHeader, Stack,} from "@mui/material";
import {Question} from "widgets/Question";
import {createAnswers} from "features/FormReply/model/service/createAnswers";


const initialReducers: ReducersList = {
    formReply: formReplyReducer
}

interface Reply {
    questionId: number;
    title: string;
}

const FormReply = () => {
    const dispatch = useDispatch()
    const {id} = useParams();
    const authData = useSelector(getUserAuthData);
    const isLoading = useSelector(getFormReplyIsLoading)
    const form = useSelector(getFormReplyFoundForm)
    const reply = useSelector(getFormReplyFoundReply)

    useEffect(() => {
        if (id) {
            dispatch(findOreCreateReply({formId: id, token: authData.token}));
        }
    }, [id])

    const handleSetReply = useCallback(({questionId,title}: Reply) => {
        dispatch(createAnswers({
            replyId: reply.id,
            questionId,
            title,
            token: authData.token
        }))
    }, [reply.id])

    const handleSendReply = () => {
        dispatch(sendReply({replyId: reply.id, token: authData.token}));
    }

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            {!isLoading && (
                <>
                    <Card>
                        <CardHeader title={form.title}/>
                    </Card>
                    {form.questions && form.questions.map((question) => (
                        <Question
                            key={question.id}
                            data={question}
                            setReply={handleSetReply}
                        />
                    ))}
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Button onClick={handleSendReply} variant="contained">Отправить</Button>
                        <Button>Очистить форму</Button>
                    </Stack>
                </>
            )}
        </DynamicModuleLoader>
    );
};

export default FormReply;
