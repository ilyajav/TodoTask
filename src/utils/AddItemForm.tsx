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
import {useDispatch} from 'react-redux';

import {addTodo} from '../store/todo-reducer';

import style from './AddItemForm.module.css';

type AddItemFormProps = {
    formText: string
}

export const AddItemForm = React.memo(({formText}: AddItemFormProps) => {
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
