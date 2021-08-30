import {v1} from 'uuid';

import {ACTIONS_TYPES} from '../App.constants';

export type Todos = {
    id: string,
    title: string,
    isDone: boolean,
    description: string,
}

export type Todo = {
    [key: string]: Todos
}

export type TodosData = {
    todosId: string[]
    todos: Todo
}

type ChangeTodoDescription = ReturnType<typeof changeTodoDescription>
type ChangeTodoTitleType = ReturnType<typeof changeTodoTitle>
type ChangeTodoStatusType = ReturnType<typeof changeTodoStatus>
type AddTodoType = ReturnType<typeof addTodo>

type ActionTodoTypes =
    ChangeTodoStatusType
    | AddTodoType
    | ChangeTodoTitleType
    | ChangeTodoDescription

const todoId1 = v1();
const todoId2 = v1();
const todoId3 = v1();
const todoId4 = v1();
const todoId5 = v1();

const initialState: TodosData = {
    todosId: [todoId1, todoId2, todoId3, todoId4, todoId5],
    todos: {
        [todoId1]: {
            id: todoId1,
            title: 'Cat',
            isDone: false,
            description: 'about cat',
        },
        [todoId2]: {
            id: todoId2,
            title: 'Dog',
            isDone: true,
            description: 'about dog',
        },
        [todoId3]: {
            id: todoId3,
            title: 'Elephant',
            isDone: false,
            description: 'about elephant',
        },
        [todoId4]: {
            id: todoId4,
            title: 'Mouse',
            isDone: true,
            description: 'about mouse',
        },
        [todoId5]: {
            id: todoId5,
            title: 'Horse',
            isDone: true,
            description: 'about horse',
        },
    },
};

export const todoReducer = (state: TodosData = initialState, action: ActionTodoTypes): TodosData => {
    switch (action.type) {
        case ACTIONS_TYPES.CHANGE_TODO_STATUS: {
            const copyState = {...state};
            const todo = copyState.todos[action.payload.todoId];
            todo.isDone = action.payload.isDone;
            copyState.todos = {...copyState.todos};
            return {...copyState};
        }
        case ACTIONS_TYPES.CHANGE_TODO_DESCRIPTION: {
            const copyState = {...state};
            const todo = copyState.todos[action.payload.todoId];
            todo.description = action.payload.description;
            return {...copyState};
        }
        case ACTIONS_TYPES.CHANGE_TODO_TITLE: {
            const copyState = {...state};
            const todo = copyState.todos[action.payload.todoId];
            todo.title = action.payload.title;
            return {...copyState};
        }
        case ACTIONS_TYPES.ADD_TODO: {
            const copyState = {...state};
            const newId = v1();
            const newTodo: Todos = {
                id: newId,
                title: action.payload.title,
                isDone: false,
                description: '',
            };
            copyState.todosId = [newId, ...copyState.todosId];
            copyState.todos = {[newId]: {...newTodo}, ...copyState.todos};
            return {...copyState};
        }
        default:
            return state;
    }
};

export const changeTodoStatus = (todoId: string, isDone: boolean) => ({
    type: ACTIONS_TYPES.CHANGE_TODO_STATUS,
    payload: {
        todoId,
        isDone,
    },
} as const);

export const addTodo = (title: string) => ({
    type: ACTIONS_TYPES.ADD_TODO,
    payload: {
        title,
    },
} as const);

export const changeTodoTitle = (title: string, todoId: string) => ({
    type: ACTIONS_TYPES.CHANGE_TODO_TITLE,
    payload: {
        title,
        todoId,
    },
} as const);

export const changeTodoDescription = (description: string, todoId: string) => ({
    type: ACTIONS_TYPES.CHANGE_TODO_DESCRIPTION,
    payload: {
        description,
        todoId,
    },
} as const);
