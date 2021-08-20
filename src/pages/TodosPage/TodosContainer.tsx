// eslint-disable-next-line no-use-before-define
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Box, Container, Grid, Paper,
} from '@material-ui/core';
import {Todo} from './Todo/Todo';
import style from './Todos.module.css';
import {AppRootStateType} from '../../store/store';
import {changeTodoStatus, TodosType} from '../../store/todo-reducer';
import {Header} from './compnents/Header/Header';
import {changeStatus, StatusType} from '../../store/app-reducer';
import {AddItemForm} from '../../utils/AddItemForm';

export const TodosContainer = () => {
    const todosData = useSelector<AppRootStateType, TodosType[]>(state => state.todoData);
    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(changeStatus('succeeded'));
    }, []);

    const {search} = window.location;
    const params = new URLSearchParams(search);
    const doneStatus = params.get('showDone');

    let filteredTodo = todosData;
    if (doneStatus === 'true') {
        filteredTodo = todosData.filter(td => td.isDone);
    }

    const styles = {
        Paper: {
            padding: 10,
            height: 300,
            width: 500,
            overflowY: 'auto' as 'auto',
        },
    };

    return (
        <div>
            <Header
                status={status}
            />
            <Container fixed>
                <Grid
                    container
                    className={style.addForm}
                >
                    <AddItemForm formText="Enter new Todo name" />
                </Grid>
            </Container>
            <Box margin="10px 400px">
                <Paper style={styles.Paper}>
                    {
                        filteredTodo.map(td => {
                            const onChangeTodoStatus = (e: React.MouseEvent<HTMLInputElement>) => {
                                const isDone = e.currentTarget.checked;
                                dispatch(changeTodoStatus(td.id, isDone));
                            };
                            return (
                                <div key={td.id} className={style.item}>
                                    <Todo
                                        onChangeTodoStatus={onChangeTodoStatus}
                                        todoTitle={td.title}
                                        isDone={td.isDone}
                                        key={td.id}
                                    />
                                </div>
                            );
                        })
                    }
                </Paper>
            </Box>
        </div>
    );
};
