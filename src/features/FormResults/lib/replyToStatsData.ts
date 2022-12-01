import {Reply} from "entities/Reply";
import {Questions} from "entities/Form";

const findQuestionById = (questionId: number, questions: Questions[]): Questions => {
    return questions.find((question) => question.id === questionId)
}

export const replyToFormData = (reply: Reply[], questions: Questions[]): DataStatistic[] => {
    const returnData: DataStatistic[] = []
    reply?.forEach((oneReply) => {
        oneReply.answers.forEach((answer) => {
            const checkAnswer = returnData.find((data) => data.title === findQuestionById(answer.questionId, questions).title)// вопрос
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
                    title: findQuestionById(answer.questionId, questions).title,
                    data: [{name: answer.title, value: 1}],
                    type: findQuestionById(answer.questionId, questions).type
                })
            }
        })
    })
    return returnData;
}
