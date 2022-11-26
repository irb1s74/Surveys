import {FC} from 'react';
import {useSelector} from "react-redux";
import {Card, CardContent, Stack, Typography} from "@mui/material";
import {getFormEditorFoundForm} from "../model/selectors/getFormEditorFoundForm/getFormEditorFoundForm";
import {getFormEditorIsLoading} from "../model/selectors/getFormEditorIsLoading/getFormEditorIsLoading";
import {formEditorReducer} from "../model/slice/formEditorSlice";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader";
import {getUserAuthData} from "entities/User";
import {Pie, PieChart, Tooltip} from 'recharts';
import {Reply} from "entities/Reply";
import {Questions} from "entities/Form";

interface EditFormAnswersProps {
}

const initialReducers: ReducersList = {
    formEditor: formEditorReducer
}

interface DataStatistic {
    title: string
    data: { name: string, value: number }[]
}


const FormResults: FC<EditFormAnswersProps> = ({}) => {
    const {reply, questions} = useSelector(getFormEditorFoundForm);
    const isLoading = useSelector(getFormEditorIsLoading);
    const authData = useSelector(getUserAuthData);

    const findQuestionById = (questionId: number): Questions => {
        return questions.find((question) => question.id === questionId)
    }

    const toFormData = (reply: Reply[]): DataStatistic[] => {
        const returnData: DataStatistic[] = []
        reply.forEach((oneReply) => {
            oneReply.answers.forEach((answer) => {
                const checkAnswer = returnData.find((data) => data.title === findQuestionById(answer.questionId).title)// вопрос
                if (checkAnswer) {
                    const variant = checkAnswer.data?.find(({name}) => name === answer.title)
                    if (variant) {
                        variant.value++;
                    } else {
                        checkAnswer.data.push({
                            name: answer.title,
                            value: 1
                        })
                    }
                } else {
                    returnData.push({
                        title: findQuestionById(answer.questionId).title,
                        data: [{name: answer.title, value: 1}]
                    })
                }
            })
        })
        return returnData;
    }


    return (
        <DynamicModuleLoader reducers={initialReducers}>
            {!isLoading && (
                <>
                    <Card>
                        <CardContent>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="h5">{reply.length} ответов</Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                    {toFormData(reply).map((statistic, index) => (
                        <Card key={index}>
                            <CardContent>
                                <Typography variant="h5">{statistic.title}</Typography>
                                <Stack sx={{width: "100%"}} direction="row" justifyContent="center" alignItems="center">
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
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </>
            )}
        </DynamicModuleLoader>
    );
}

export default FormResults;
