import React from 'react';

import {CategoryState} from '../../store';
import {CategoryItem} from './CategoryItem';
import {commonStyle} from './components/TodoStyles';

type CategoryTreeProps = {
    onRemoveCategory: (categoryId: string) => void;
    category: CategoryState[]
    onAddSubCategory: (id: string, title: string) => void;
    onChangeCategoryTitle: (id: string, title: string) => void;
}

export const CategoryTree = (
    {
        onRemoveCategory,
        category,
        onAddSubCategory,
        onChangeCategoryTitle,
    }: CategoryTreeProps
) => (
    <>
        <CategoryItem
            category={category}
            onRemoveCategory={onRemoveCategory}
            styleData={commonStyle.category}
            onAddSubCategory={onAddSubCategory}
            onChangeCategoryTitle={onChangeCategoryTitle}
        />
    </>
);
