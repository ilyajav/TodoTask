import React,
{
    ChangeEvent,
} from 'react';
import {v1} from 'uuid';
import {Box} from '@material-ui/core';

import {
    AddItemForm,
    Header,
} from './components';
import {TodoList} from './TodoList';
import {TodoDataStyle} from './components/TodoStyles';
import {CategoryTree} from './CategoryTree';
import {
    CategoryState,
    Todos,
} from '../../store';

type TodoListPageProps = {
    onChangeTodoStatus: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
    todoData: Todos[];
    styleData: TodoDataStyle;
    onRemoveCategory: (categoryId: string) => void;
    category: CategoryState[]
    doneStatus: string | null,
    searchTodo: string | null,
    categoryId: string | null,
    onAddTodo: (title: string, categoryId: string) => void;
    onAddCategory: (id: string, title: string) => void;
    onAddSubCategory: (id: string, title: string) => void;
    onChangeCategoryTitle: (id: string, title: string) => void;
}

export const TodoListPage = React.memo((
    {
        onChangeTodoStatus,
        todoData,
        styleData,
        onRemoveCategory,
        category,
        doneStatus,
        searchTodo,
        categoryId,
        onAddTodo,
        onAddCategory,
        onAddSubCategory,
        onChangeCategoryTitle,
    }: TodoListPageProps
) => {
    let todos = todoData;
    if (categoryId) {
        todos = todoData.filter(td => td.parentID === categoryId);
    }

    return (
        <>
            <Header categoryId={categoryId} />
            <Box display="flex">
                <div>
                    <AddItemForm
                        formText="Enter new category name"
                        addItem={onAddCategory}
                        categoryId={v1()}
                        addStyle={styleData.addItemCategory}
                    />
                    <CategoryTree
                        onRemoveCategory={onRemoveCategory}
                        category={category}
                        onAddSubCategory={onAddSubCategory}
                        onChangeCategoryTitle={onChangeCategoryTitle}
                        categoryId={categoryId}
                    />
                </div>
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
            </Box>
        </>
    );
});
