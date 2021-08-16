import {v1} from "uuid";

export type CategoryStateType = {
    id: string,
    title: string,
    children?: CategoryStateType[] | []
}

export const category1Id = v1()
export const category1_1Id = v1()
export const category1_2Id = v1()
export const category2Id = v1()
export const category3Id = v1()

const initialState: CategoryStateType[] = [
    {id: category1Id, title: 'Category 1', children: [
            {id: category1_1Id, title: 'Category 1.1', children: [
                    {id: category1_2Id, title: 'Category 1.2'}
                ]},
        ]},
    {id: category2Id, title: 'Category 2', children: [
            {id: v1(), title: 'Category 2.1'}
        ]},
    {id: category3Id, title: 'Category 3'},
]

type ChangeCategoryTitleType = ReturnType<typeof changeCategoryTitle>
export type AddCategoryType = ReturnType<typeof addCategory>
export type RemoveCategoryType = ReturnType<typeof removeCategory>
type ActionCategoryTypes = AddCategoryType | RemoveCategoryType | ChangeCategoryTitleType

export const categoryReducer = (state: CategoryStateType[] = initialState, action: ActionCategoryTypes): CategoryStateType[] => {
    switch (action.type){
        case "ADD-CATEGORY":{
            const newCategory: CategoryStateType = {
                id: action.payload.id,
                title: action.payload.title,
            }
            return [...state, newCategory]
        }
        case "REMOVE-CATEGORY":
            return state.filter(ch => ch.id !== action.payload.id)
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
    } as const
}

export const removeCategory = (id: string) =>{
    return{
        type: 'REMOVE-CATEGORY',
        payload: {
            id,
        }
    } as const
}

export const changeCategoryTitle = (id: string, title:string) =>{
    debugger
    return{
        type: 'CHANGE-CATEGORY-TITLE',
        payload:{
            id,
            title,
        }
    }
}
