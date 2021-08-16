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
                   debugger
                   let todo = todos[ct.id]
                   debugger
                   if(ct.id === categoryId) {
                       return <div>
                           <Todo todo={todo} categoryId={ct.id} key={ct.id}/>
                       </div>
                   }else if(ct.children?.length){
                       debugger
                       ct.children.map(ch => {
                           if(ch.id === categoryId) {
                               return <div>
                                   <Todo todo={todo} categoryId={ch.id} key={ct.id}/>
                               </div>
                           }
                       })
                   }
               })
            }
        </div>
    )
}
