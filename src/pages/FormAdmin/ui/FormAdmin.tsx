import {SyntheticEvent, useState} from 'react';
import {Card, Container, Stack, Tab, Tabs} from "@mui/material";
import {FormEditor, FormResults} from "features/FormEditor";

const FormAdmin = () => {
    const [tab, setTab] = useState('questions');

    const handleChangeTab = (event: SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    return (
        <Container maxWidth='md'>
            <Stack direction='column' sx={{pt: "10px", pb: "10px"}} spacing={2}>
                <Card>
                    <Tabs value={tab} onChange={handleChangeTab} centered>
                        <Tab label="Вопросы" value="questions"/>
                        <Tab label="Ответы" value="answers"/>
                    </Tabs>
                </Card>
                {tab === "questions" ? (
                    <FormEditor/>
                ) : (
                    <FormResults/>
                )}
            </Stack>
        </Container>
    );
};

export default FormAdmin;
