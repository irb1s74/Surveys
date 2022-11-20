import {ChangeEvent, FC} from 'react';
import {Checkbox, Radio, Stack, TextField} from "@mui/material";
import {Variant} from "entities/Form";

interface VariantProps {
    variant: Variant,
    type: string,
}

export const AnswerVariant: FC<VariantProps> = ({variant, type}) => {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        // setValue(+event.target.value)
    }
    return (
        <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={2}>
            {type === "checkbox" ?
                (<Checkbox/>)
                :
                (
                    <Radio
                        checked={variant.correct}
                        onChange={onChange}
                        value={variant.id}
                    />
                )
            }
            <TextField variant="filled" label="Вариант ответа"/>
        </Stack>
    );
};
