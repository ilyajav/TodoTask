import React, {ChangeEvent} from 'react';
import {
    Box,
    Checkbox, Divider,
    Grid,
    IconButton,
    Paper,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';

import {TodosType} from './index';

import style from './TodoList.module.css';

type TodoProps = {
    onChangeTodoStatus: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
    todo: TodosType[];
}

export const TodoList = React.memo((
    {
        onChangeTodoStatus,
        todo,
    }: TodoProps
) => {
    const changeTodoStatus = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        onChangeTodoStatus(e, id);
    };

    const styles = {
        Paper: {
            padding: 10,
            height: 350,
            width: 600,
            overflowY: 'auto' as 'auto',
            margin: '10px 350px',
        },
    };

    return (
        <Box>
            <Paper style={styles.Paper}>
                {
                    todo.map(td => (
                        <div key={td.id}>
                            <Grid container direction="row" justifyContent="space-between">
                                <div>
                                    <Checkbox
                                        checked={td.isDone}
                                        color="primary"
                                        onChange={e => changeTodoStatus(e, td.id)}
                                    />
                                    <span className={style.item}>{td.title}</span>
                                </div>
                                <div>
                                    <IconButton color="primary">
                                        <CreateIcon className={style.icon} />
                                    </IconButton>
                                </div>
                            </Grid>
                            <Divider light />
                        </div>
                    ))
                }
            </Paper>
        </Box>
    );
});
