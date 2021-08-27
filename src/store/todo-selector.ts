import {createSelector, Selector} from 'reselect';
import {AppRootStateType} from './store';
import {Todos, Todo, TodosData} from './todo-reducer';

const getTodos = (state: AppRootStateType) => state.todoData.todos;
const getTodosId = (state: AppRootStateType) => state.todoData.todosId;

export const todoSelector =
    // eslint-disable-next-line max-len
    (doneStatus: string | null, searchTodo: string | null, state: AppRootStateType): Selector<TodosData, Todos> => createSelector(getTodos, getTodosId, (todos: Todos) => {
        let filteredTodo = todos;
        for (let i = 0; i < getTodosId.length; i += 1) {
            filteredTodo = todos[getTodosId(state)[i]];
        }
        if (filteredTodo) {
            // if (doneStatus === 'true') {
            //     if (filteredTodo.isDone) {
            //         return filteredTodo;
            //     }
            // }
            // if (searchTodo) {
            //     const title = filteredTodo.title.toLowerCase();
            //     const filter = searchTodo.toLowerCase();
            //     return title.includes(filter);
            // }

            return filteredTodo;
        }
        return filteredTodo;
    });
