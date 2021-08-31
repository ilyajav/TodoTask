import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
    AppRootState,
    CategoryState,
    removeCategory,
} from '../../store';
import {CategoryItem} from './CategoryItem';
import {commonStyle} from './components/TodoStyles';

export const CategoryTree = () => {
    const categoryData = useSelector<AppRootState, CategoryState[]>(state => state.categoryData);
    const dispatch = useDispatch();

    const onRemoveCategory = (categoryId: string) => {
        dispatch(removeCategory(categoryId));
    };
    return (
        <div>
            <CategoryItem
                category={categoryData}
                onRemoveCategory={onRemoveCategory}
                styleData={commonStyle.category}
            />
        </div>
    );
};
