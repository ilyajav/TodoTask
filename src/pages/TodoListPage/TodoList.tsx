import React from 'react';
import {
    Grid,
    IconButton,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';

import style from './TodoList.module.css';

type TodoProps = {
    onChangeTodoStatus: (e: React.MouseEvent<HTMLInputElement>, id: string) => void;
    todoTitle: string
    isDone: boolean;
    id: string;
}

export const Todo = React.memo((
    {
        onChangeTodoStatus,
        todoTitle,
        isDone,
        id,
    }: TodoProps
) => {
    const changeTodoStatus = (e: React.MouseEvent<HTMLInputElement>) => {
        onChangeTodoStatus(e, id);
    };

    return (
        <div>
            <Grid container direction="row" justifyContent="space-between">
                <div>
                    <input type="checkbox" checked={isDone} onClick={changeTodoStatus} />
                    <span className={style.item}>{todoTitle}</span>
                </div>
                <div>
                    <IconButton color="primary">
                        <CreateIcon className={style.icon} />
                    </IconButton>
                </div>
            </Grid>
        </div>
    );
});
