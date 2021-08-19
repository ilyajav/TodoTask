import {Redirect, Route} from 'react-router-dom';
// import {CategoryEditContainer} from "./pages/CategoryPageEdit/CategoryEditContainer";
// eslint-disable-next-line no-use-before-define
import React from 'react';
import {CategoryContainer} from './pages/CategoryPage/CategoryContainer';
import {CategoryEditContainer} from './pages/CategoryPageEdit/CategoryEditContainer';
// eslint-disable-next-line no-use-before-define

enum ROUTING_PATHS {
    HOME_ROUTE = '/todos',
    EDIT_ROUTE = '/todosEdit'
}

export const routers = (
    <>
        <Route exact path="/"><Redirect to="/todos" /></Route>
        <Route path={ROUTING_PATHS.HOME_ROUTE} render={() => <CategoryContainer />} />
        <Route path={ROUTING_PATHS.EDIT_ROUTE} render={() => <CategoryEditContainer />} />
    </>
);
