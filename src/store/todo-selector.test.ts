import {todoSelector} from './todo-selector';
import {category1Id, category2Id} from './category-reducer';

const todoId1 = '1';
const todoId2 = '2';
const todoId3 = '3';

const testData = {
    todosIds: ['1', '2', '3'],
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
    },
};

test('todo-selector must be worked', () => {
    const result = todoSelector.resultFunc(testData.todos, testData.todosIds);

    expect(result.length).toBe(3);
    expect(result[0].title).toBe('Cat');
    expect(result[1].title).toBe('Dog');
    expect(result[2].title).toBe('Elephant');
    expect(result[0].id).toBe('1');
});
