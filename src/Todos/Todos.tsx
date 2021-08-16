import React, {FC} from 'react'
import {CategoryStateType} from "../store/category-reducer";
import { TodosDataType } from '../store/todo-reducer';
import {Todo} from "./Todo/Todo";


type TodoTypePropsType = {
    categories: CategoryStateType[]
    todos: TodosDataType
    categoryId: string
    description: boolean
    setDescription: (value: boolean) => void;
}

export const Todos: FC<TodoTypePropsType> = (
    {categories,todos, categoryId, description,setDescription}) =>{
    console.log(todos)

    return(
        <div>
            {
               categories.map(ct => {
                   if(ct.id === categoryId) {
                       debugger
                       let todo = todos[ct.id]
                       debugger
                       return <div>
                           <Todo
                               todo={todo}
                               categoryId={ct.id}
                               key={ct.id}
                               description={description}
                               setDescription={setDescription}
                               textDescription={todo.map(td => {
                                   return td.description
                               })}
                           />
                       </div>
                   }else if(ct.children?.length){
                      return ct.children.map(ch => {
                           let todo = todos[ch.id]
                           if(ch.id === categoryId) {
                               return <div>
                                   <Todo
                                       todo={todo}
                                       categoryId={ch.id}
                                       key={ct.id}
                                       description={description}
                                       setDescription={setDescription}
                                       textDescription={todo.map(td => {
                                           return td.description
                                       })}
                                   />
                               </div>
                           }
                       })
                   }
               })
            }
        </div>
    )
}
