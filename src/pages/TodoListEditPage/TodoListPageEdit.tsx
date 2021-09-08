import React from 'react';
import {Box} from '@material-ui/core';

import {CategoryTree, TodoDataStyle} from '../CommonComponents';
import {HeaderEdit} from './components/HeaderEdit';
import {Todos} from '../../store';
import {TodoListEdit} from './TodoListEdit';

import style from './TodoListPageEdit.module.css';

type TodoListPageEditProps = {
    mode: string;
    todoData: Todos[];
    onChangeTodo: (title: string, id: string, description: string, isDone: boolean) => void;
    todoId: string | null;
    styleData: TodoDataStyle;
}

export const TodoListPageEdit = React.memo((
    {
        mode,
        todoData,
        onChangeTodo,
        todoId,
        styleData,
    }: TodoListPageEditProps
) => {
    let filteredTodo = todoData;

    if (todoId) {
        filteredTodo = todoData.filter(td => td.id === todoId);
    }

    return (
        <>
            {
                filteredTodo.map(td => <HeaderEdit title={td.title} key={td.id} />)
            }
            <Box display="flex" className={style.block}>
                <div>
                    <CategoryTree
                        mode={mode}
                        todoId={todoId}
                    />
                </div>
                <div className={style.todo}>
                    {
                        filteredTodo.map(td => (
                            <div key={td.id}>
                                <TodoListEdit
                                    onChangeTodo={onChangeTodo}
                                    title={td.title}
                                    description={td.description}
                                    isDone={td.isDone}
                                    id={td.id}
                                    styleData={styleData}
                                />
                            </div>
                        ))
                    }
                </div>
            </Box>
        </>
    );
});
