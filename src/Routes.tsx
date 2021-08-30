import {Redirect, Route} from 'react-router-dom';
import React from 'react';

import {TodoListContainer} from './pages/TodoListPage/TodoListContainer';
import {TodoListEditContainer} from './pages/TodoListEditPage/TodoListEditContainer';
import {ROUTING_PATHS} from './App.constants';

export type params = {
    data: string
}

export const routers = (
    <>
        <Route
            exact
            path="/"
        >
            <Redirect to="/todos" />
        </Route>
        <Route
            path={ROUTING_PATHS.TODO_LIST_PAGE_ROUTE}
            render={() => <TodoListContainer />}
        />
        <Route
            path={ROUTING_PATHS.TODO_LIST_PAGE_EDIT_ROUTE}
            render={() => <TodoListEditContainer />}
        />
    </>
);
