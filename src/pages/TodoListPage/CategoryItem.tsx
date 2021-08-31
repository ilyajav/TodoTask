import React from 'react';
import {
    Box,
    Divider,
    Grid,
    IconButton,
    Paper,
} from '@material-ui/core';
import {ControlPoint} from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';

import {CategoryState} from '../../store';
import {EditableSpan} from './components';

import style from './CategoryItem.module.css';
import {TodoStyles} from './components/TodoStyles';

type CategoryItemProps = {
    category: CategoryState[]
    onRemoveCategory: (categoryId: string) => void;
    styleData: TodoStyles;
}

export const CategoryItem = (
    {
        category,
        onRemoveCategory,
        styleData,
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
                                <Grid container direction="row" justifyContent="space-between">
                                    <div className={style.item}>
                                        <EditableSpan
                                            itemTitle={ct.title}
                                            id={ct.id}
                                        />
                                        <IconButton color="primary" onClick={() => removeCategory(ct.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                    <div>
                                        <IconButton color="primary">
                                            <ControlPoint />
                                        </IconButton>
                                    </div>
                                </Grid>
                                <Divider light />
                                {ct.children && ct.children.length
                                    ? (
                                        <CategoryItem
                                            category={ct.children}
                                            onRemoveCategory={onRemoveCategory}
                                            styleData={childrenStyle}
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
