import {v1} from 'uuid';

export type TodosType = {
    id: string,
    title: string,
    isDone: boolean,
}

enum ACTIONS_TYPES {
    CHANGE_TODO_STATUS = 'CHANGE-TODO-STATUS',
    ADD_TODO = 'ADD-TODO',
}

type ChangeTodoStatusType = ReturnType<typeof changeTodoStatus>
type AddTodoType = ReturnType<typeof addTodo>
type ActionTodoTypes = ChangeTodoStatusType | AddTodoType

const initialState: TodosType[] = [
    {
        id: v1(), title: 'Cat', isDone: false,
    },
    {
        id: v1(), title: 'Dog', isDone: true,
    },
    {
        id: v1(), title: 'Elephant', isDone: false,
    },
    {
        id: v1(), title: 'Mouse', isDone: true,
    },
    {
        id: v1(), title: 'Horse', isDone: true,
    },
];

export const todoReducer = (state: TodosType[] = initialState, action: ActionTodoTypes): TodosType[] => {
    switch (action.type) {
        case ACTIONS_TYPES.CHANGE_TODO_STATUS: {
            return state.map(td => (td.id === action.payload.todoId ? {...td, isDone: action.payload.isDone} : td));
        }
        case ACTIONS_TYPES.ADD_TODO: {
            const newTodo: TodosType = {
                id: v1(),
                title: action.payload.title,
                isDone: false,
            };
            return [newTodo, ...state];
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
