import {FC} from 'react';
import {Card, CardContent, IconButton, Stack, Typography} from "@mui/material";
import {IoEllipsisVerticalSharp} from "react-icons/io5";

interface EditFormAnswersProps {
}

const FormResults: FC<EditFormAnswersProps> = ({}) => {
    return (
        <>
            <Card>
                <CardContent>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="h5">0 ответов</Typography>
                        <IconButton>
                            <IoEllipsisVerticalSharp/>
                        </IconButton>
                    </Stack>
                </CardContent>
            </Card>
        </>
    );
};
export default FormResults
