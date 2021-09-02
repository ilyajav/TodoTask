import React from 'react';
import {
    Box,
    Divider,
    Grid,
    IconButton,
    Paper,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import {CategoryState} from '../../store';
import {
    EditableSpan,
    AddChildTodo,
} from './components';
import {TodoStyles} from './components/TodoStyles';

import style from './CategoryItem.module.css';

type CategoryItemProps = {
    category: CategoryState[]
    onRemoveCategory: (categoryId: string) => void;
    styleData: TodoStyles;
    onAddSubCategory: (id: string, title: string) => void;
    onChangeCategoryTitle: (id: string, title: string) => void;
    categoryId: string | null,
}

export const CategoryItem = (
    {
        category,
        onRemoveCategory,
        styleData,
        onAddSubCategory,
        onChangeCategoryTitle,
        categoryId,
    }: CategoryItemProps
) => {
    const removeCategory = (id: string) => {
        onRemoveCategory(id);
    };

    const childrenStyle = {
        margin: '5px 10px',
        border: '1px solid black',
    };

    return (
        <div>
            <Box>
                <Paper style={styleData}>
                    {
                        category.map(ct => (
                            <div key={ct.id}>
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
                                        <IconButton color="primary" onClick={() => removeCategory(ct.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                    <div>
                                        <AddChildTodo
                                            id={ct.id}
                                            onAddSubCategory={onAddSubCategory}
                                        />
                                    </div>
                                </Grid>
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
