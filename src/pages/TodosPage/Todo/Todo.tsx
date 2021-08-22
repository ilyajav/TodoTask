// eslint-disable-next-line no-use-before-define
import React, {FC} from 'react';
import {Grid, IconButton} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import style from './Todo.module.css';

type TodoPropsType = {
    onChangeTodoStatus: (e: React.MouseEvent<HTMLInputElement>) => void;
    todoTitle: string
    isDone: boolean;
}

export const Todo: FC<TodoPropsType> = (
    {
        onChangeTodoStatus,
        todoTitle,
        isDone,
    }
) => (

    <div>
        <Grid container direction="row" justifyContent="space-between">
            <div>
                <input type="checkbox" checked={isDone} onClick={onChangeTodoStatus} />
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
