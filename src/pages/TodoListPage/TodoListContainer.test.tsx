import React, {ChangeEvent} from 'react';
import {getByTestId, render, screen} from '@testing-library/react';
import {Provider, useDispatch} from 'react-redux';
import * as redux from 'react-redux';
import {BrowserRouter, MemoryRouter} from 'react-router-dom';
import routeData from 'react-router';

import userEvent from '@testing-library/user-event';
import {store} from '../../store/store';
import {TodoListContainer} from './TodoListContainer';
import {changeTodoStatus, todoSelector} from '../../store';
import {category1Id, category2Id} from '../../store/category-reducer';
import {TodoList} from './components';
import {commonStyle} from '../CommonComponents';
import {Simulate} from 'react-dom/test-utils';
import input = Simulate.input;

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

const mockLocation = {
    pathname: '/todos',
    hash: '',
    search: '?categoryId=54ad0010-1f63-11ec-8630-39b1cc0e6986&showDone=true&searchText=',
    state: '',
};

const location = jest.spyOn(routeData, 'useLocation');

beforeEach(() => {
});

describe('TodoListContainer component', () => {
    test('renders TodoListContainer', () => {
        location.mockReturnValue(mockLocation);
        const {container} = render(
            <MemoryRouter>
                <Provider store={store}>
                    <TodoListContainer />
                </Provider>
            </MemoryRouter>
        );
        // const buttonStatus = getByTestId('change-todo-status').querySelector('input[type="checkbox"]');
        // console.log(buttonStatus);
        screen.debug();
        // console.log(screen.getAllByText(/Dog/));
        console.log(container.querySelector('main input[type="checkbox"]').innerHTML);
    });

    describe('dispatch mock', () => {});
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

    test('selector must be worked', () => {
        const result = todoSelector.resultFunc(testData.todos, testData.todosIds);

        expect(result.length).toBe(3);
        expect(result[0].title).toBe('Cat');
        expect(result[1].title).toBe('Dog');
        expect(result[2].title).toBe('Elephant');
        expect(result[0].id).toBe('1');
    });
});
