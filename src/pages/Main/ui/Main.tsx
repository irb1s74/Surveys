import {FC} from 'react';
import {Container, IconButton, Grid, Paper, Stack} from "@mui/material";
import {IoAddCircle} from "react-icons/io5";

interface MainProps {
}

const Main: FC<MainProps> = () => {
    return (
        <Container maxWidth='xl'>
            <Grid container spacing={2}>
                <Grid item xl={2}>
                    <Paper sx={{height: "220px"}}>
                        <Stack sx={{height: "100%"}} justifyContent="center" alignItems="center">
                            <IconButton  size="large" color='primary'>
                                <IoAddCircle size={44}/>
                            </IconButton>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
export default Main
