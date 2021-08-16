import {v1} from "uuid";
import {
    AddCategoryType,
    category1_1Id,
    category1Id,
    category2Id,
    category3Id,
    RemoveCategoryType
} from "./category-reducer";

export type TodosType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type TodosDataType = {
    [key: string]: TodosType[]
}

type ChangeTodoStatus = ReturnType<typeof changeTodoStatus>
type ActionTodoTypes = AddCategoryType | ChangeTodoStatus | RemoveCategoryType


const initialState: TodosDataType = {
    [category1Id] : [{id: v1(), title: 'Todos 1', isDone: false}],
    [category1_1Id] : [{id: v1(), title: 'Todos 1.1', isDone: true}],
    [category2Id] : [{id: v1(), title: 'Todos 2', isDone: true}],
    [category3Id] : [{id: v1(), title: 'Todos 3', isDone: false}],
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
