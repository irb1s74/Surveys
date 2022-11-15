import {FC} from 'react';
import {Button, Card, CardContent, TextField} from "@mui/material";
import {Question} from "widgets/Question/ui/Question";

interface EditFormQuestionsProps {
}

export const EditFormQuestions: FC<EditFormQuestionsProps> = ({}) => {
    return (
        <>
            <Card>
                <CardContent>
                    <TextField fullWidth variant="standard" label="Название формы"/>
                </CardContent>
            </Card>
            <Question/>
        </>
    );
};
