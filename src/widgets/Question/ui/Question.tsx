import {ChangeEvent, Fragment, memo, useCallback, useEffect, useRef, useState} from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    FormControlLabel,
    IconButton,
    Stack,
    Switch, TextField,
} from "@mui/material";
import {IoTrash} from "react-icons/io5";
import {QuestionHeader} from "./QuestionHeader";
import {Questions, Variants} from "entities/Form";
import Variant from "shared/ui/Variant/Variant";
import useDebounce from "shared/lib/useDebounce/useDebounce";


interface QuestionProps {
    data: Questions,
    onDelete?: (questionId: number) => () => void;
    onUpdate?: (question: Questions) => void;
    onUpdateVariant?: (variant: Variants) => void;
    onCreateVariant?: (questionId: number) => void;
    onDeleteVariant?: (variantId: number, questionId: number,) => void;
}

const Question = ({
    data,
    onDelete,
    onUpdate,
    onCreateVariant,
    onDeleteVariant,
    onUpdateVariant
}: QuestionProps) => {
    const [question, setQuestion] = useState(data);
    const [correctRadio, setCorrectRadio] = useState(data.type === "radio" && data.variants.find((variant) => variant.correct)?.id);
    const debouncedValue = useDebounce(question, 2000)
    const isChanged = useRef(false);


    console.log(data.variants);
    useEffect(() => {
        if (isChanged.current) {
            onUpdate(question);
        }
    }, [debouncedValue])

    const handleSetType = useCallback((type: string) => {
        isChanged.current = true;
        setQuestion({...question, type: type});
    }, [])

    const handleSetTitle = useCallback((title: string) => {
        isChanged.current = true;
        setQuestion({...question, title: title});
    }, [])


    const handleSetRequired = (event: ChangeEvent<HTMLInputElement>) => {
        isChanged.current = true;
        setQuestion({...question, required: event.target.checked});
    }

    const handleCreateVariant = useCallback(() => {
        onCreateVariant(question.id);
    }, [])

    const handleSetCorrectRadioVariant = useCallback((variantId: number) => {
        setCorrectRadio(variantId);
    }, [])

    return (
        <Card>
            <CardContent>
                <QuestionHeader
                    title={question.title}
                    type={question.type}
                    setTitle={handleSetTitle}
                    setType={handleSetType}
                />
                <Stack direction="row" flexWrap="wrap" justifyContent="space-between">
                    {question.type === "radio" || question.type === "checkbox" ? (
                        <Fragment>
                            {data.variants && data.variants.map((variant) => (
                                <Variant
                                    key={variant.id}
                                    variant={variant}
                                    type={question.type}
                                    correctRadio={correctRadio}
                                    setCorrectRadio={handleSetCorrectRadioVariant}
                                    onDelete={onDeleteVariant}
                                    onUpdate={onUpdateVariant}
                                />
                            ))}
                            <Button fullWidth onClick={handleCreateVariant} variant="text">Добавить</Button>
                        </Fragment>
                    ) : question.type === "text" ? (
                        <TextField label="Ответ" disabled/>
                    ) : (
                        <div/>
                    )}
                </Stack>
            </CardContent>
            <Divider/>
            <CardActions sx={{justifyContent: "flex-end"}}>
                <FormControlLabel
                    control={<Switch/>}
                    onChange={handleSetRequired}
                    checked={question.required}
                    label="Обязательный"
                />
                <Divider orientation="vertical" variant="middle" flexItem/>
                <IconButton onClick={onDelete(question.id)}>
                    <IoTrash/>
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default memo(Question);
