import React, {FC} from 'react'
import {CategoryStateType} from "../store/category-reducer";
import { TodosDataType } from '../store/todo-reducer';
import {Todo} from "./Todo/Todo";
import {AddItemForm} from "../utils/AddItemForm";
import {Box, Paper} from "@material-ui/core";
import style from './Todos.module.css'


type TodoTypePropsType = {
    categories: CategoryStateType[]
    todos: TodosDataType
}

export const Todos: FC<TodoTypePropsType> = ({categories,todos}) =>{


    const styles = {
        Paper: {padding: 20, height: 250, overflowY: 'auto' as 'auto' }
    }

    return(
        <div>
            {
               categories.map(ct => {
                   let todo = todos[ct.id]
                   return <div>
                       <Todo todo={todo} categoryId={ct.id} key={ct.id} />
                   </div>
               })
            }
        </div>
    )
}
