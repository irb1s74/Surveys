import {FC, Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Card, CardContent, CardMedia, IconButton, Stack, Typography} from "@mui/material";
import {formResultsReducer} from "../model/slice/formResultsSlice";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader";
import {getUserAuthData} from "entities/User";
import {getFormById} from "entities/Form";
import {getFormResultsForm} from "../model/selectors/getFormResultsForm/getFormResultsForm";
import {
    getFormResultsIsLoading
} from "../model/selectors/getFormResultsIsLoading/getFormResultsIsLoading";
import {useParams} from "react-router-dom";
import {PageLoader} from "widgets/PageLoader";
import {IoDownload} from "react-icons/io5";
import BarStats from "shared/ui/BarStats/BarStats";
import PieStats from "shared/ui/PieStats/PieStats";
import {replyToFormData} from "../lib/replyToStatsData";
import {getUrl} from "shared/lib/getUrl/getUrl";
import {downLoadResults} from "features/FormResults/model/service/downLoadResults";


interface EditFormAnswersProps {
}

const initialReducers: ReducersList = {
    formResults: formResultsReducer
}


const FormResults: FC<EditFormAnswersProps> = ({}) => {
    let {id} = useParams();
    const {reply, questions} = useSelector(getFormResultsForm);
    const isLoading = useSelector(getFormResultsIsLoading);
    const authData = useSelector(getUserAuthData);
    const dispatch = useDispatch();


    const dataSubdivision: { name: string, value: number }[] = []
    const subdivison = reply?.map((reply) => reply.user.subdivision.name);
    subdivison?.forEach((nameSubdivison) => {
        const findSub = dataSubdivision.find(findSub => findSub.name === nameSubdivison)
        if (findSub) {
            findSub.value++;
        } else {
            dataSubdivision.push({name: nameSubdivison, value: 1})
        }
    })


    useEffect(() => {
        dispatch(getFormById({formId: id, token: authData.token}));
    }, [id])

    const handleDownLoad = () => {
        dispatch(downLoadResults({formId: id, token: authData.token}))
    }

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            {!isLoading ? (
                <>
                    <Card>
                        <CardContent>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="h5">{reply?.length || 0} ответов</Typography>
                                <IconButton onClick={handleDownLoad} color="primary">
                                    <IoDownload/>
                                </IconButton>
                            </Stack>
                            <Stack direction="row" justifyContent="center" alignItems="center">
                                <BarStats data={dataSubdivision}/>
                            </Stack>
                        </CardContent>
                    </Card>
                    {replyToFormData(reply, questions).map((statistic, index) => (
                        <Card key={index}>
                            <CardContent>
                                <Stack sx={{width: "100%"}} direction="row" justifyContent="center" alignItems="center">
                                    {statistic.type === "checkbox" ? (
                                        <Stack direction="column" spacing={2} alignItems="center">
                                            <Typography sx={{mb: '20px'}} variant="h5">{statistic.title}</Typography>
                                            <BarStats data={statistic.data}/>
                                        </Stack>
                                    ) : statistic.type === "image" ? (
                                        <Stack direction="column" spacing={2} alignItems="center">
                                            <CardMedia
                                                component="img"
                                                height="400"
                                                image={`${getUrl}questions/${statistic.title}`}
                                                sx={{mb: '20px'}}
                                            />
                                            <BarStats data={statistic.data}/>
                                        </Stack>
                                    ) : (
                                        <Stack direction="column" alignItems="center">
                                            <Typography sx={{mb: '20px'}} variant="h5">{statistic.title}</Typography>
                                            <PieStats data={statistic.data}/>
                                        </Stack>
                                    )}
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </>
            ) : (<PageLoader/>)}
        </DynamicModuleLoader>
    );
}

export default FormResults;
