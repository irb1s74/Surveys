import {FC, useState, MouseEvent} from 'react';
import {Avatar, IconButton, ListItemIcon, Menu, MenuItem, Stack} from "@mui/material";
import {IoLogOut} from "react-icons/io5";
import {useDispatch} from "react-redux";
import {User, userActions} from "entities/User";
import {useNavigate} from "react-router-dom";
import {getUrl} from "shared/lib/getUrl/getUrl";

interface NavbarActionsProps {
    authData: User
}

export const NavbarActions: FC<NavbarActionsProps> = ({authData}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const onLogout = () => {
        dispatch(userActions.logout());
        setAnchorEl(null);
        navigate('/')
    }
    return (
        <Stack>
            <IconButton onClick={handleClick}>
                <Avatar alt="user avatar" src={authData.avatar && `${getUrl}avatars/${authData.avatar}`}/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                transformOrigin={{horizontal: 'center', vertical: 'top'}}
                anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
            >
                <MenuItem onClick={onLogout}>
                    <ListItemIcon>
                        <IoLogOut fontSize={22}/>
                    </ListItemIcon>
                    Выйти
                </MenuItem>
            </Menu>
        </Stack>
    );
};
