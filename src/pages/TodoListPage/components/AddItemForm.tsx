import React, {
    ChangeEvent,
    useState,
    KeyboardEvent,
} from 'react';
import {
    Button,
    Container,
    Grid,
    TextField,
} from '@material-ui/core';

import style from './AddItemForm.module.css';

type AddItemFormProps = {
    formText: string
    onAddItem: (id: string, title: string) => void;
    categoryId: string,
}

export const AddItemForm = React.memo((
    {
        formText,
        onAddItem,
        categoryId,
    }: AddItemFormProps
) => {
    const [title, setTitle] = useState<string>('');

    const onChangeTitle = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    const onAddTodo = () => {
        if (title.trim()) {
            onAddItem(categoryId, title.trim());
            setTitle('');
        }
    };
    const onPressKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onAddTodo();
            setTitle('');
        }
    };

    return (
        <div>
            <Container fixed>
                <Grid
                    container
                    className={style.addForm}
                >
                    <TextField
                        variant="outlined"
                        value={title}
                        label={formText}
                        onChange={onChangeTitle}
                        onKeyPress={onPressKey}
                    />
                    <Button onClick={onAddTodo}>Add</Button>
                </Grid>
            </Container>
        </div>
    );
});
