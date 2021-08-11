import {v1} from "uuid";
import {AddCategoryType, category1Id, category2Id, category3Id} from "./category-reducer";

export type TodosType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type TodosDataType = {
    [key: string]: TodosType[]
}

type ActionTodoTypes = AddCategoryType



const initialState: TodosDataType = {
    [category1Id] : [{id: v1(), title: 'Todo 1', isDone: false}],
    [category2Id] : [{id: v1(), title: 'Todo 2', isDone: true}],
    [category3Id] : [{id: v1(), title: 'Todo 3', isDone: false}],
}

export const todoReducer = (state: TodosDataType = initialState, action: ActionTodoTypes): TodosDataType =>{
    switch (action.type) {
        case "ADD-CATEGORY":{
            const copyState = {...state}
            copyState[action.payload.id] = []
            return copyState
        }
        default:
            return state
    }
}
