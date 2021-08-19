// eslint-disable-next-line no-use-before-define
import React, {FC} from 'react';
import {CategoryStateType} from '../store/category-reducer';
import {Category} from '../pages/CategoryPage/Category';

type RecursiveTreePropsType = {
    data: CategoryStateType;
}

export const RecursiveTree: FC<RecursiveTreePropsType> = ({data}) => {
    let hasChild: {id: string, title: string}[];
    if (data.children) {
        hasChild = data.children;
    } else {
        return <></>;
    }

    return (
        <div>
            {
                hasChild && hasChild.map(hc => (
                    <Category
                        title={hc.title}
                        id={hc.id}
                        category={hc}
                    />
                ))
            }
        </div>
    );
};
