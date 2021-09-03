import React,
{
    useCallback, useEffect,
} from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {useLocation} from 'react-router';
import {
    addSubCategory,
    AppRootState,
    CategoryState,
    changeCategoryTitle,
    removeCategory,
} from '../../store';
import {CategoryItem} from './CategoryItem/CategoryItem';
import {commonStyle} from './TodoStyles';
import {MODE, ROUTING_DATA, ROUTING_PATHS} from '../../App.constants';
import {changeTodoParent} from '../../store/todo-reducer';

type CategoryTreeProps = {
    mode: string,
    todoId: string | null,
}

export const CategoryTree = ({mode, todoId}: CategoryTreeProps) => {
    const categoryData = useSelector<AppRootState, CategoryState[]>(state => state.categoryData);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const categoryId = params.get(ROUTING_DATA.CATEGORY_TEXT_ID);

    const onRemoveCategory = useCallback((categoryId: string) => {
        dispatch(removeCategory(categoryId));
    }, [dispatch]);
    const onChangeCategoryTitle = useCallback((id: string, title: string) => {
        dispatch(changeCategoryTitle(id, title));
    }, [dispatch]);
    const onAddSubCategory = useCallback((id: string, title: string) => {
        dispatch(addSubCategory(id, title));
    }, [dispatch]);
    const onChangeTodoParent = useCallback((todoId: string | null, category: string) => {
        dispatch(changeTodoParent(todoId, category));
    }, [dispatch]);

    useEffect(() => {
        if (mode === MODE.SHOW) {
            history.push(`${ROUTING_PATHS.TODO_LIST_PAGE_ROUTE}`);
        }
    }, [mode, history, categoryData]);

    return (
        <div>
            <CategoryItem
                category={categoryData}
                onRemoveCategory={onRemoveCategory}
                styleData={commonStyle.category}
                onAddSubCategory={onAddSubCategory}
                onChangeCategoryTitle={onChangeCategoryTitle}
                categoryId={categoryId}
                mode={mode}
                onChangeTodoParent={onChangeTodoParent}
                todoId={todoId}
            />
        </div>
    );
};
