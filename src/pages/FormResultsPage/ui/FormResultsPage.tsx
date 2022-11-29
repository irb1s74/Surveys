import {Container, Stack} from "@mui/material";
import {FormResults} from "features/FormResults";

const FormResultsPage = () => {

    return (
        <Container maxWidth='md'>
            <Stack direction='column' sx={{pt: "10px", pb: "10px"}} spacing={2}>
                <FormResults/>
            </Stack>
        </Container>
    );
};

export default FormResultsPage;
