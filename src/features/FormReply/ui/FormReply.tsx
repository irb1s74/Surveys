import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader";
import {formReplyReducer} from "../model/slice/formReplySlice";
import {getFormReplyFoundForm} from "../model/selectors/getFormReplyFounForm/getFormReplyFoundForm";
import {getFormReplyIsLoading} from "../model/selectors/getFormReplyIsLoading/getFormReplyIsLoading";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getUserAuthData} from "entities/User";
import {Answers, getFormById} from "entities/Form";
import {Card, CardContent, CardHeader, Skeleton, TextField, Typography} from "@mui/material";


const initialReducers: ReducersList = {
    formReply: formReplyReducer
}
const FormReply = () => {
    const dispatch = useDispatch()
    const {id} = useParams();
    const authData = useSelector(getUserAuthData);
    const {title} = useSelector(getFormReplyFoundForm)
    const isLoading = useSelector(getFormReplyIsLoading)
    const [reply, setReply] = useState<Answers[]>([])

    useEffect(() => {
        dispatch(getFormById({formId: id, token: authData.token}));
    }, [id])

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            {isLoading ? (
                <>
                    <Skeleton variant="rounded" width="100%" height="150px"/>
                    <Skeleton variant="rounded" width="100%" height="500px"/>
                </>
            ) : (
                <>
                    <Card>
                        <CardHeader title={title}/>
                    </Card>
                    <div>
                    </div>
                </>
            )}
        </DynamicModuleLoader>
    );
};

export default FormReply;
