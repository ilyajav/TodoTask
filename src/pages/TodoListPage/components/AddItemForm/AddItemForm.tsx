import React, {
    ChangeEvent,
    useState,
    KeyboardEvent,
} from 'react';
import {
    Button,
    Grid,
    TextField,
} from '@material-ui/core';

import {TodoStyles} from '../TodoStyles';

type AddItemFormProps = {
    formText: string
    addItem: (id: string, title: string) => void;
    categoryId: string,
    addStyle: TodoStyles;
}

export const AddItemForm = React.memo((
    {
        formText,
        addItem,
        categoryId,
        addStyle,
    }: AddItemFormProps
) => {
    const [title, setTitle] = useState<string>('');

    const onChangeTitle = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    const onAddItem = () => {
        if (title.trim()) {
            addItem(title.trim(), categoryId);
            setTitle('');
        }
    };
    const onPressKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onAddItem();
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
                <Button onClick={onAddItem}>Add</Button>
            </Grid>
        </>
    );
});