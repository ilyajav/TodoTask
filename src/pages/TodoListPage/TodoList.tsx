import React, {ChangeEvent} from 'react';
import {
    Box,
    Checkbox,
    Grid,
    IconButton,
    Paper,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';

import style from './TodoList.module.css';

type TodoProps = {
    onChangeTodoStatus: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
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
    const changeTodoStatus = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeTodoStatus(e, id);
    };

    const styles = {
        Box: {
            padding: 10,
            margin: '0 350px',
            border: '1px solid black',
        },
    };

    return (
        <Box style={styles.Box}>
            <Paper>
                <Grid container direction="row" justifyContent="space-between">
                    <div>
                        <Checkbox checked={isDone} color="primary" onChange={changeTodoStatus} />
                        <span className={style.item}>{todoTitle}</span>
                    </div>
                    <div>
                        <IconButton color="primary">
                            <CreateIcon className={style.icon} />
                        </IconButton>
                    </div>
                </Grid>
            </Paper>
        </Box>
    );
});
