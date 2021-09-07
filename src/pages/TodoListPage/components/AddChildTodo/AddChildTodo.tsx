import {ControlPoint} from '@material-ui/icons';
import {
    Button,
    IconButton,
    TextField,
} from '@material-ui/core';
import React,
{
    ChangeEvent,
    useState,
} from 'react';

import style from './AddChildTodo.module.css';

type AddChildTodoProps = {
    id: string,
    onAddSubCategory: (id: string, title: string) => void;
}

export const AddChildTodo = ({onAddSubCategory, id}: AddChildTodoProps) => {
    const [addMode, setAddMode] = useState<boolean>(false);
    const [newChildTitle, setNewChildTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const onShowAdding = () => {
        setAddMode(true);
    };
    const onHideAdding = () => {
        setAddMode(false);
        setError(false);
    };
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewChildTitle(e.currentTarget.value);
        setError(false);
    };
    const onAddCategory = () => {
        if (newChildTitle.trim()) {
            onAddSubCategory(id, newChildTitle.trim());
            setNewChildTitle('');
            setAddMode(false);
        } else {
            setError(true);
        }
    };
    return (
        <>
            {
                addMode
                    ? (
                        <div className={style.addChild}>
                            <TextField
                                value={newChildTitle}
                                onChange={onChangeTitle}
                                label="new sub category title"
                                error={error}
                            />
                            <Button onClick={onAddCategory}>Add</Button>
                            <Button onClick={onHideAdding}>Cancel</Button>
                        </div>
                    )
                    : (
                        <>
                            <IconButton color="primary" onClick={onShowAdding}>
                                <ControlPoint />
                            </IconButton>
                        </>
                    )

            }
        </>
    );
};
