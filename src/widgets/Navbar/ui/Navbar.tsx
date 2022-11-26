import {FC} from 'react';
import {
    AppBar,
    IconButton,
    Slide,
    Stack,
    Toolbar,
    useScrollTrigger,
} from "@mui/material";
import {NavbarActions} from "./NavbarActions";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUserAuthData} from "entities/User";
import LogoParma from "shared/assets/icons/logoParma.svg"

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
            <AppBar color="secondary" sx={{maxHeight:"75px"}}>
                <Toolbar>
                    <Stack sx={{flexGrow: 1}} direction='row' alignItems='center'>
                        <Link to='/'>
                            <IconButton>
                                <LogoParma style={{width: "205px", height: "75px"}}/>
                            </IconButton>
                        </Link>
                    </Stack>
                    {authData && (
                        <NavbarActions authData={authData}/>
                    )}
                </Toolbar>
            </AppBar>
        </Slide>
    );
};
