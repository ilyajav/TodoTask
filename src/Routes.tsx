import {Redirect, Route} from 'react-router-dom';
import React from 'react';

import {TodoListContainer} from './pages/TodoListPage/TodoListContainer';
import {ROUTING_PATHS} from './App.constants';

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
    </>
);
