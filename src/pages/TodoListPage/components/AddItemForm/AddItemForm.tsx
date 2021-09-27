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

import {TodoStyles} from '../../../CommonComponents';

import styles from './AddItemForm.module.css';

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
            addItem(title, categoryId);
            setTitle('');
        }
    };
    const onPressKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onAddItem();
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
                    inputProps={{'data-testid': 'change-title'}}
                />
                <Button
                    onClick={onAddItem}
                    color="primary"
                    size="large"
                    data-testid="title-submit"
                >
                    <span className={styles.button}> Add </span>
                </Button>
            </Grid>
        </>
    );
});
