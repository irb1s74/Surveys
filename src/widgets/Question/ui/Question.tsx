import {ChangeEvent, memo, useCallback, useEffect, useRef, useState} from 'react';
import {
    Card,
    CardContent, CardHeader,
    Stack,
    TextField,
} from "@mui/material";
import {Questions} from "entities/Form";
import Variant from "shared/ui/Variant/Variant";
import useDebounce from "shared/lib/useDebounce/useDebounce";


interface QuestionEditorProps {
    data: Questions,
    setReply: ({}: {
        questionId: number;
        title: string;
    }) => void
}

const Question = ({
    data,
    setReply,
}: QuestionEditorProps) => {
    const [title, setTitle] = useState("");
    const isChangedQuestion = useRef(false);
    const debouncedValue = useDebounce(title, 650)

    const handleOnChangeText = (event: ChangeEvent<HTMLInputElement>) => {
        isChangedQuestion.current = true;
        setTitle(event.target.value);
    }

    useEffect(() => {
        if (isChangedQuestion.current) {
            setReply({questionId: data.id, title: title})
        }
    }, [debouncedValue])

    return (
        <Card>
            <CardHeader title={`${data.title || ""} ${data.required && "*"}`}
            />
            <CardContent>
                <Stack direction="column">
                    {data.type === "radio" || data.type === "checkbox" ? (
                        data.variants && data.variants.map((variant) => (
                            <Variant
                                key={variant.id}
                                variant={variant}
                                type={data.type}
                                editor={false}
                            />
                        ))
                    ) : data.type === "text" ? (
                        <TextField onChange={handleOnChangeText} label="Мой Ответ" fullWidth/>
                    ) : (
                        <div/>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
}

export default memo(Question);
