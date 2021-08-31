export enum ROUTING_PATHS {
    TODO_LIST_PAGE_ROUTE = '/todos',
    TODO_LIST_PAGE_EDIT_ROUTE = '/todosEdit',
}

export enum ROUTING_PARAMS {
    TODO_SEARCH = '?searchText=',
    TODO_SHOW_DONE = '?showDone=',
    TODO_ID = '?todoId='
}

export enum ROUTING_DATA {
    SHOW_DONE = 'showDone',
    SEARCH_TEXT = 'searchText',
    TODO_TEXT_ID = 'todoId',
}

export enum ACTIONS_TYPES {
    CHANGE_TODO_STATUS = 'CHANGE-TODO-STATUS',
    ADD_TODO = 'ADD-TODO',
    CHANGE_TODO = 'CHANGE-TODO',
}

export enum ERROR_COLORS {
    ON_ERROR = 'secondary',
    OFF_ERROR = 'primary',
}
