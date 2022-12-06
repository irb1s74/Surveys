import {FC, Fragment, useCallback, useEffect, useState} from 'react';
import {Container, Divider, Grid, Stack, Typography} from "@mui/material";
import {CardAddForm} from "widgets/CardAddForm";
import {CardForm} from "widgets/CardForm";
import {AddFormModal} from "features/AddForm";
import {getFormForms, getForms} from "entities/Form";
import {useDispatch, useSelector} from "react-redux";
import {getUserAuthData} from "entities/User";

interface MainProps {
}

const MainPage: FC<MainProps> = () => {
    const dispatch = useDispatch();
    const authData = useSelector(getUserAuthData);
    const [addForm, setAddForm] = useState(false);
    const forms = useSelector(getFormForms)

    const onClose = useCallback(() => setAddForm(false), []);
    const onOpen = () => {
        setAddForm(true);
    }

    const drafts = forms.filter((form) => form.published === false);
    const published = forms.filter((form) => form.published === true);

    useEffect(() => {
        dispatch(getForms())
    }, [])
    return (
        <Container maxWidth='xl'>
            {authData.role === "HR" ? (
                <Stack spacing={2}>
                    <Typography sx={{mt: '20px'}} variant="h5">Опубликованные</Typography>
                    <Divider/>
                    <Grid container spacing={3}>
                        {published.map((form) => (
                            <Grid key={form.id} item xl={2}>
                                <CardForm data={form}/>
                            </Grid>
                        ))}
                    </Grid>
                    <Typography sx={{mt: '20px'}} variant="h5">Черновики</Typography>
                    <Divider/>
                    <Grid container spacing={3}>
                        <Grid item xl={2}>
                            <CardAddForm onClick={onOpen}/>
                        </Grid>
                        {drafts.map((form) => (
                            <Grid key={form.id} item xl={2}>
                                <CardForm data={form}/>
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            ) : (
                <Grid container spacing={3}>
                    {forms.map((form) => (
                        <Grid key={form.id} item xl={2}>
                            <CardForm data={form}/>
                        </Grid>
                    ))}
                </Grid>
            )}
            <AddFormModal isOpen={addForm} onClose={onClose}/>
        </Container>
    );
};
export default MainPage
