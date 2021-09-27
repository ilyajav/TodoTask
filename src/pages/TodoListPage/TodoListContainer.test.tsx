import React, {ChangeEvent} from 'react';
import {
    getByTestId,
    render,
} from '@testing-library/react';
import {
    Provider,
    useDispatch,
} from 'react-redux';
import * as redux from 'react-redux';
import {
    BrowserRouter,
    MemoryRouter,
} from 'react-router-dom';
import routeData from 'react-router';

import userEvent from '@testing-library/user-event';
import {createStoreWithState} from '../../store/store';
import {TodoListContainer} from './TodoListContainer';
import {
    addTodo, changeTodoStatus, todoSelector,
} from '../../store';
import {
    category1Id,
} from '../../store/category-reducer';
import
{
    AddItemForm,
    TodoList,
} from './components';
import {commonStyle} from '../CommonComponents';

const todoId1 = '1';
const todoId2 = '2';
const todoId3 = '3';

const categoryId = '54ad0010-1f63-11ec-8630-39b1cc0e6986';

const testData = {
    todosId: [todoId1, todoId2, todoId3],
    todos: {
        [todoId1]: {
            id: todoId1,
            parentID: categoryId,
            title: 'Cat',
            isDone: false,
            description: 'about cat',
        },
        [todoId2]: {
            id: todoId2,
            parentID: categoryId,
            title: 'Dog',
            isDone: true,
            description: 'about dog',
        },
        [todoId3]: {
            id: todoId3,
            parentID: categoryId,
            title: 'Elephant',
            isDone: false,
            description: 'about elephant',
        },
    },
};

const getMockLocationData = (categoryId: string, showDone = false) => ({
    pathname: '/todos',
    hash: '',
    search: `?categoryId=${categoryId}&showDone=${showDone}&searchText=`,
    state: '',
});

const location = jest.spyOn(routeData, 'useLocation');

const expectCheckboxes = (checkboxes: NodeList, values: string[] = []) => {
    expect(checkboxes.length).toEqual(values.length);
    checkboxes.forEach((checkbox: Node, index: number) => {
        if (checkbox.parentNode) {
            expect(checkbox.parentNode.parentNode.parentNode.textContent.trim()).toEqual(values[index]);
        }
    });
};

describe('TodoListContainer component', () => {
    test('check showDone with value "true" in URL', () => {
        location.mockReturnValue(getMockLocationData(categoryId, true));
        const {container} = render(
            <MemoryRouter>
                <Provider store={createStoreWithState({todoData: testData})}>
                    <TodoListContainer />
                </Provider>
            </MemoryRouter>
        );
        const checkedCheckboxes = container.querySelectorAll('main input[type="checkbox"]:checked');
        const uncheckedCheckboxes = container.querySelectorAll('main input[type="checkbox"]:not(:checked)');
        expectCheckboxes(checkedCheckboxes, ['Dog']);
        expectCheckboxes(uncheckedCheckboxes, []);
    });
    test('check showDone with value "false" in URL', () => {
        location.mockReturnValue(getMockLocationData(categoryId, false));
        const {container} = render(
            <MemoryRouter>
                <Provider store={createStoreWithState({todoData: testData})}>
                    <TodoListContainer />
                </Provider>
            </MemoryRouter>
        );
        const checkedCheckboxes = container.querySelectorAll('main input[type="checkbox"]:checked');
        const uncheckedCheckboxes = container.querySelectorAll('main input[type="checkbox"]:not(:checked)');
        expectCheckboxes(checkedCheckboxes, ['Dog']);
        expectCheckboxes(uncheckedCheckboxes, ['Cat', 'Elephant']);
    });

    describe('change status dispatch should be work', () => {});
    test('should mock dispatch', () => {
        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFN = jest.fn();
        useDispatchSpy.mockReturnValue(mockDispatchFN);

        const dispatch = useDispatch();

        const onChangeTodoStatus = (e: ChangeEvent<HTMLInputElement>, id: string) => {
            const isDone = e.currentTarget.checked;
            dispatch(changeTodoStatus(id, isDone));
        };

        const todos = [{
            id: todoId1,
            parentID: category1Id,
            title: 'Cat',
            isDone: false,
            description: 'about cat',
        },
        ];

        const {getByTestId} = render(
            <BrowserRouter>
                <TodoList
                    onChangeTodoStatus={onChangeTodoStatus}
                    todo={todos}
                    styleData={commonStyle}
                    doneStatus={null}
                    searchTodo={null}
                />
            </BrowserRouter>
        );

        const buttonStatus = getByTestId('change-todo-status').querySelector('input[type="checkbox"]');

        if (buttonStatus) {
            userEvent.click(buttonStatus);
        }

        expect(mockDispatchFN).toHaveBeenCalledWith(changeTodoStatus(todoId1, true));
        expect(mockDispatchFN).toHaveBeenCalledTimes(1);

        useDispatchSpy.mockClear();
    });

    test('add item dispatch should be work', () => {
        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFN = jest.fn();
        useDispatchSpy.mockReturnValue(mockDispatchFN);

        const dispatch = useDispatch();

        const onAddTodo = (title: string, categoryId: string) => {
            dispatch(addTodo(title, categoryId));
        };

        const styles = {
            addItemCategory: {
                padding: '90px 20px 20px 150px',
            },
        };

        const {getByTestId} = render(<AddItemForm
            formText="add new todo"
            addItem={onAddTodo}
            categoryId={category1Id}
            addStyle={styles.addItemCategory}
        />);

        const title = getByTestId('change-title') as HTMLInputElement;
        userEvent.type(title, 'new title');

        expect(title.value).toBe('new title');

        const buttonAddItem = getByTestId('title-submit');
        userEvent.click(buttonAddItem);

        expect(mockDispatchFN).toHaveBeenCalledWith(addTodo(title.value, category1Id));
        expect(mockDispatchFN).toHaveBeenCalledTimes(1);
    });

    test('selector must be worked', () => {
        const result = todoSelector.resultFunc(testData.todos, testData.todosId);

        expect(result.length).toBe(3);
        expect(result[0].title).toBe('Cat');
        expect(result[1].title).toBe('Dog');
        expect(result[2].title).toBe('Elephant');
        expect(result[0].id).toBe('1');
    });
});
