import React, {FC} from 'react'
import style from './Todo.module.css'
import {changeTodoStatus, TodosType} from "../store/todo-reducer";
import {useDispatch} from "react-redux";
import CreateIcon from "@material-ui/icons/Create";
import {IconButton} from "@material-ui/core";


type TodoType = {
    todo: TodosType[],
    categoryId: string,
}

export const Todo: FC<TodoType> = ({todo, categoryId}) =>{

    const dispatch = useDispatch()


    return(
        <div>
            {
             todo.map(td => {
                 const onChangeTodoStatus = (e: React.MouseEvent<HTMLInputElement>) => {
                     const isDone = e.currentTarget.checked
                     dispatch(changeTodoStatus(categoryId, td.id, isDone))
                 }
                 return <div key={td.id} className={style.item}>
                     <input
                         type='checkbox'
                         checked={td.isDone}
                         onClick={onChangeTodoStatus}
                     />
                     <span className={style.title}>
                     {td.title}
                     </span>
                     <span className={style.changeTodo}>
                     <IconButton color={'primary'}>
                         <CreateIcon/>
                     </IconButton>
                 </span>
                 </div>
             })
            }
        </div>
    )
}
