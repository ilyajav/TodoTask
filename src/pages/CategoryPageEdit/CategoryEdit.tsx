// eslint-disable-next-line no-use-before-define
import React, {FC} from 'react';
import {IconButton} from '@material-ui/core';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import {RecursiveTreeEdit} from '../../components/RecursiveTreeEdit';
import {CategoryStateType} from '../../store/category-reducer';
import style from './CategoryEdit.module.css';

type CategoryEditPropsType = {
    title: string
    category: CategoryStateType
}

export const CategoryEdit: FC<CategoryEditPropsType> = (
    {
        title,
        category,
    }
) => (
    <div className={style.item}>
        {title}
        <RecursiveTreeEdit data={category} />
        <span className={style.buttonElements}>
            <IconButton color="primary">
                <MenuOpenIcon />
            </IconButton>
        </span>
    </div>
);
