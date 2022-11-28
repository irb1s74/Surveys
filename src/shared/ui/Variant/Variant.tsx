import {ChangeEvent, FC, memo, useEffect, useRef, useState} from 'react';
import {Checkbox, IconButton, Radio, Stack, TextField, Typography} from "@mui/material";
import {Variants} from "entities/Form";
import {IoTrash} from "react-icons/io5";
import useDebounce from "shared/lib/useDebounce/useDebounce";

interface VariantProps {
    variant: Variants;
    type: string;
    onDelete?: (variantId: number, questionId: number) => void;
    onUpdate?: (variant: Variants) => void;
    onChange?: any;
    editor?: boolean;
    value?: string[] | string;
}

const Variant: FC<VariantProps> = ({
    variant,
    type,
    onChange,
    onDelete,
    onUpdate,
    editor = true,
    value
}) => {
    const [data, setData] = useState(variant);
    const isChanged = useRef(false);
    const debouncedValue = useDebounce(data, 650);

    useEffect(() => {
        if (isChanged.current) {
            onUpdate(data);
        }
    }, [debouncedValue])

    const handleOnChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        isChanged.current = true;
        setData({...data, title: event.target.value})
    }

    const handleDelete = () => {
        onDelete(variant.id, variant.questionId);
    }

    if (editor) {
        return (
            <Stack sx={{mb: '20px'}} direction="row" alignItems="center" justifyContent="flex-start" spacing={2}>
                {type === "checkbox" ?
                    (<Checkbox disabled/>)
                    :
                    (<Radio disabled/>)
                }
                <TextField variant="filled" label="Вариант ответа" value={data.title} onChange={handleOnChangeTitle}/>
                <IconButton onClick={handleDelete}>
                    <IoTrash/>
                </IconButton>
            </Stack>
        );
    }
    return (
        <Stack sx={{mb: '20px', flex: 0.5}} direction="row" alignItems="center" justifyContent="flex-start" spacing={2}>

            {type === "checkbox" ? (
                <Checkbox
                    name={`${variant.questionId}`}
                    value={variant.title}
                    onChange={onChange}
                />
            ) : (
                <Radio
                    name={`${variant.questionId}`}
                    checked={value === variant.title}
                    value={variant.title}
                    onChange={onChange}
                />
            )
            }
            <Typography>{data.title}</Typography>
        </Stack>
    );

};
export default memo(Variant);
