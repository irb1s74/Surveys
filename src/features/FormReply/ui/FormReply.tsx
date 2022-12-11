import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useFormik} from "formik";
import {formReplyReducer} from "../model/slice/formReplySlice";
import {getFormReplyFoundForm} from "../model/selectors/getFormReplyFounForm/getFormReplyFoundForm";
import {getFormReplyIsLoading} from "../model/selectors/getFormReplyIsLoading/getFormReplyIsLoading";
import {findOreCreateReply} from "../model/service/findOreCreateReply";
import {getFormReplyFoundReply} from "../model/selectors/getFormReplyFoundReply/getFormReplyFoundReply";
import {saveReply} from "../model/service/sendReply";
import {useDispatch, useSelector} from "react-redux";
import {getUserAuthData} from "entities/User";
import {Button, Card, CardHeader, Stack} from "@mui/material";
import {Question} from "widgets/Question";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader";
import {createYupSchema} from "shared/lib/createValidation/createValidation";
import {PageLoader} from "shared/ui/PageLoader/PageLoader";
import * as yup from "yup";

const initialReducers: ReducersList = {
    formReply: formReplyReducer
}

const FormReply = () => {
    const dispatch = useDispatch()
    const {id} = useParams();
    const authData = useSelector(getUserAuthData);
    const isLoading = useSelector(getFormReplyIsLoading)
    const form = useSelector(getFormReplyFoundForm)
    const reply = useSelector(getFormReplyFoundReply)
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            dispatch(findOreCreateReply({formId: id, token: authData.token}));
        }
    }, [id])

    let initialValues = {};
    form?.questions?.forEach(item => {
        initialValues = {...initialValues, [item.id]: item.type === "checkbox" ? [] : ""}
    });
    const yepSchema = form?.questions?.reduce(createYupSchema, {});
    const validateSchema = yup.object().shape(yepSchema);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validateSchema,
        isInitialValid: false,
        onSubmit: (values) => {
            dispatch(saveReply({replyId: reply.id, token: authData.token, answers: values}))
            navigate(`/form/results/${id}`);
        },
    });

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            {!isLoading ? (
                <form onSubmit={formik.handleSubmit}>
                    <Stack direction='column' sx={{pt: "10px", pb: "10px"}} spacing={2}>
                        <Card>
                            <CardHeader title={form.title}/>
                        </Card>
                        {form?.questions?.map((question) => (
                            <Question
                                key={question.id}
                                data={question}
                                value={formik.values[question.id as keyof typeof initialValues]}
                                error={
                                    formik.touched[question.id as keyof typeof initialValues] &&
                                    formik.errors[question.id as keyof typeof initialValues]
                                }
                                handleChange={formik.handleChange}
                            />
                        ))}
                        <Stack direction="row" alignItems="center" justifyContent="flex-end">
                            <Button disabled={!formik.isValid} type="submit" variant="contained">Отправить</Button>
                            {/*<Button onClick={formik.handleReset}>Очистить форму</Button>*/}
                        </Stack>
                    </Stack>
                </form>
            ) : (<PageLoader/>)}
        </DynamicModuleLoader>
    );
};

export default FormReply;
