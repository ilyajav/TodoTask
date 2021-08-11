import React, {FC} from 'react'
import {TodosType} from "../../store/todo-reducer";
import style from './Todo.module.css'


type TodoType = {
    todo: TodosType[]
}

export const Todo: FC<TodoType> = ({todo}) =>{
    return(
        <div>
            {
             todo.map(td =>{
                 return <div key={td.id} className={style.item}>
                     <input type='checkbox' checked={td.isDone} />
                     {td.title}
                 </div>
             })
            }
        </div>
    )
}
