import {Redirect, Route} from 'react-router-dom';
import React from 'react';

import {TodoListContainer} from './pages/TodoListPage/TodoListContainer';

export enum ROUTING_PATHS {
    TODO_LIST_PAGE_ROUTE = '/todos',
    TODO_SEARCH = '?searchText=',
    TODO_SHOW_DONE = '?showDone=',
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
    </>
);
