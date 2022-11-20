import {ChangeEvent, useEffect, useRef, useState} from 'react';
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
import {Questions} from "entities/Form";
import {AnswerVariant} from "shared/ui/Variant/Variant";
import useDebounce from "shared/lib/useDebounce/useDebounce";


interface QuestionProps {
    data: Questions,
    onDelete?: (questionId: number) => () => void;
    onUpdate?: (question: Questions) => void;
    onCreateVariant?: (questionId: number) => void;
}

export const Question = ({data, onDelete, onUpdate, onCreateVariant}: QuestionProps) => {
    console.log(data);
    const [question, setQuestion] = useState(data);
    let isChanged = useRef(false);
    const debouncedValue = useDebounce(question, 2000)

    useEffect(() => {
        if (isChanged.current) {
            onUpdate(question);
        }
    }, [debouncedValue])

    const handleSetType = (type: string) => {
        isChanged.current = true;
        setQuestion({...question, type: type});
    }

    const handleSetTitle = (title: string) => {
        isChanged.current = true;
        setQuestion({...question, title: title});
    }

    const handleSetRequired = (event: ChangeEvent<HTMLInputElement>) => {
        isChanged.current = true;
        setQuestion({...question, required: event.target.checked});
    }

    const handleCreateVariant = () => {
        onCreateVariant(question.id);
    }

    return (
        <Card>
            <CardContent>
                <QuestionHeader
                    title={question.title}
                    type={question.type}
                    setTitle={handleSetTitle}
                    setType={handleSetType}
                />
                <Stack spacing={2}>
                    {question.type === "radio" || question.type === "checkbox" ? (
                        <>
                            {data.variants && data.variants.map((variant) => (
                                <AnswerVariant key={variant.id} variant={variant} type={question.type}/>
                            ))}
                            <Button onClick={handleCreateVariant} variant="text">Добавить</Button>
                        </>
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
