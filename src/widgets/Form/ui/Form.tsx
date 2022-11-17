import {FC} from 'react';
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Divider,
    IconButton,
    Typography
} from "@mui/material";
import {IoEllipsisVerticalSharp} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {IForm} from "entities/Form";

interface FormProps {
    data?: IForm
}

export const Form: FC<FormProps> = (props) => {
    const {data} = props;
    const navigate = useNavigate();
    const toEditForm = () => {
        navigate('/edit')
    }
    return (
        <Card sx={{
            maxHeight: "220px",
            height: "220px",
            width: "228px",
            display: "flex",
            flexDirection: "column",
        }}>
            <CardActionArea onClick={toEditForm} sx={{flexGrow: 1}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {data?.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Divider/>
            <CardActions sx={{justifyContent: "flex-end"}}>
                <IconButton>
                    <IoEllipsisVerticalSharp/>
                </IconButton>
            </CardActions>
        </Card>
    );
};
