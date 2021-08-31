import React, {ChangeEvent} from 'react';
import {
    Box,
    Checkbox,
    Divider,
    Grid,
    IconButton,
    Paper,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import {Link} from 'react-router-dom';

import {Todos} from '../../store';
import {
    ROUTING_PATHS,
    ROUTING_PARAMS,
} from '../../App.constants';

import style from './TodoList.module.css';

type TodoListProps = {
    onChangeTodoStatus: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
    todo: Todos[];
}

export const TodoList = React.memo((
    {
        onChangeTodoStatus,
        todo,
    }: TodoListProps
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

    const editRoute = `${ROUTING_PATHS.TODO_LIST_PAGE_EDIT_ROUTE}${ROUTING_PARAMS.TODO_ID}`;

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
                                        <Link
                                            to={`${editRoute}${td.id}`}
                                        >
                                            <CreateIcon />
                                        </Link>
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
