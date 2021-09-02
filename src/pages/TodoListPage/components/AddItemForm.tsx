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
import {TodoStyles} from './TodoStyles';

type AddItemFormProps = {
    formText: string
    onAddItem: (id: string, title: string) => void;
    categoryId: string,
    addStyle: TodoStyles;
}

export const AddItemForm = React.memo((
    {
        formText,
        onAddItem,
        categoryId,
        addStyle,
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
        <>
            <Grid
                style={addStyle}
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
        </>
    );
});
