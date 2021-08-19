// eslint-disable-next-line no-use-before-define
import React, {FC} from 'react';
import {CategoryStateType} from '../store/category-reducer';
import {Category} from '../pages/CategoryPage/Category';

type RecursiveTreePropsType = {
    data: CategoryStateType
}

export const RecursiveTree: FC<RecursiveTreePropsType> = ({data}) => {
    const hasChild = !!data.children;

    return (
        <div>
            {
                hasChild && (
                    <Category
                        title={data.title}
                        id={data.id}
                        category={data.children}
                    />
                )
}
        </div>
    );
};
