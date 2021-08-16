import React from "react";
import {Route} from "react-router";
import {Category} from "../Category/Category";
import {Todos} from "../Todos/Todos";

enum ROUTING_PATHS {
    HOME_ROUTE = '/',
    TODOS_ROUTE = '/category/todo-list/:id',
}

export const routers = (
    <>
        <Route path={ROUTING_PATHS.HOME_ROUTE} render={() => Category} />
        <Route path={ROUTING_PATHS.TODOS_ROUTE} render={() => Todos} />
    </>
)
