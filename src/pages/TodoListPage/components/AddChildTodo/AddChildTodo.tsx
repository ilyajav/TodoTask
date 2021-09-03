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

    const onShowAdding = () => {
        setAddMode(true);
    };
    const onHideAdding = () => {
        setAddMode(false);
    };
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewChildTitle(e.currentTarget.value);
    };
    const onAddCategory = () => {
        onAddSubCategory(id, newChildTitle);
        setNewChildTitle('');
        setAddMode(false);
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
