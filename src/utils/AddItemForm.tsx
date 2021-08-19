// eslint-disable-next-line no-use-before-define
import React, {
    ChangeEvent, useState, KeyboardEvent, FC,
} from 'react';
import {Button, IconButton, TextField} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {v1} from 'uuid';
import {addCategory} from '../store/category-reducer';

type AddItemForm = {
    formText: string
}

// eslint-disable-next-line no-redeclare
export const AddItemForm: FC<AddItemForm> = ({formText}) => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState<string>('');

    const onChangeTitle = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    const onPressKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            // eslint-disable-next-line no-use-before-define
            onAddCategory();
            setTitle('');
        }
    };
    const onAddCategory = () => {
        const newId = v1();
        if (title.trim()) {
            dispatch(addCategory(newId, title.trim()));
            setTitle('');
        }
    };

    return (
        <div>
            <TextField
                variant="outlined"
                value={title}
                label={formText}
                onChange={onChangeTitle}
                onKeyPress={onPressKey}
            />
            <IconButton color="primary">
                <Button onClick={onAddCategory}>Add</Button>
            </IconButton>
        </div>
    );
};
