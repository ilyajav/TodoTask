import React from 'react';
import {
    Box,
    Divider,
    Grid,
    IconButton,
    Paper,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

import {CategoryState} from '../../../store';
import {
    EditableSpan,
    AddChildTodo,
} from '../../TodoListPage/components';
import {TodoStyles} from '../TodoStyles';

import style from './CategoryItem.module.css';
import {MODE} from '../../../App.constants';

type CategoryItemProps = {
    category: CategoryState[]
    onRemoveCategory: (categoryId: string) => void;
    styleData: TodoStyles;
    onAddSubCategory: (id: string, title: string) => void;
    onChangeCategoryTitle: (id: string, title: string) => void;
    categoryId: string | null,
    mode: string;
    onChangeTodoParent: (todoId: string | null, category: string) => void;
    todoId: string | null
}

export const CategoryItem = (
    {
        category,
        onRemoveCategory,
        styleData,
        onAddSubCategory,
        onChangeCategoryTitle,
        categoryId,
        mode,
        onChangeTodoParent,
        todoId,
    }: CategoryItemProps
) => {
    const removeCategory = (id: string) => {
        onRemoveCategory(id);
    };

    const childrenStyle = {
        margin: '5px 10px',
        border: '1px solid black',
    };

    const changeTodoParent = (todoId: string | null, categoryId: string) => {
        onChangeTodoParent(todoId, categoryId);
    };

    return (
        <div>
            <Box>
                <Paper style={styleData}>
                    {
                        category.map(ct => (
                            <div key={ct.id}>
                                {
                                    mode === MODE.SHOW
                                        ? (
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="space-between"
                                                className={categoryId === ct.id ? style.selectedCategory : ''}
                                            >
                                                <div className={style.item}>
                                                    <EditableSpan
                                                        itemTitle={ct.title}
                                                        id={ct.id}
                                                        onChangeCategoryTitle={onChangeCategoryTitle}
                                                        categoryId={categoryId}
                                                    />
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => removeCategory(ct.id)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <span className={style.buttonAddElements}>
                                                        <AddChildTodo
                                                            id={ct.id}
                                                            onAddSubCategory={onAddSubCategory}
                                                        />
                                                    </span>
                                                </div>
                                            </Grid>
                                        )
                                        : (
                                            <Grid
                                                container
                                                justifyContent="space-between"
                                            >
                                                <div>
                                                    <span className={style.item}>
                                                        {ct.title}
                                                    </span>
                                                </div>
                                                <span className={style.buttonElements}>
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => changeTodoParent(todoId, ct.id)}
                                                    >
                                                        <MenuOpenIcon />
                                                    </IconButton>
                                                </span>
                                            </Grid>
                                        )
                                }
                                <Divider light />
                                {ct.children && ct.children.length
                                    ? (
                                        <CategoryItem
                                            category={ct.children}
                                            onRemoveCategory={onRemoveCategory}
                                            styleData={childrenStyle}
                                            onAddSubCategory={onAddSubCategory}
                                            onChangeCategoryTitle={onChangeCategoryTitle}
                                            categoryId={categoryId}
                                            mode={mode}
                                            onChangeTodoParent={onChangeTodoParent}
                                            todoId={todoId}
                                        />
                                    )
                                    : null}
                            </div>
                        ))
                    }
                </Paper>
            </Box>
        </div>
    );
};
