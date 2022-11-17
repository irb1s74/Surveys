import {FC} from 'react';
import {
    AppBar,
    IconButton,
    Slide,
    Stack,
    Toolbar,
    Typography,
    useScrollTrigger,
} from "@mui/material";
import {FcDocument} from "react-icons/fc";
import {NavbarActions} from "./NavbarActions";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUserAuthData} from "entities/User";

interface NavbarProps {
    window?: () => Window;
}

export const Navbar: FC<NavbarProps> = ({window}) => {
    const authData = useSelector(getUserAuthData);
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            <AppBar color="secondary">
                <Toolbar>
                    <Stack sx={{flexGrow: 1}} direction='row' alignItems='center'>
                        <Link to='/'>
                            <IconButton>
                                <FcDocument size={34}/>
                            </IconButton>
                        </Link>
                        <Typography variant='h4'>
                            PARMA forms
                        </Typography>
                    </Stack>
                    {authData && (
                        <NavbarActions authData={authData}/>
                    )}
                </Toolbar>
            </AppBar>
        </Slide>
    );
};
