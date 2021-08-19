import {Redirect, Route} from 'react-router-dom';
// import {CategoryEditContainer} from "./pages/CategoryPageEdit/CategoryEditContainer";
// eslint-disable-next-line no-use-before-define
import React from 'react';
import {CategoryMainContainer} from './pages/CategoryPage/CategoryMainContainer';
// eslint-disable-next-line no-use-before-define

enum ROUTING_PATHS {
    HOME_ROUTE = '/todos',
}

export const routers = (
    <>
        <Route exact path="/"><Redirect to="/todos" /></Route>
        <Route path={ROUTING_PATHS.HOME_ROUTE} render={() => <CategoryMainContainer />} />
    </>
);
