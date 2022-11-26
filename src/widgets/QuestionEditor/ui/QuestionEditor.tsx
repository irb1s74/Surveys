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
import {QuestionEditorHeader} from "./QuestionEditorHeader";
import {Questions, Variants} from "entities/Form";
import Variant from "shared/ui/Variant/Variant";
import useDebounce from "shared/lib/useDebounce/useDebounce";


interface QuestionEditorProps {
    data: Questions,
    onDelete?: (questionId: number) => () => void;
    onUpdate?: (question: Questions) => void;
    onUpdateVariant?: (variant: Variants) => void;
    onCreateVariant?: (questionId: number) => void;
    onDeleteVariant?: (variantId: number, questionId: number,) => void;
}

const QuestionEditor = ({
    data,
    onDelete,
    onUpdate,
    onCreateVariant,
    onDeleteVariant,
    onUpdateVariant
}: QuestionEditorProps) => {
    const [question, setQuestion] = useState(data);
    const debouncedValue = useDebounce(question, 650)
    const isChanged = useRef(false);

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

    return (
        <Card>
            <CardContent>
                <QuestionEditorHeader
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
                                    onDelete={onDeleteVariant}
                                    onUpdate={onUpdateVariant}
                                />
                            ))}
                            <Button fullWidth onClick={handleCreateVariant} variant="text">Добавить</Button>
                        </Fragment>
                    ) : question.type === "text" ? (
                        <TextField label="Ответ" fullWidth disabled/>
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

export default memo(QuestionEditor);
