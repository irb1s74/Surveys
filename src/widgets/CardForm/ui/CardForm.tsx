import {FC, MouseEvent, useState} from 'react';
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Divider,
    IconButton, ListItemIcon, Menu, MenuItem,
    Typography
} from "@mui/material";
import {deleteForm, Form} from "entities/Form";
import {IoEllipsisVerticalSharp, IoTrash} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

interface CardFormProps {
    data?: Form
}

export const CardForm: FC<CardFormProps> = (props) => {
    const {data} = props;
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const dispatch = useDispatch();

    const handleDeleteForm = () => {
        dispatch(deleteForm({formId: data.id}))
    }
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
                <IconButton onClick={handleClick}>
                    <IoEllipsisVerticalSharp/>
                </IconButton>
            </CardActions>
            <Menu
                anchorEl={anchorEl}
                id="cardForm-menu"
                open={open}
                onClose={handleClose}
                transformOrigin={{horizontal: 'center', vertical: 'top'}}
                anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
            >
                <MenuItem onClick={handleDeleteForm}>
                    <ListItemIcon>
                        <IoTrash fontSize={22}/>
                    </ListItemIcon>
                    Удалить
                </MenuItem>
            </Menu>
        </Card>
    );
};
