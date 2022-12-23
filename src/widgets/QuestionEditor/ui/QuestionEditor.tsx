import {ChangeEvent, Fragment, memo, MutableRefObject, useCallback, useEffect, useRef, useState} from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent, CardMedia,
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
import {getUrl} from "shared/lib/getUrl/getUrl";
import {Player} from "shared/ui/Player";


interface QuestionEditorProps {
    data: Questions,
    onDelete?: (questionId: number) => () => void;
    onUpdate?: (question: Questions) => void;
    onUpdateImage?: (data: { questionId: string, files: any }) => void;
    onUpdateVideo?: (data: { questionId: string, files: any }) => void;
    onUpdateVariant?: (variant: Variants) => void;
    onCreateVariant?: (questionId: number) => void;
    onDeleteVariant?: (variantId: number, questionId: number,) => void;
}

const QuestionEditor = ({
    data,
    onDelete,
    onUpdate,
    onUpdateImage,
    onUpdateVideo,
    onCreateVariant,
    onDeleteVariant,
    onUpdateVariant
}: QuestionEditorProps) => {
    const [question, setQuestion] = useState(data);
    const [questionImage, setQuestionImage] = useState(data.title && `${getUrl}questions/images/${data.title}`);
    const fileImageRef = useRef(document.createElement("input")) as MutableRefObject<HTMLInputElement>;
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
    }, [question])

    const handleSetTitle = useCallback((title: string) => {
        isChanged.current = true;
        setQuestion({...question, title: title});
    }, [question])

    const handleSetRequired = (event: ChangeEvent<HTMLInputElement>) => {
        isChanged.current = true;
        setQuestion({...question, required: event.target.checked});
    }

    const handleOpenInput = () => {
        fileImageRef.current.click();
    }

    const handleCreateVariant = useCallback(() => {
        onCreateVariant(question.id);
    }, [])

    const handleChangeImage = () => {
        if (fileImageRef.current.files) {
            setQuestionImage(URL.createObjectURL(fileImageRef.current.files[0]))
            onUpdateImage({questionId: `${question.id}`, files: fileImageRef.current.files})
        }
    }
    const handleChangeVideo = () => {
        if (fileImageRef.current.files) {
            onUpdateVideo({questionId: `${question.id}`, files: fileImageRef.current.files})
        }
    }

    return (
        <Card>
            <CardContent>
                <Stack direction="row" flexWrap="wrap" justifyContent="space-between">
                    {question.type === "radio" || question.type === "checkbox" ? (
                        <Fragment>
                            <QuestionEditorHeader
                                title={question.title}
                                type={question.type}
                                setTitle={handleSetTitle}
                                setType={handleSetType}
                                handleOpenInput={handleOpenInput}
                            />
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
                        <Fragment>
                            <QuestionEditorHeader
                                title={question.title}
                                type={question.type}
                                setTitle={handleSetTitle}
                                setType={handleSetType}
                                handleOpenInput={handleOpenInput}
                            />
                            <TextField label="Ответ" fullWidth disabled/>
                        </Fragment>
                    ) : question.type === "image" ? (
                        <Stack direction="column" sx={{width: "100%"}} spacing={1} alignItems="center">
                            <QuestionEditorHeader
                                title={question.title}
                                type={question.type}
                                setTitle={handleSetTitle}
                                setType={handleSetType}
                                handleOpenInput={handleOpenInput}
                            />
                            {questionImage && (
                                <CardMedia
                                    component="img"
                                    height="580"
                                    alt="load Image"
                                    image={questionImage}
                                />
                            )}
                            <input
                                ref={fileImageRef}
                                type='file'
                                accept=".jpeg, .jpg, .png, .gif"
                                onChange={handleChangeImage}
                                hidden
                            />
                            <TextField label="Ответ" fullWidth disabled/>
                        </Stack>
                    ) : question.type === "video" ? (
                        <Stack direction="column" sx={{width: "100%"}} spacing={1} alignItems="center">
                            <QuestionEditorHeader
                                title={question.title}
                                type={question.type}
                                setTitle={handleSetTitle}
                                setType={handleSetType}
                                handleOpenInput={handleOpenInput}
                            />
                            {question.title && (
                                <Player
                                    src={`${getUrl}questions/stream/${question.title}`}
                                />
                            )}
                            <input
                                ref={fileImageRef}
                                type='file'
                                accept=".mp4"
                                onChange={handleChangeVideo}
                                hidden
                            />
                            <TextField label="Ответ" fullWidth disabled/>
                        </Stack>
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
