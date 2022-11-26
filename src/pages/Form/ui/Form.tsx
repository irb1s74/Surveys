import {Container, Stack,} from "@mui/material";
import {FormReply} from "features/FormReply";

const Form = () => {

    return (
        <Container maxWidth='md'>
            <Stack direction='column' sx={{pt: "10px", pb: "10px"}} spacing={2}>
                <FormReply/>
            </Stack>
        </Container>
    );
};

export default Form;
