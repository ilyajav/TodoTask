import React from 'react';
import {Box} from '@material-ui/core';

import {CategoryTree} from '../CommonComponents';
import {HeaderEdit} from './components/HeaderEdit';
import {Todos} from '../../store';
import {TodoListEdit} from './TodoListEdit';

type TodoListPageEditProps = {
    mode: string;
    todoData: Todos[];
    onChangeTodo: (title: string, id: string, description: string, isDone: boolean) => void;
    todoId: string | null,
}

export const TodoListPageEdit = React.memo((
    {
        mode,
        todoData,
        onChangeTodo,
        todoId,
    }: TodoListPageEditProps
) => {
    let filteredTodo = todoData;

    if (todoId) {
        filteredTodo = todoData.filter(td => td.id === todoId);
    }

    return (
        <>
            {
                filteredTodo.map(td => <HeaderEdit title={td.title} />)
            }
            <Box display="flex">
                <div>
                    <CategoryTree
                        mode={mode}
                        todoId={todoId}
                    />
                </div>
                <div>
                    {
                        filteredTodo.map(td => (
                            <div key={td.id}>
                                <TodoListEdit
                                    onChangeTodo={onChangeTodo}
                                    title={td.title}
                                    description={td.description}
                                    isDone={td.isDone}
                                    id={td.id}
                                />
                            </div>
                        ))
                    }
                </div>
            </Box>
        </>
    );
});
