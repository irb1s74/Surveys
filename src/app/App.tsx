import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Pagination,
    Rating,
    Stack,
    Typography,
} from "@mui/material";
import {Navbar} from "widgets/Navbar";


const App = () => {

    return (
        <>
            <Navbar/>
            <div style={{marginTop: "64px", height: "calc(100vh - 64px)"}}>
                <Stack sx={{height: "100%"}} justifyContent='center' alignItems='center'>
                    <Card sx={{width: "50vw"}}>
                        <CardHeader title="Вопрос ?"/>
                        <CardContent>
                            <Rating name="simple-controlled"/>
                            <Typography component="legend">Read only</Typography>
                            <Rating name="read-only" value={5} readOnly/>
                            <Typography component="legend">Disabled</Typography>
                            <Rating name="disabled" value={5} disabled/>
                            <Typography component="legend">No rating given</Typography>
                            <Rating name="no-value" value={null}/>
                        </CardContent>
                        <CardActions>
                            <Pagination count={10} color="secondary"/>
                        </CardActions>
                    </Card>
                </Stack>
            </div>
        </>
    );
};

export default App;
