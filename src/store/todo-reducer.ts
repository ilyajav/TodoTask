import {v1} from 'uuid';

export type TodosType = {
    id: string,
    title: string,
    isDone: boolean,
}

// eslint-disable-next-line no-use-before-define
type ChangeTodoStatusType = ReturnType<typeof changeTodoStatus>
// eslint-disable-next-line no-use-before-define
type AddTodoType = ReturnType<typeof addTodo>
// eslint-disable-next-line no-use-before-define
type TodoDoneType = ReturnType<typeof todoDone>
// eslint-disable-next-line no-use-before-define
type ActionTodoTypes = ChangeTodoStatusType | AddTodoType | TodoDoneType

const initialState: TodosType[] = [
    {
        id: v1(), title: 'Todo1', isDone: false,
    },
    {
        id: v1(), title: 'Todo 2', isDone: true,
    },
    {
        id: v1(), title: 'Todo 3', isDone: false,
    },
    {
        id: v1(), title: 'Todo 4', isDone: true,
    },
    {
        id: v1(), title: 'Todo 5', isDone: true,
    },
];

export const todoReducer = (state: TodosType[] = initialState, action: ActionTodoTypes): TodosType[] => {
    switch (action.type) {
        case 'CHANGE-TODO-STATUS': {
            return state.map(td => (td.id === action.payload.todoId ? {...td, isDone: action.payload.isDone} : td));
        }
        case 'ADD-TODO': {
            const newTodo: TodosType = {
                id: v1(),
                title: action.payload.title,
                isDone: false,
            };
            return [newTodo, ...state];
        }
        case 'TODO-DONE': {
            const copyState = [...state];
            return state.filter(td => (action.payload.isDone
                ? [...copyState]
                : td.isDone));
        }
        default:
            return state;
    }
};

export const changeTodoStatus = (todoId: string, isDone: boolean) => ({
    type: 'CHANGE-TODO-STATUS',
    payload: {
        todoId,
        isDone,
    },
} as const);

export const addTodo = (title: string) => ({
    type: 'ADD-TODO',
    payload: {
        title,
    },
} as const);

export const todoDone = (isDone: boolean) => ({
    type: 'TODO-DONE',
    payload: {
        isDone,
    },
} as const);
