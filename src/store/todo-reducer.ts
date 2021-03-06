import {v1} from 'uuid';

import {
    ACTIONS_TYPES_CATEGORY,
    ACTIONS_TYPES_TODO,
} from '../App.constants';
import {
    category1Id,
    category2Id,
    category3Id,
    categoryChild1,
    RemoveCategory,
} from './category-reducer';

export type Todos = {
    id: string,
    parentID: string,
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

type ChangeTodoParent = ReturnType<typeof changeTodoParent>
type ChangeTodo = ReturnType<typeof changeTodo>
type ChangeTodoStatus = ReturnType<typeof changeTodoStatus>
type AddTodo = ReturnType<typeof addTodo>

type ActionTodo =
    ChangeTodoStatus
    | AddTodo
    | ChangeTodo
    | RemoveCategory
    | ChangeTodoParent

export const todoId1 = v1();
export const todoId2 = v1();
export const todoId3 = v1();
const todoId4 = v1();
const todoId5 = v1();

const initialState: TodosData = {
    todosId: [todoId1, todoId2, todoId3, todoId4, todoId5],
    todos: {
        [todoId1]: {
            id: todoId1,
            parentID: category1Id,
            title: 'Cat',
            isDone: false,
            description: 'about cat',
        },
        [todoId2]: {
            id: todoId2,
            parentID: category1Id,
            title: 'Dog',
            isDone: true,
            description: 'about dog',
        },
        [todoId3]: {
            id: todoId3,
            parentID: category2Id,
            title: 'Elephant',
            isDone: false,
            description: 'about elephant',
        },
        [todoId4]: {
            id: todoId4,
            parentID: category3Id,
            title: 'Mouse',
            isDone: true,
            description: 'about mouse',
        },
        [todoId5]: {
            id: todoId5,
            parentID: categoryChild1,
            title: 'Horse',
            isDone: true,
            description: 'about horse',
        },
    },
};

export const todoReducer = (state: TodosData = initialState, action: ActionTodo): TodosData => {
    switch (action.type) {
        case ACTIONS_TYPES_TODO.CHANGE_TODO_STATUS: {
            const {todoId, isDone} = action.payload;
            const copyState = {...state};
            const oldTodo = copyState.todos[todoId];
            const newTodo = {...oldTodo};

            newTodo.isDone = isDone;
            copyState.todos = {...copyState.todos, [todoId]: newTodo};

            return copyState;
        }
        case ACTIONS_TYPES_TODO.CHANGE_TODO: {
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
        case ACTIONS_TYPES_TODO.ADD_TODO: {
            const {
                title,
                categoryId,
            } = action.payload;
            const copyState = {...state};
            const newId = v1();
            const newTodo: Todos = {
                id: newId,
                parentID: categoryId,
                title,
                isDone: false,
                description: '',
            };
            copyState.todosId = [newId, ...copyState.todosId];
            copyState.todos = {[newId]: newTodo, ...copyState.todos};

            return copyState;
        }
        case ACTIONS_TYPES_TODO.CHANGE_TODO_PARENT: {
            const {
                todoId,
                categoryId,
            } = action.payload;
            const copyState = {...state};
            if (todoId) {
                const oldTodo = copyState.todos[todoId];

                const newTodo = {...oldTodo};
                newTodo.parentID = categoryId;
                copyState.todos = {...copyState.todos, [todoId]: newTodo};
            }

            return copyState;
        }
        case ACTIONS_TYPES_CATEGORY.REMOVE_CATEGORY: {
            const {
                id,
            } = action.payload;
            const copyState = {...state};
            copyState.todosId.map(ti => {
                if (copyState.todos[ti].parentID === id) {
                    delete copyState.todos[ti];
                    copyState.todosId = copyState.todosId.filter(id => id !== ti);
                    return copyState.todosId;
                }
                return copyState.todos;
            });

            return copyState;
        }
        default:
            return state;
    }
};

export const changeTodoStatus = (todoId: string, isDone: boolean) => ({
    type: ACTIONS_TYPES_TODO.CHANGE_TODO_STATUS,
    payload: {
        todoId,
        isDone,
    },
} as const);

export const addTodo = (title: string, categoryId: string) => ({
    type: ACTIONS_TYPES_TODO.ADD_TODO,
    payload: {
        title,
        categoryId,
    },
} as const);

export const changeTodo = (title: string, todoId: string, description: string, isDone: boolean) => ({
    type: ACTIONS_TYPES_TODO.CHANGE_TODO,
    payload: {
        title,
        todoId,
        description,
        isDone,
    },
} as const);

export const changeTodoParent = (todoId: string | null, categoryId: string) => ({
    type: ACTIONS_TYPES_TODO.CHANGE_TODO_PARENT,
    payload: {
        todoId,
        categoryId,
    },
} as const);
