import React, {ChangeEvent} from 'react';
import {v1} from 'uuid';

import {AddItemForm, Header} from './components';
import {TodoList} from './TodoList';
import {TodoDataStyle} from './components/TodoStyles';
import {CategoryTree} from './CategoryTree';
import {CategoryState, Todos} from '../../store';

import style from './TodoListPade.module.css';

type TodoListPageProps = {
    onChangeTodoStatus: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
    todoData: Todos[];
    styleData: TodoDataStyle;
    onRemoveCategory: (categoryId: string) => void;
    category: CategoryState[]
    doneStatus: string | null,
    searchTodo: string | null,
    categoryId: string | null,
    onAddTodo: (title: string) => void;
    onAddCategory: (id: string, title: string) => void;
    onAddSubCategory: (id: string, title: string) => void;
    onChangeCategoryTitle: (id: string, title: string) => void;
}

export const TodoListPage = (
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
            {categoryId && (
                <>
                    <AddItemForm
                        formText="Enter new Todo name"
                        onAddItem={onAddTodo}
                        categoryId={categoryId}
                    />
                    <TodoList
                        onChangeTodoStatus={onChangeTodoStatus}
                        todo={todos}
                        styleData={styleData}
                        doneStatus={doneStatus}
                        searchTodo={searchTodo}
                    />
                </>
            )}
            <div className={style.addItem}>
                <AddItemForm
                    formText="Enter new category name"
                    onAddItem={onAddCategory}
                    categoryId={v1()}
                />
            </div>
            <CategoryTree
                onRemoveCategory={onRemoveCategory}
                category={category}
                onAddSubCategory={onAddSubCategory}
                onChangeCategoryTitle={onChangeCategoryTitle}
            />
        </>
    );
};
