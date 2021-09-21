import {
    addTodo, changeTodo, changeTodoParent,
    changeTodoStatus, todoId1, todoId2, todoId3,
    todoReducer,
    TodosData,
} from './todo-reducer';
import {
    category1Id,
    category2Id, removeCategory,
} from './category-reducer';

let todoData: TodosData;

beforeEach(() => {
    todoData = {
        todosId: [todoId1, todoId2, todoId3],
        todos: {
            [todoId1]: {
                id: todoId1,
                parentID: category1Id,
                title: 'Todo1',
                isDone: false,
                description: 'about cat',
            },
            [todoId2]: {
                id: todoId2,
                parentID: category1Id,
                title: 'Todo2',
                isDone: true,
                description: 'about dog',
            },
            [todoId3]: {
                id: todoId3,
                parentID: category2Id,
                title: 'Todo3',
                isDone: false,
                description: 'about elephant',
            },
        },
    };
});

test('todo status must be changed', () => {
    const action = changeTodoStatus(todoId1, true);
    const endState = todoReducer(todoData, action);

    expect(endState.todos[todoId1].isDone).toBeTruthy();
    expect(endState.todos[todoId1].isDone).not.toBe(todoData.todos[todoId1].isDone);
});

test('new todo must be added', () => {
    const action = addTodo('new Title', category1Id);
    const endState = todoReducer(todoData, action);
    const arrKeys = Object.keys(endState.todos);

    expect(endState.todos[arrKeys[0]].title).toBe('new Title');
    expect(endState.todos[arrKeys[0]].parentID).toBe(category1Id);
    expect(endState.todos[arrKeys[0]].description).toBe('');
    expect(endState.todos[arrKeys[0]].id).not.toBe(todoData.todos[todoId1].id);
});

test('todo data must be changed', () => {
    const action = changeTodo('title1', todoId3, 'new data', true);
    const endState = todoReducer(todoData, action);

    expect(endState.todos[todoId3].title).toBe('title1');
    expect(endState.todos[todoId3].description).toBe('new data');
    expect(endState.todos[todoId3].isDone).toBeTruthy();
    expect(endState.todos[todoId3].id).toBe(todoData.todos[todoId3].id);
    expect(endState.todos[todoId3].parentID).toBe(todoData.todos[todoId3].parentID);
    expect(endState.todos[todoId3].title).not.toBe(todoData.todos[todoId3].title);
    expect(endState.todos[todoId3].description).not.toBe(todoData.todos[todoId3].description);
    expect(endState.todos[todoId3].isDone).not.toBe(todoData.todos[todoId3].isDone);
});

test('todo parentId must be changed', () => {
    const action = changeTodoParent(todoId2, category2Id);
    const endState = todoReducer(todoData, action);

    expect(endState.todos[todoId2].parentID).not.toBe(todoData.todos[todoId2].parentID);
    expect(endState.todos[todoId2].parentID).toBe(category2Id);
});

test('todo must be deleted', () => {
    const action = removeCategory(category1Id);
    const endState = todoReducer(todoData, action);

    expect(endState.todosId.length).not.toBe(todoData.todosId.length);
    expect(endState.todosId.length).toBe(1);
    expect(endState.todos[todoId1]).toBeUndefined();
    expect(endState.todos[todoId2]).toBeUndefined();
});
