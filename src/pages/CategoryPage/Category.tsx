// eslint-disable-next-line no-use-before-define
import React, {FC} from 'react';
import {IconButton} from '@material-ui/core';
import {ControlPoint} from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import style from './Category.module.css';
import {EditableSpan} from '../../utils/EditebleSpan';
import {CategoryStateType} from '../../store/category-reducer';
import {RecursiveTree} from '../../components/RecursiveTree';

type CategoryType = {
    title: string
    id: string,
    onRemoveCategory: () => void;
    category: CategoryStateType
}

export const Category: FC<CategoryType> = (
    {
        title,
        id,
        onRemoveCategory,
        category = [],
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
                <IconButton color="primary" onClick={onRemoveCategory}>
                    <DeleteIcon />
                </IconButton>
                <IconButton color="primary">
                    <ControlPoint />
                </IconButton>
            </span>
        </div>
    </>
);
