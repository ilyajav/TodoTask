import {createSelector} from 'reselect';
import {AppRootState} from './store';
import {Todo} from './todo-reducer';

const getTodos = (state: AppRootState) => state.todoData.todos;
const getTodosId = (state: AppRootState) => state.todoData.todosId;

export const todoSelector =
    createSelector([getTodos, getTodosId], (todos: Todo, todosId: string[]) => todosId.map(ti => todos[ti]));
