import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Box,
    Paper,
} from '@material-ui/core';

import {AppRootStateType} from '../../store/store';
import {changeTodoStatus, TodosType} from '../../store/todo-reducer';
import {Header} from './compnents/Header/Header';
import {AddItemForm} from '../../utils/AddItemForm';
import {Todo} from './TodoList';

import style from './TodosContainer.module.css';

enum PARAMS {
    SHOW_DONE = 'showDone',
    SEARCH_TEXT = 'searchText'
}

export const TodoListContainer = () => {
    const todosData = useSelector<AppRootStateType, TodosType[]>(state => state.todoData);
    const dispatch = useDispatch();

    const {search} = window.location;
    const params = new URLSearchParams(search);
    const doneStatus = params.get(PARAMS.SHOW_DONE);
    const searchTodo = params.get(PARAMS.SEARCH_TEXT);

    const onChangeTodoStatus = useCallback((e: React.MouseEvent<HTMLInputElement>, id: string) => {
        const isDone = e.currentTarget.checked;
        dispatch(changeTodoStatus(id, isDone));
    }, [dispatch]);

    let filteredTodo = todosData;
    if (doneStatus === 'true') {
        filteredTodo = todosData.filter(td => td.isDone);
    }
    if (searchTodo) {
        filteredTodo = todosData.filter(td => {
            const title = td.title.toLowerCase();
            const filter = searchTodo.toLowerCase();
            return title.includes(filter);
        });
    }

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
        <div>
            <Header />
            <AddItemForm formText="Enter new Todo name" />
            <Box>
                <Paper style={styles.Paper}>
                    {
                        filteredTodo.map(td => (
                            <div key={td.id} className={style.item}>
                                <Todo
                                    onChangeTodoStatus={onChangeTodoStatus}
                                    todoTitle={td.title}
                                    isDone={td.isDone}
                                    key={td.id}
                                    id={td.id}
                                />
                            </div>
                        ))
                    }
                </Paper>
            </Box>
        </div>
    );
};
