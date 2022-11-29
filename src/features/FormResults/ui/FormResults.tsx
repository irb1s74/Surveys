import {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Card, CardContent, Stack, Typography} from "@mui/material";
import {formResultsReducer} from "../model/slice/formResultsSlice";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader";
import {getUserAuthData} from "entities/User";
import {Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, Tooltip, XAxis, YAxis} from 'recharts';
import {Reply} from "entities/Reply";
import {getFormById, Questions} from "entities/Form";
import {getFormResultsForm} from "../model/selectors/getFormResultsForm/getFormResultsForm";
import {
    getFormResultsIsLoading
} from "../model/selectors/getFormResultsIsLoading/getFormResultsIsLoading";
import {useParams} from "react-router-dom";
import {PageLoader} from "widgets/PageLoader";

interface EditFormAnswersProps {
}

const initialReducers: ReducersList = {
    formResults: formResultsReducer
}

interface DataStatistic {
    title: string
    data: { name: string, value: number }[]
    type: string
}


const FormResults: FC<EditFormAnswersProps> = ({}) => {
    let {id} = useParams();
    const {reply, questions} = useSelector(getFormResultsForm);
    const isLoading = useSelector(getFormResultsIsLoading);
    const authData = useSelector(getUserAuthData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFormById({formId: id, token: authData.token}));
    }, [id])

    const findQuestionById = (questionId: number): Questions => {
        return questions.find((question) => question.id === questionId)
    }

    const toFormData = (reply: Reply[]): DataStatistic[] => {
        const returnData: DataStatistic[] = []
        reply?.forEach((oneReply) => {
            oneReply.answers.forEach((answer) => {
                const checkAnswer = returnData.find((data) => data.title === findQuestionById(answer.questionId).title)// вопрос
                if (checkAnswer) {
                    const variant = checkAnswer.data?.find(({name}) => name === answer.title)
                    if (variant) {
                        variant.value++;
                    } else {
                        checkAnswer.data.push({
                            name: answer.title,
                            value: 1,
                        })
                    }
                } else {
                    returnData.push({
                        title: findQuestionById(answer.questionId).title,
                        data: [{name: answer.title, value: 1}],
                        type: findQuestionById(answer.questionId).type
                    })
                }
            })
        })
        return returnData;
    }

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            {!isLoading ? (
                <>
                    <Card>
                        <CardContent>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="h5">{reply?.length || 0} ответов</Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                    {toFormData(reply).map((statistic, index) => (
                        <Card key={index}>
                            <CardContent>
                                <Typography variant="h5">{statistic.title}</Typography>
                                <Stack sx={{width: "100%"}} direction="row" justifyContent="center" alignItems="center">
                                    {statistic.type !== "checkbox" ? (
                                        <PieChart width={600} height={400}>
                                            <Pie
                                                data={statistic.data}
                                                dataKey="value"
                                                cx={300}
                                                cy={200}
                                                outerRadius={60}
                                                label
                                                fill="#0F2232"
                                            />
                                            <Tooltip/>
                                        </PieChart>
                                    ) : (
                                        <BarChart
                                            width={600}
                                            height={400}
                                            data={statistic.data}
                                            margin={{
                                                top: 5,
                                                right: 30,
                                                left: 20,
                                                bottom: 5,
                                            }}
                                            barSize={20}
                                        >
                                            <XAxis dataKey="name" scale="point" padding={{left: 10, right: 10}}/>
                                            <YAxis/>
                                            <Tooltip/>
                                            <Legend/>
                                            <CartesianGrid strokeDasharray="3 3"/>
                                            <Bar dataKey="value" fill="#8884d8" background={{fill: '#eee'}}/>
                                        </BarChart>
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
