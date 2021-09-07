import {v1} from 'uuid';

import {ACTIONS_TYPES_CATEGORY} from '../App.constants';

export type CategoryState = {
    id: string,
    title: string,
    childrenId: string[]
}

export type Category = {
    [key: string]: CategoryState
}

export type CategoryData = {
    rootCategoriesId: string[],
    categories: Category,
}
type AddSubCategory = ReturnType<typeof addSubCategory>
type ChangeCategoryTitle = ReturnType<typeof changeCategoryTitle>
type AddCategory = ReturnType<typeof addCategory>
export type RemoveCategory = ReturnType<typeof removeCategory>
type ActionCategory =
    AddCategory
    | RemoveCategory
    | ChangeCategoryTitle
    | AddSubCategory

export const category1Id = v1();
export const category2Id = v1();
export const category3Id = v1();
export const categoryChild1 = v1();
export const categoryChild2 = v1();

const initialState: CategoryData = {
    rootCategoriesId: [
        category1Id,
        category2Id,
        category3Id,
    ],
    categories: {
        [category1Id]: {
            id: category1Id,
            title: 'Category 1',
            childrenId: [categoryChild1],
        },
        [category2Id]: {
            id: category2Id,
            title: 'Category 2',
            childrenId: [],
        },
        [category3Id]: {
            id: category3Id,
            title: 'Category 3',
            childrenId: [],
        },
        [categoryChild1]: {
            id: categoryChild1,
            title: 'Category child 1',
            childrenId: [categoryChild2],
        },
        [categoryChild2]: {
            id: categoryChild2,
            title: 'Category child 2',
            childrenId: [],
        },
    },
};

// const recursionDelete = (categoriesData: CategoryData, id: string): CategoryData => {
//     categoriesData.rootCategoriesId = [...categoriesData.rootCategoriesId.filter(ci => ci !== id)];
//     let arr = categoriesData.categories[id].childrenId;
//     if (categoriesData.categories[id].childrenId && categoriesData.categories[id].childrenId.length) {
//     }
//     delete categoriesData.categories[id];
//
//     return categoriesData;
// };

export const categoryReducer =
    (state: CategoryData = initialState, action: ActionCategory): CategoryData => {
        switch (action.type) {
            case ACTIONS_TYPES_CATEGORY.ADD_CATEGORY: {
                const {
                    title,
                } = action.payload;
                const copyState = {...state};
                const newCategoryId = v1();
                const newCategory: CategoryState = {
                    id: newCategoryId,
                    title,
                    childrenId: [],
                };
                copyState.rootCategoriesId = [newCategoryId, ...copyState.rootCategoriesId];
                copyState.categories = {[newCategoryId]: newCategory, ...copyState.categories};

                return copyState;
            }
            case ACTIONS_TYPES_CATEGORY.REMOVE_CATEGORY: {
                const {
                    id,
                } = action.payload;
                const copyState = {...state};
                copyState.rootCategoriesId = [...copyState.rootCategoriesId.filter(ci => ci !== id)];

                copyState.rootCategoriesId.map(ci => {
                    copyState.categories[ci].childrenId =
                        copyState.categories[ci].childrenId.filter(ci => ci !== id);
                    return copyState.categories;
                });
                copyState.categories[id].childrenId.forEach(cId => {
                    // eslint-disable-next-line no-debugger
                    debugger;
                    delete copyState.categories[cId];
                });
                delete copyState.categories[id];
                return copyState;
            }
            case ACTIONS_TYPES_CATEGORY.CHANGE_CATEGORY_TITLE: {
                const {
                    title,
                    id,
                } = action.payload;
                const copyState = {...state};
                const oldCategory = copyState.categories[id];
                const newCategory = {...oldCategory};

                newCategory.title = title;
                copyState.categories = {...copyState.categories, [id]: newCategory};

                return copyState;
            }
            case ACTIONS_TYPES_CATEGORY.ADD_SUB_CATEGORY: {
                const {
                    id,
                    title,
                } = action.payload;
                const copyState = {...state};
                const newSubCategoryId = v1();
                const newSubCategory: CategoryState = {
                    id: newSubCategoryId,
                    title,
                    childrenId: [],
                };
                const oldCategory = copyState.categories[id];
                const newCategory = {...oldCategory};

                newCategory.childrenId = [...newCategory.childrenId, newSubCategoryId];
                copyState.categories =
                    {...copyState.categories, [id]: newCategory, [newSubCategoryId]: newSubCategory};

                return copyState;
            }
            default:
                return state;
        }
    };
export const addCategory = (title: string) => ({
    type: ACTIONS_TYPES_CATEGORY.ADD_CATEGORY,
    payload: {
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
