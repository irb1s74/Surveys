import {FC} from 'react';
import {
    AppBar,
    Avatar,
    IconButton,
    Slide,
    Stack,
    Toolbar,
    Typography,
    useScrollTrigger,
} from "@mui/material";
import {FcDocument} from "react-icons/fc";

interface NavbarProps {
    window?: () => Window;
}

export const Navbar: FC<NavbarProps> = ({window}) => {
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            <AppBar color="inherit">
                <Toolbar>
                    <Stack sx={{flexGrow: 1}} direction='row' alignItems='center'>
                        <IconButton>
                            <FcDocument size={34}/>
                        </IconButton>
                        <Typography variant='h4'>
                            Формы
                        </Typography>
                    </Stack>
                    <Stack>
                        <Avatar/>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Slide>
    );
};
