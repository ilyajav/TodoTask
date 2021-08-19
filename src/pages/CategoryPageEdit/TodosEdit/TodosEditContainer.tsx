// eslint-disable-next-line no-use-before-define
import React, {FC} from 'react';
import {useDispatch} from 'react-redux';
import {
    changeTodoDescription, changeTodoStatus, changeTodoTitle, TodosType,
} from '../../../store/todo-reducer';
import {TodoEdit} from './TodoEdit/TodoEdit';
import style from './Todos.module.css';

type TodoTypePropsType = {
    todo: TodosType[]
    categoryId: string
    id: string,
}

export const TodosEditContainer: FC<TodoTypePropsType> = (
    {todo, categoryId, id}
) => {
    const dispatch = useDispatch();

    return (
        <div>
            {
                // eslint-disable-next-line array-callback-return,consistent-return
                todo.map(td => {
                    const onChangeTodoStatus = (e: React.MouseEvent<HTMLInputElement>) => {
                        const isDone = e.currentTarget.checked;
                        dispatch(changeTodoStatus(categoryId, td.id, isDone));
                    };
                    const onChangeDescription = (description: string) => {
                        dispatch(changeTodoDescription(categoryId, td.id, description));
                    };
                    const changeTitle = (title: string) => {
                        dispatch(changeTodoTitle(categoryId, td.id, title));
                    };
                    // eslint-disable-next-line no-debugger
                    debugger;
                    if (td.id === id) {
                        // eslint-disable-next-line no-debugger
                        debugger;
                        return (
                            <div key={td.id} className={style.item}>
                                <TodoEdit
                                    onChangeTodoStatus={onChangeTodoStatus}
                                    todoTitle={td.title}
                                    isDone={td.isDone}
                                    key={td.id}
                                    todoDescription={td.description}
                                    changeDescription={onChangeDescription}
                                    changeTitle={changeTitle}
                                />
                            </div>
                        );
                    }
                })
            }
        </div>
    );
};
