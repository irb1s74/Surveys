import {SyntheticEvent, useState} from 'react';
import {
    Card,
    CardContent,
    Container, Stack, Tab, Tabs,
    TextField
} from "@mui/material";
import {Question} from "widgets/Question/ui/Question";
import {IoImage, IoLogoYoutube, IoText} from "react-icons/io5";
import {DialActions} from "widgets/DialActions";


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
                <Card>
                    <CardContent>
                        <TextField fullWidth variant="standard" label="Название формы"/>
                    </CardContent>
                </Card>
                <Question/>
            </Stack>
            <DialActions actions={actions}/>
        </Container>
    );
};

export default EditForm;
