import {FC} from 'react';
import {
    Card, CardContent,
    TextField,
} from "@mui/material";
import {IoImage, IoLogoYoutube, IoText} from "react-icons/io5";
import {DialActions} from "widgets/DialActions";
import {Question} from "widgets/Question/ui/Question";

interface EditFormProps {

}

const EditForm: FC<EditFormProps> = ({}) => {
    const actions = [
        {icon: <IoLogoYoutube size={22}/>, name: 'Видео'},
        {icon: <IoImage size={22}/>, name: 'Изображение'},
        {icon: <IoText size={22}/>, name: 'Текст'},
    ];


    return (
        <>
            <Card>
                <CardContent>
                    <TextField fullWidth variant="standard" label="Название формы"/>
                </CardContent>
            </Card>
            <Question/>
            <DialActions actions={actions}/>
        </>
    );
};

export default EditForm;
