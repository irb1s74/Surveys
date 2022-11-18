import {SyntheticEvent, useState} from 'react';
import {Card, Container, Stack, Tab, Tabs} from "@mui/material";
import {EditForm} from "features/EditForm";
import {FormAnswers} from "features/FormAnswers";

const Form = () => {
    const [tab, setTab] = useState('questions');

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
                    <EditForm/>
                ) : (
                    <FormAnswers/>
                )}
            </Stack>
        </Container>
    );
};

export default Form;
