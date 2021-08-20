import {v1} from 'uuid';
import {
    addTodo, todoReducer, TodosType, changeTodoStatus,
} from './todo-reducer';

let state: TodosType[];
const todoId1 = v1();
const todoId2 = v1();

beforeEach(() => {
    state = [
        {
            id: todoId1, title: 'Todo1', isDone: false,
        },
        {
            id: todoId2, title: 'Todo 2', isDone: true,
        },
    ];
});

test('new todo should be added', () => {
    const action = addTodo('new Todo');
    const endState = todoReducer(state, action);

    expect(endState.length).toBe(3);
});

test('todo status should be changed', () => {
    const action = changeTodoStatus(todoId1, true);
    const endState = todoReducer(state, action);

    expect(endState[0].isDone).toBeTruthy();
});
