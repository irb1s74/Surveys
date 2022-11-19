import {FC, ReactNode, useState} from 'react';
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";

interface EditFormActionsProps {
    actions: DialActions[]
}

interface DialActions {
    icon: ReactNode,
    name: string,
    onClick?: () => void;
}


export const DialActions: FC<EditFormActionsProps> = ({actions}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <SpeedDial
            ariaLabel="Добавить вопрос"
            sx={{position: 'fixed', bottom: 16, right: 16}}
            icon={<SpeedDialIcon/>}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.onClick}
                />
            ))}
        </SpeedDial>
    );
};
