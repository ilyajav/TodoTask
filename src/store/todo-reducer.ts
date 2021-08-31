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

type ChangeTodo = ReturnType<typeof changeTodo>
type ChangeTodoStatus = ReturnType<typeof changeTodoStatus>
type AddTodo = ReturnType<typeof addTodo>

type ActionTodo =
    ChangeTodoStatus
    | AddTodo
    | ChangeTodo

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

export const todoReducer = (state: TodosData = initialState, action: ActionTodo): TodosData => {
    switch (action.type) {
        case ACTIONS_TYPES.CHANGE_TODO_STATUS: {
            const {todoId, isDone} = action.payload;
            const copyState = {...state};
            const oldTodo = copyState.todos[todoId];
            const newTodo = {...oldTodo};

            newTodo.isDone = isDone;
            copyState.todos = {...copyState.todos, [todoId]: newTodo};

            return copyState;
        }
        case ACTIONS_TYPES.CHANGE_TODO: {
            const {
                todoId,
                isDone,
                title,
                description,
            } = action.payload;
            const copyState = {...state};
            const oldTodo = copyState.todos[todoId];
            const newTodo = {...oldTodo};

            newTodo.isDone = isDone;
            newTodo.title = title;
            newTodo.description = description;
            copyState.todos = {...copyState.todos, [todoId]: newTodo};

            return copyState;
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
            copyState.todos = {[newId]: newTodo, ...copyState.todos};

            return copyState;
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

export const changeTodo = (title: string, todoId: string, description: string, isDone: boolean) => ({
    type: ACTIONS_TYPES.CHANGE_TODO,
    payload: {
        title,
        todoId,
        description,
        isDone,
    },
} as const);
