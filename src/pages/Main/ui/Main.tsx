import {FC} from 'react';
import {Container, Grid} from "@mui/material";
import {CreateForm} from "widgets/CreateForm";
import {Form} from "widgets/Form";
import {IForm} from "entities/Form";


const mockForms: IForm[] = [
    {
        id: 0,
        title: "Опрос 1"
    }
]

interface MainProps {
}

const Main: FC<MainProps> = () => {
    return (
        <Container maxWidth='xl'>
            <Grid container spacing={3}>
                <Grid item xl={2}>
                    <CreateForm/>
                </Grid>
                {mockForms.map((form) => (
                    <Grid key={form.id} item xl={2}>
                        <Form data={form}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};
export default Main
