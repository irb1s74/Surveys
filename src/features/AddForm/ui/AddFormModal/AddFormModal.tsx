import {FC, Suspense} from 'react';
import {Modal, Stack} from "@mui/material";
import {Loader} from "shared/ui/Loader/Loader";
import {AddFormForm} from "../../ui/AddFormForm/AddFormForm.async";

interface AddFormModal {
    isOpen: boolean;
    onClose: () => void;
}

export const AddFormModal: FC<AddFormModal> = ({isOpen, onClose}) => {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
        >
            <Stack sx={{height: "100%"}} justifyContent="center" alignItems="center">
                <Suspense fallback={<Loader/>}>
                    <AddFormForm onClose={onClose}/>
                </Suspense>
            </Stack>
        </Modal>
    );
};
