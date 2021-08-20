// eslint-disable-next-line no-use-before-define
import React, {
    ChangeEvent, useState, KeyboardEvent, FC,
} from 'react';
import {Button, IconButton, TextField} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {addTodo} from '../store/todo-reducer';

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
    const onAddTodo = () => {
        if (title.trim()) {
            dispatch(addTodo(title.trim()));
            setTitle('');
        }
    };
    const onPressKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            // eslint-disable-next-line no-use-before-define
            setTitle('');
            onAddTodo();
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
                <Button onClick={onAddTodo}>Add</Button>
            </IconButton>
        </div>
    );
};
