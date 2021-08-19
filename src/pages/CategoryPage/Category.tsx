// eslint-disable-next-line no-use-before-define
import React, {FC} from 'react';
import {Box, IconButton, Paper} from '@material-ui/core';
import {ControlPoint} from '@material-ui/icons';
import style from './Category.module.css';
import {EditableSpan} from '../../utils/EditebleSpan';
import {CategoryStateType} from '../../store/category-reducer';
import {RecursiveTree} from '../../components/RecursiveTree';

type CategoryType = {
    title: string
    id: string,
    category: CategoryStateType
}

export const Category: FC<CategoryType> = (
    {
        title,
        id,
        category,
    }
) => (
    <>

        <div className={style.item}>
            <EditableSpan
                itemTitle={title}
                id={id}
            />
            <RecursiveTree data={category} />
            <span className={style.buttonElements}>
                <IconButton color="primary">
                    <ControlPoint />
                </IconButton>
            </span>
        </div>
    </>
);
