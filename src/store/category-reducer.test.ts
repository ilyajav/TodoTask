import {
    addCategory, addSubCategory,
    category1Id,
    category2Id,
    category3Id,
    categoryChild1,
    categoryChild2,
    CategoryData,
    categoryReducer,
    changeCategoryTitle, removeCategory,
} from './category-reducer';

let categoryData: CategoryData;

beforeEach(() => {
    categoryData = {
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
});

test('category title must be changed', () => {
    const action = changeCategoryTitle(categoryChild2, 'new title');
    const endState = categoryReducer(categoryData, action);

    expect(endState.categories[categoryChild2].title).not.toBe(categoryData.categories[categoryChild2].title);
    expect(endState.categories[categoryChild2].title).toBe('new title');
});

test('new category must be added', () => {
    const action = addCategory('new Category');
    const endState = categoryReducer(categoryData, action);
    const arrCategories = Object.keys(endState.categories);

    expect(endState.categories[arrCategories[0]].id).not.toBe(categoryData.categories[category1Id].id);
    expect(endState.categories[arrCategories[0]].title).toBe('new Category');
    expect(endState.categories[arrCategories[0]].childrenId.length).toBeFalsy();
    expect(endState.rootCategoriesId.length).toBe(4);
});

test('category must be deleted', () => {
    const action = removeCategory(categoryChild1);
    const endState = categoryReducer(categoryData, action);

    expect(endState.categories[category1Id].childrenId.length).toBeFalsy();
    expect(endState.categories[categoryChild2]).toBeUndefined();
    expect(endState.categories[categoryChild1]).toBeUndefined();
});

test('sub category must be added', () => {
    const action = addSubCategory(category3Id, 'new sub category');
    const endState = categoryReducer(categoryData, action);
    const arrIds = Object.keys(endState.categories);

    expect(endState.categories[arrIds[arrIds.length - 1]].title).toBe('new sub category');
    expect(endState.categories[category3Id].childrenId.length)
        .not.toBe(categoryData.categories[category3Id].childrenId.length);
    expect(endState.categories[category3Id].childrenId.length).toBe(1);
});
