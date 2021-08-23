import React, {ChangeEvent, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Header} from './compnents/Header/Header';
import {Todo} from './TodoList';
import {
    changeTodoStatus,
    TodosType,
    AppRootStateType,
    AddItemForm,
} from './index';

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

    const onChangeTodoStatus = useCallback((e: ChangeEvent<HTMLInputElement>, id: string) => {
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

    return (
        <div>
            <Header />
            <AddItemForm formText="Enter new Todo name" />
            {
                filteredTodo.map(td => (
                    <div key={td.id}>
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
        </div>
    );
};
