import React, {FC} from 'react'
import {CategoryStateType} from "../store/category-reducer";
import { TodosDataType } from '../store/todo-reducer';
import {Todo} from "./Todo/Todo";


type TodoTypePropsType = {
    categories: CategoryStateType[]
    todos: TodosDataType
    categoryId: string
}

export const Todos: FC<TodoTypePropsType> = ({categories,todos, categoryId}) =>{

    return(
        <div>
            {
               categories.map(ct => {
                   let todo = todos[ct.id]
                   if(ct.id === categoryId) {
                       return <div>
                           <Todo todo={todo} categoryId={ct.id} key={ct.id}/>
                       </div>
                   }
               })
            }
        </div>
    )
}
