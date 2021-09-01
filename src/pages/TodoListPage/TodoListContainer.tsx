import React, {
    ChangeEvent,
    useCallback,
} from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {useLocation} from 'react-router';

import {ROUTING_DATA} from '../../App.constants';
import {
    todoSelector,
    changeTodoStatus,
    removeCategory,
    AppRootState,
    CategoryState,
    addTodo,
    addCategory,
    addSubCategory,
    changeCategoryTitle,
} from '../../store';
import {TodoListPage} from './TodoListPage';
import {commonStyle} from './components/TodoStyles';

export const TodoListContainer = () => {
    const categoryData = useSelector<AppRootState, CategoryState[]>(state => state.categoryData);
    const finalTodo = useSelector(todoSelector);
    const dispatch = useDispatch();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const doneStatus = params.get(ROUTING_DATA.SHOW_DONE);
    const searchTodo = params.get(ROUTING_DATA.SEARCH_TEXT);
    const categoryId = params.get(ROUTING_DATA.CATEGORY_TEXT_ID);

    const onChangeTodoStatus = useCallback((e: ChangeEvent<HTMLInputElement>, id: string) => {
        const isDone = e.currentTarget.checked;
        dispatch(changeTodoStatus(id, isDone));
    }, [dispatch]);
    const onRemoveCategory = (categoryId: string) => {
        dispatch(removeCategory(categoryId));
    };
    const onAddTodo = (title: string) => {
        dispatch(addTodo(title));
    };
    const onAddCategory = (id: string, title: string) => {
        dispatch(addCategory(id, title));
    };
    const onAddSubCategory = (id: string, title: string) => {
        dispatch(addSubCategory(id, title));
    };
    const onChangeCategoryTitle = (id: string, title: string) => {
        dispatch(changeCategoryTitle(id, title));
    };

    return (
        <TodoListPage
            onChangeTodoStatus={onChangeTodoStatus}
            todoData={finalTodo}
            styleData={commonStyle}
            onRemoveCategory={onRemoveCategory}
            category={categoryData}
            doneStatus={doneStatus}
            searchTodo={searchTodo}
            categoryId={categoryId}
            onAddTodo={onAddTodo}
            onAddCategory={onAddCategory}
            onAddSubCategory={onAddSubCategory}
            onChangeCategoryTitle={onChangeCategoryTitle}
        />
    );
};
