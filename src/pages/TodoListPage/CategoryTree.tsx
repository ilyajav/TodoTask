import React from 'react';

import {CategoryState} from '../../store';
import {CategoryItem} from './CategoryItem';
import {commonStyle} from './components/TodoStyles';

type CategoryTreeProps = {
    onRemoveCategory: (categoryId: string) => void;
    category: CategoryState[]
    onAddSubCategory: (id: string, title: string) => void;
    onChangeCategoryTitle: (id: string, title: string) => void;
    categoryId: string | null,
}

export const CategoryTree = (
    {
        onRemoveCategory,
        category,
        onAddSubCategory,
        onChangeCategoryTitle,
        categoryId,
    }: CategoryTreeProps
) => (
    <>
        <CategoryItem
            category={category}
            onRemoveCategory={onRemoveCategory}
            styleData={commonStyle.category}
            onAddSubCategory={onAddSubCategory}
            onChangeCategoryTitle={onChangeCategoryTitle}
            categoryId={categoryId}
        />
    </>
);
