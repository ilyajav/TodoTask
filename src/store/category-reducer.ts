import {v1} from 'uuid';

import {ACTIONS_TYPES_CATEGORY} from '../App.constants';

export type CategoryState = {
    id: string,
    title: string,
    children: CategoryState[] | []
}

export const category1Id = v1();
export const category2Id = v1();
export const category3Id = v1();
export const categoryChildren1 = v1();

const recursiveDelete = (category: CategoryState[], id: string): CategoryState[] => category.filter(ct => {
    let arr = ct.children;
    if (ct.children) {
        arr = recursiveDelete(ct.children, id);
    }
    ct.children = arr;
    return ct.id !== id;
});

const recursiveChangeTitle = (category: CategoryState[], id: string, newTitle: string): CategoryState[] => category
    .map(ct => {
        let arr = ct.children;
        if (ct.children) {
            arr = recursiveChangeTitle(ct.children, id, newTitle);
        }
        ct.children = arr;
        if (ct.id === id) {
            ct.title = newTitle;
        }
        return ct;
    });

const recursiveAddCategory = (category: CategoryState[], id: string, title: string): CategoryState[] => category
    .map(ct => {
        let arr = ct.children;
        if (ct.children) {
            arr = recursiveAddCategory(ct.children, id, title);
        }
        ct.children = arr;
        if (ct.id === id) {
            const newCategory: CategoryState = {
                id: v1(),
                title,
                children: [],
            };
            ct.children = [newCategory, ...ct.children];
        }
        return ct;
    });

const initialState: CategoryState[] = [
    {
        id: category1Id,
        title: 'Category 1',
        children: [
            {
                id: categoryChildren1,
                title: 'Category 1.2',
                children: [
                    {
                        id: v1(),
                        title: 'Category 1.3',
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        id: category2Id,
        title: 'Category 2',
        children: [],
    },
    {
        id: category3Id,
        title: 'Category 3',
        children: [],
    },
];

type AddSubCategory = ReturnType<typeof addSubCategory>
type ChangeCategoryTitle = ReturnType<typeof changeCategoryTitle>
type AddCategory = ReturnType<typeof addCategory>
export type RemoveCategory = ReturnType<typeof removeCategory>
type ActionCategory =
    AddCategory
    | RemoveCategory
    | ChangeCategoryTitle
    | AddSubCategory
export const categoryReducer =
    (state: CategoryState[] = initialState, action: ActionCategory): CategoryState[] => {
        switch (action.type) {
            case ACTIONS_TYPES_CATEGORY.ADD_CATEGORY: {
                const newCategory: CategoryState = {
                    id: action.payload.id,
                    title: action.payload.title,
                    children: [],
                };
                return [newCategory, ...state];
            }
            case ACTIONS_TYPES_CATEGORY.REMOVE_CATEGORY: {
                return recursiveDelete(state, action.payload.id);
            }
            case ACTIONS_TYPES_CATEGORY.CHANGE_CATEGORY_TITLE: {
                return recursiveChangeTitle(state, action.payload.id, action.payload.title);
            }
            case ACTIONS_TYPES_CATEGORY.ADD_SUB_CATEGORY: {
                return recursiveAddCategory(state, action.payload.id, action.payload.title);
            }
            default:
                return state;
        }
    };
export const addCategory = (id: string, title: string) => ({
    type: ACTIONS_TYPES_CATEGORY.ADD_CATEGORY,
    payload: {
        id,
        title,
    },
} as const);
export const removeCategory = (id: string) => ({
    type: ACTIONS_TYPES_CATEGORY.REMOVE_CATEGORY,
    payload: {
        id,
    },
} as const);

export const changeCategoryTitle = (id: string, title: string) => ({
    type: ACTIONS_TYPES_CATEGORY.CHANGE_CATEGORY_TITLE,
    payload: {
        id,
        title,
    },
} as const);

export const addSubCategory = (id: string, title: string) => ({
    type: ACTIONS_TYPES_CATEGORY.ADD_SUB_CATEGORY,
    payload: {
        id,
        title,
    },
} as const);
