import {SyntheticEvent, useState} from 'react';
import {
    Card,
    Container,
    Stack,
    Tab,
    Tabs,
} from "@mui/material";
import {IoImage, IoLogoYoutube, IoText} from "react-icons/io5";
import {DialActions} from "widgets/DialActions";
import {EditFormQuestions} from "./EditFormQuestions";
import {EditFormAnswers} from "./EditFormAnswers";

const EditForm = () => {
    const [tab, setTab] = useState('questions');

    const actions = [
        {icon: <IoLogoYoutube size={22}/>, name: 'Видео'},
        {icon: <IoImage size={22}/>, name: 'Изображение'},
        {icon: <IoText size={22}/>, name: 'Текст'},
    ];

    const handleChangeTab = (event: SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };
    return (
        <Container maxWidth='md'>
            <Stack direction='column' spacing={2}>
                <Card>
                    <Tabs value={tab} onChange={handleChangeTab} centered>
                        <Tab label="Вопросы" value="questions"/>
                        <Tab label="Ответы" value="answers"/>
                    </Tabs>
                </Card>
                {tab === "questions" ? (
                    <EditFormQuestions/>
                ) : (
                    <EditFormAnswers/>
                )}
            </Stack>
            <DialActions actions={actions}/>
        </Container>
    );
};

export default EditForm;
