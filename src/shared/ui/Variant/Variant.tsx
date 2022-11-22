import {ChangeEvent, FC, memo, useEffect, useRef, useState} from 'react';
import {Checkbox, IconButton, Radio, Stack, TextField} from "@mui/material";
import {Variants} from "entities/Form";
import {IoTrash} from "react-icons/io5";
import useDebounce from "shared/lib/useDebounce/useDebounce";

interface VariantProps {
    variant: Variants;
    type: string;
    correctRadio: number;
    setCorrectRadio: (variantId: number) => void;
    onDelete: (variantId: number, questionId: number) => void;
    onUpdate: (variant: Variants) => void;
}

const Variant: FC<VariantProps> = ({variant, type, onDelete, onUpdate, correctRadio, setCorrectRadio}) => {
    const [data, setData] = useState(variant);
    const isChanged = useRef(false);
    const debouncedValue = useDebounce(data, 650);


    useEffect(() => {
        if (isChanged.current) {
            onUpdate(data);
        }
    }, [debouncedValue])

    useEffect(() => {
        if (data.id !== correctRadio && data.correct && type === "radio") {
            isChanged.current = true;
            setData({...data, correct: false})
        }
    }, [correctRadio])

    const handleRadioChange = () => {
        isChanged.current = true;
        if (data.correct) {
            setCorrectRadio(0);
            setData({...data, correct: false})
        } else {
            setCorrectRadio(data.id);
            setData({...data, correct: !data.correct})
        }
    };

    const handleOnChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        isChanged.current = true;
        setData({...data, title: event.target.value})
    }

    const handleDelete = () => {
        onDelete(variant.id, variant.questionId);
    }

    return (
        <Stack sx={{mb: '20px'}} direction="row" alignItems="center" justifyContent="flex-start" spacing={2}>
            {type === "checkbox" ?
                (<Checkbox/>)
                :
                (
                    <Radio
                        onClick={handleRadioChange}
                        checked={+correctRadio === data.id}
                    />
                )
            }
            <TextField variant="filled" label="Вариант ответа" value={data.title} onChange={handleOnChangeTitle}/>
            <IconButton onClick={handleDelete}>
                <IoTrash/>
            </IconButton>
        </Stack>
    );
};
export default memo(Variant);
