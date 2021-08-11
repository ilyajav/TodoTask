import {v1} from "uuid";

export type CategoryStateType = {
    id: string,
    title: string,
}

export const category1Id = v1()
export const category2Id = v1()
export const category3Id = v1()

const initialState: CategoryStateType[] = [
    {id: category1Id, title: 'Category 1'},
    {id: category2Id, title: 'Category 2'},
    {id: category3Id, title: 'Category 3'},
]

export type AddCategoryType = ReturnType<typeof addCategory>
type ActionCategoryTypes = AddCategoryType

export const categoryReducer = (state: CategoryStateType[] = initialState, action: ActionCategoryTypes): CategoryStateType[] => {
    switch (action.type){
        case "ADD-CATEGORY":{
            const newCategory: CategoryStateType = {
                id: action.payload.id,
                title: action.payload.title,
            }
            return [...state, newCategory]
        }
        default:
            return state
    }
}

export const addCategory = (id: string, title: string) =>{
    return{
        type: 'ADD-CATEGORY',
        payload:{
            id,
            title,
        },
    }
}
