import React, {FC} from "react";
import {changeTodoStatus, TodosType} from "../../store/todo-reducer";
import style from "../Todos.module.css";
import {useDispatch} from "react-redux";
import {TodoSpan} from "./TodoSpan";

type TodoPropsType = {
    todo: TodosType[]
    categoryId: string
    description: boolean,
    setDescription: (value: boolean) => void,
}

export const Todo: FC<TodoPropsType> = (
    {todo, categoryId, description, setDescription}) => {

    const dispatch = useDispatch()

    return (
        <div>
            {
                todo.map(td => {
                    const onChangeTodoStatus = (e: React.MouseEvent<HTMLInputElement>) => {
                        const isDone = e.currentTarget.checked
                        dispatch(changeTodoStatus(categoryId, td.id, isDone))
                    }
                    return (
                        <div key={td.id} className={style.item}>
                           <TodoSpan
                               setDescription={setDescription}
                               description={description}
                               isDone={td.isDone}
                               todoTitle={td.title}
                               textDescription={td.description}
                               onChangeTodoStatus={onChangeTodoStatus}
                               categoryId={categoryId}
                               todoId={td.id}
                               />
                        </div>
                    )
                })
            }
        </div>
    )
}