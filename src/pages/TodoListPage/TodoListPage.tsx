import React,
{
    ChangeEvent,
} from 'react';
import {v1} from 'uuid';
import {
    Box, Container, Grid, Paper, makeStyles,
} from '@material-ui/core';

import {
    AddItemForm,
    Header,
} from './components';
import {TodoList} from './TodoList';
import {
    CategoryTree,
    TodoDataStyle,
} from '../CommonComponents';
import {Todos} from '../../store';

type TodoListPageProps = {
    onChangeTodoStatus: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
    todoData: Todos[];
    styleData: TodoDataStyle;
    doneStatus: string | null,
    searchTodo: string | null,
    categoryId: string | null,
    onAddTodo: (title: string, categoryId: string) => void;
    onAddCategory: (id: string, title: string) => void;
    mode: string,
    todoId: string | null,
}

const userStyles = makeStyles(theme => {

});

export const TodoListPage = React.memo((
    {
        onChangeTodoStatus,
        todoData,
        styleData,
        doneStatus,
        searchTodo,
        categoryId,
        onAddTodo,
        onAddCategory,
        mode,
        todoId,
    }: TodoListPageProps
) => {
    const classes = userStyles();

    let todos = todoData;
    if (categoryId) {
        todos = todoData.filter(td => td.parentID === categoryId);
    }

    return (
        <>
            <Header categoryId={categoryId} />
            <main>
                <div>
                    <Box display="flex">
                        <div>
                            <AddItemForm
                                formText="Enter new category name"
                                addItem={onAddCategory}
                                categoryId={v1()}
                                addStyle={styleData.addItemCategory}
                            />
                            <CategoryTree
                                mode={mode}
                                todoId={todoId}
                            />
                        </div>
                        <div>
                            {categoryId && (
                                <div>
                                    <AddItemForm
                                        formText="Enter new Todo name"
                                        addItem={onAddTodo}
                                        categoryId={categoryId}
                                        addStyle={styleData.addItemTodo}
                                    />
                                    <TodoList
                                        onChangeTodoStatus={onChangeTodoStatus}
                                        todo={todos}
                                        styleData={styleData}
                                        doneStatus={doneStatus}
                                        searchTodo={searchTodo}
                                    />
                                </div>
                            )}
                        </div>
                    </Box>
                </div>
            </main>
        </>
    );
});
