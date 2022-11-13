import {FC, useState, MouseEvent} from 'react';
import {Avatar, IconButton, ListItemIcon, Menu, MenuItem, Stack} from "@mui/material";
import {IoLogOut} from "react-icons/io5";

interface NavbarActionsProps {
}

export const NavbarActions: FC<NavbarActionsProps> = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Stack>
            <IconButton onClick={handleClick}>
                <Avatar/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{horizontal: 'center', vertical: 'top'}}
                anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
            >
                <MenuItem>
                    <ListItemIcon>
                        <IoLogOut fontSize={22}/>
                    </ListItemIcon>
                    Выйти
                </MenuItem>
            </Menu>
        </Stack>
    );
};
