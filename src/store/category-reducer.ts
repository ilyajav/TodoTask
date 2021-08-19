import {v1} from 'uuid';

export type CategoryStateType = {
    id: string,
    title: string,
    children?: CategoryStateType[] | []
}

export const category1Id = v1();
// eslint-disable-next-line camelcase
export const category1_1Id = v1();
// eslint-disable-next-line camelcase
export const category1_2Id = v1();
export const category2Id = v1();
export const category3Id = v1();

const initialState: CategoryStateType[] = [
    {
        id: category1Id,
        title: 'Category 1',
        children: [
            {
                id: category1_1Id,
                title: 'Category 1.1',
                children: [
                    {id: category1_2Id, title: 'Category 1.2'},
                ],
            },
        ],
    },
    {
        id: category2Id,
        title: 'Category 2',
        children: [
            {id: v1(), title: 'Category 2.1'},
        ],
    },
    {id: category3Id, title: 'Category 3'},
];

// eslint-disable-next-line no-use-before-define
type ChangeCategoryTitleType = ReturnType<typeof changeCategoryTitle>
// eslint-disable-next-line no-use-before-define
export type AddCategoryType = ReturnType<typeof addCategory>
// eslint-disable-next-line no-use-before-define
export type RemoveCategoryType = ReturnType<typeof removeCategory>
type ActionCategoryTypes = AddCategoryType | RemoveCategoryType | ChangeCategoryTitleType

const recursiveDelete = (category: CategoryStateType[], id: string): CategoryStateType[] => category.filter(ct => {
    let arr = ct.children;
    if (ct.children) {
        arr = recursiveDelete(ct.children, id);
    }
    // eslint-disable-next-line no-param-reassign
    ct.children = arr;
    return ct.id !== id;
});

// eslint-disable-next-line max-len
const recursiveChangeTitle = (category: CategoryStateType[], id: string, newTitle: string): CategoryStateType[] => category
    .map(ct => {
        let arr = ct.children;
        if (ct.children) {
            arr = recursiveChangeTitle(ct.children, id, newTitle);
        }
        // eslint-disable-next-line no-param-reassign
        ct.children = arr;
        if (ct.id === id) {
            // eslint-disable-next-line no-param-reassign
            ct.title = newTitle;
        }
        return ct;
    });

// eslint-disable-next-line max-len
export const categoryReducer = (state: CategoryStateType[] = initialState, action: ActionCategoryTypes): CategoryStateType[] => {
    switch (action.type) {
        case 'ADD-CATEGORY': {
            const newCategory: CategoryStateType = {
                id: action.payload.id,
                title: action.payload.title,
            };
            return [...state, newCategory];
        }
        case 'REMOVE-CATEGORY':
            return recursiveDelete(state, action.payload.id);
        case 'CHANGE-CATEGORY-TITLE': {
            return recursiveChangeTitle(state, action.payload.id, action.payload.title);
        }
        default:
            return state;
    }
};

export const addCategory = (id: string, title: string) => ({
    type: 'ADD-CATEGORY',
    payload: {
        id,
        title,
    },
} as const);

export const removeCategory = (id: string) => ({
    type: 'REMOVE-CATEGORY',
    payload: {
        id,
    },
} as const);

export const changeCategoryTitle = (id: string, title: string) => ({
    type: 'CHANGE-CATEGORY-TITLE',
    payload: {
        id,
        title,
    },
} as const);
