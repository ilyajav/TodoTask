export enum ROUTING_PATHS {
    TODO_LIST_PAGE_ROUTE = '/todos',
    TODO_LIST_PAGE_EDIT_ROUTE = '/todosEdit',
}

export enum ROUTING_PARAMS {
    TODO_SEARCH = 'searchText=',
    TODO_SHOW_DONE = 'showDone=',
    TODO_ID = '?todoId=',
    CATEGORY_ID = 'categoryId=',
}

export enum ROUTING_DATA {
    SHOW_DONE = 'showDone',
    SEARCH_TEXT = 'searchText',
    TODO_TEXT_ID = 'todoId',
    CATEGORY_TEXT_ID = 'categoryId',
}

export enum ACTIONS_TYPES_TODO {
    CHANGE_TODO_STATUS = 'CHANGE-TODO-STATUS',
    ADD_TODO = 'ADD-TODO',
    CHANGE_TODO = 'CHANGE-TODO',
    CHANGE_TODO_PARENT = 'CHANGE-TODO-PARENT',
}

export enum ACTIONS_TYPES_CATEGORY {
    ADD_CATEGORY = 'ADD-CATEGORY',
    ADD_SUB_CATEGORY = 'ADD-SUB-CATEGORY',
    REMOVE_CATEGORY = 'REMOVE-CATEGORY',
    CHANGE_CATEGORY_TITLE = 'CHANGE-CATEGORY-TITLE',
}

export enum ERROR_COLORS {
    ON_ERROR = 'secondary',
    OFF_ERROR = 'primary',
}

export enum MODE {
    SHOW = 'SHOW',
    EDIT = 'EDIT',
}
