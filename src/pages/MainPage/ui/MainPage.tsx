import {FC, useCallback, useEffect, useState} from 'react';
import {Container, Grid} from "@mui/material";
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

    useEffect(() => {
        dispatch(getForms())
    }, [])
    return (
        <Container maxWidth='xl'>
            <Grid container spacing={3}>
                {authData.role === "HR" && (
                    <Grid item xl={2}>
                        <CardAddForm onClick={onOpen}/>
                    </Grid>
                )}
                {forms.map((form) => (
                    <Grid key={form.id} item xl={2}>
                        <CardForm data={form}/>
                    </Grid>
                ))}
            </Grid>
            <AddFormModal isOpen={addForm} onClose={onClose}/>
        </Container>
    );
};
export default MainPage
