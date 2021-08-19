// eslint-disable-next-line no-use-before-define
import React, {FC} from 'react';
import {CategoryStateType} from '../store/category-reducer';
import {CategoryEdit} from '../pages/CategoryPageEdit/CategoryEdit';

type RecursiveTreePropsType = {
    data: CategoryStateType;
}

export const RecursiveTreeEdit: FC<RecursiveTreePropsType> = ({data}) => {
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
                    <CategoryEdit
                        title={hc.title}
                        category={hc}
                    />
                ))
            }
        </div>
    );
};
