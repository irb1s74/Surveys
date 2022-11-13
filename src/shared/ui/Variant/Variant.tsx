import {ChangeEvent, FC} from 'react';
import {Checkbox, Radio, Stack, TextField} from "@mui/material";

interface variants {
    id: number;
    text: string;
}

interface VariantProps {
    variant: variants,
    optionVariant: string,
    selectedValue: number
    setValue: (value: number) => void
}

export const Variant: FC<VariantProps> = ({variant, optionVariant, setValue, selectedValue}) => {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(+event.target.value)
    }
    return (
        <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={2}>
            {optionVariant === "checkbox" ?
                (<Checkbox/>)
                :
                (
                    <Radio
                        checked={selectedValue === variant.id}
                        onChange={onChange}
                        value={variant.id}
                    />
                )
            }
            <TextField variant="filled" label="Вариант ответа"/>
        </Stack>
    );
};
