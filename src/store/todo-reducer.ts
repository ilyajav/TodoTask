import {v1} from 'uuid';

import {ACTIONS_TYPES} from '../App.constants';

export type TodosType = {
    id: string,
    title: string,
    isDone: boolean,
    description: string,
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

const initialState: TodosType[] = [
    {
        id: v1(), title: 'Cat', isDone: false, description: 'about cat',
    },
    {
        id: v1(), title: 'Dog', isDone: true, description: 'about dog',
    },
    {
        id: v1(), title: 'Elephant', isDone: false, description: 'about elephant',
    },
    {
        id: v1(), title: 'Mouse', isDone: true, description: 'about mouse',
    },
    {
        id: v1(), title: 'Horse', isDone: true, description: 'about horse',
    },
];

export const todoReducer = (state: TodosType[] = initialState, action: ActionTodoTypes): TodosType[] => {
    switch (action.type) {
        case ACTIONS_TYPES.CHANGE_TODO_STATUS: {
            return state.map(td => (td.id === action.payload.todoId
                ? {...td, isDone: action.payload.isDone}
                : td));
        }
        case ACTIONS_TYPES.ADD_TODO: {
            const newTodo: TodosType = {
                id: v1(),
                title: action.payload.title,
                isDone: false,
                description: '',
            };
            return [newTodo, ...state];
        }
        case ACTIONS_TYPES.CHANGE_TODO_DESCRIPTION: {
            return state.map(td => (td.id === action.payload.id
                ? {
                    ...td,
                    description: action.payload.description,
                }
                : td));
        }
        case ACTIONS_TYPES.CHANGE_TODO_TITLE: {
            return state.map(td => (td.id === action.payload.id
                ? {
                    ...td,
                    title: action.payload.title,
                }
                : td));
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

export const changeTodoTitle = (title: string, id: string) => ({
    type: ACTIONS_TYPES.CHANGE_TODO_TITLE,
    payload: {
        title,
        id,
    },
} as const);

export const changeTodoDescription = (description: string, id: string) => ({
    type: ACTIONS_TYPES.CHANGE_TODO_DESCRIPTION,
    payload: {
        description,
        id,
    },
} as const);
