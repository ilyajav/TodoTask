import {v1} from "uuid";
import {
    AddCategoryType,
    category1_1Id, category1_2Id,
    category1Id,
    category2Id,
    category3Id,
    RemoveCategoryType
} from "./category-reducer";

export type TodosType = {
    id: string,
    title: string,
    isDone: boolean,
    description: string
}

export type TodosDataType = {
    [key: string]: TodosType[]
}

type ChangeTodoStatusType = ReturnType<typeof changeTodoStatus>
type ChangeTodoDescriptionType = ReturnType<typeof changeTodoDescription>
type ChangeTodoTitleType = ReturnType<typeof changeTodoTitle>
type ActionTodoTypes =
    AddCategoryType
    | ChangeTodoStatusType
    | RemoveCategoryType
    | ChangeTodoDescriptionType
    | ChangeTodoTitleType


const initialState: TodosDataType = {
    [category1Id] : [
        {id: v1(), title: 'Todos 1', isDone: false, description: 'todoTest'},
        {id: v1(), title: 'Todos 1-2', isDone: true, description: 'todoTest2'}
    ],
    [category1_1Id] : [{id: v1(), title: 'Todos 1.1', isDone: true, description: 'todo1_1'}],
    [category1_2Id] : [{id: v1(), title: 'Todos 1.2', isDone: true, description: 'todo1_2'}],
    [category2Id] : [
        {id: v1(), title: 'Todos 2', isDone: true, description: 'todo2'},
        {id: v1(), title: 'Todos 2-2', isDone: true, description: 'todoTest2'}

    ],
    [category3Id] : [{id: v1(), title: 'Todos 3', isDone: false, description: 'todo3'}],
}

export const todoReducer = (state: TodosDataType = initialState, action: ActionTodoTypes): TodosDataType =>{
    switch (action.type) {
        case "ADD-CATEGORY":{
            const copyState = {...state}
            copyState[action.payload.id] = []
            return copyState
        }
        case 'CHANGE-TODO-STATUS':{
            const copyState = {...state}
            const categoryId = copyState[action.payload.categoryId]
            const todo = categoryId.find(td => td.id === action.payload.todoId)
            if(todo){
                todo.isDone = action.payload.isDone
            }
            return copyState
        }
        case 'REMOVE-CATEGORY':{
            const copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        }
        case "CHANGE-TODO-DESCRIPTION":{
            const copyState = {...state}
            const category = copyState[action.payload.categoryId]
            const todo = category.find(td => td.id === action.payload.todoId)
            if(todo){
                todo.description = action.payload.newDescription
            }
            return {...copyState}
        }
        case "CHANGE-TODO-TITLE":{
            const copyState = {...state}
            const category = copyState[action.payload.categoryId]
            const todo = category.find(td => td.id === action.payload.todoId)
            if(todo){
                todo.title = action.payload.title
            }
            return {...copyState}
        }
        default:
            return state
    }
}

export const changeTodoStatus = (categoryId: string, todoId: string, isDone: boolean) =>{
    return{
        type: 'CHANGE-TODO-STATUS',
        payload: {
            categoryId,
            todoId,
            isDone,
        },
    } as const
}

export const changeTodoDescription = (categoryId: string, todoId: string, newDescription: string) =>{
    return{
        type: 'CHANGE-TODO-DESCRIPTION',
        payload:{
            categoryId,
            todoId,
            newDescription
        }
    } as const
}

export const changeTodoTitle = (categoryId: string, todoId: string, title: string) =>{
    return{
        type: 'CHANGE-TODO-TITLE',
        payload:{
            categoryId,
            todoId,
            title,
        }
    } as const
}
