import {Redirect, Route} from 'react-router-dom';
// eslint-disable-next-line no-use-before-define
import React from 'react';
import {TodosContainer} from './pages/TodosPage/TodosContainer';

enum ROUTING_PATHS {
    HOME_ROUTE = '/todos',
}

export const routers = (
    <>
        <Route exact path="/"><Redirect to="/todos" /></Route>
        <Route path={ROUTING_PATHS.HOME_ROUTE} render={() => <TodosContainer />} />
    </>
);
