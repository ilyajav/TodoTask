import React from 'react';
import {
    Divider,
    Grid,
    IconButton,
    Paper,
} from '@material-ui/core';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from 'react-redux';

import {
    EditableSpan,
    AddChildTodo,
} from '../../TodoListPage/components';

import {MODE} from '../../../App.constants';
import {
    AppRootState,
    CategoryState,
} from '../../../store';

import style from './CategoryItem.module.css';

type CategoryItemProps = {
    categoryDataId: string;
    onRemoveCategory: (categoryId: string) => void;
    onAddSubCategory: (id: string, title: string) => void;
    onChangeCategoryTitle: (id: string, title: string) => void;
    categoryId: string | null,
    mode: string;
    onChangeTodoParent: (todoId: string | null, category: string) => void;
    todoId: string | null;
}

export const CategoryItem = React.memo((
    {
        categoryDataId,
        onRemoveCategory,
        onAddSubCategory,
        onChangeCategoryTitle,
        categoryId,
        mode,
        onChangeTodoParent,
        todoId,
    }: CategoryItemProps
) => {
    const categoryData =
        useSelector<AppRootState, CategoryState>(state => state.categoryData.categories[categoryDataId]);
    const notifySuccess = () => toast.success('Todo moved');

    const changeTodoParent = (todoId: string | null, categoryId: string) => {
        onChangeTodoParent(todoId, categoryId);
        notifySuccess();
    };

    return (
        <div>
            {categoryData
                ? (
                    <div>
                        {
                            mode === MODE.SHOW
                                ? (
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        className={categoryId === categoryData.id ? style.selectedCategory : ''}
                                    >
                                        <div className={style.item}>
                                            <div>
                                                <EditableSpan
                                                    itemTitle={categoryData.title}
                                                    id={categoryData.id}
                                                    onChangeCategoryTitle={onChangeCategoryTitle}
                                                    onRemoveCategory={onRemoveCategory}
                                                />
                                                <span className={style.buttonAddElements}>
                                                    <AddChildTodo
                                                        id={categoryData.id}
                                                        onAddSubCategory={onAddSubCategory}
                                                    />
                                                </span>
                                            </div>
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
                                                {categoryData.title}
                                            </span>
                                        </div>
                                        <span className={style.buttonElements}>
                                            <IconButton
                                                color="primary"
                                                onClick={() => changeTodoParent(todoId, categoryData.id)}
                                            >
                                                <MenuOpenIcon />
                                            </IconButton>
                                        </span>
                                    </Grid>
                                )
                        }
                        <Divider light />
                        <div>
                            {categoryData.childrenId.length
                                ? (
                                    categoryData.childrenId.map(ch => (
                                        <Paper className={style.child} key={ch}>
                                            <CategoryItem
                                                onRemoveCategory={onRemoveCategory}
                                                onAddSubCategory={onAddSubCategory}
                                                onChangeCategoryTitle={onChangeCategoryTitle}
                                                categoryId={categoryId}
                                                mode={mode}
                                                onChangeTodoParent={onChangeTodoParent}
                                                todoId={todoId}
                                                categoryDataId={ch}
                                            />
                                        </Paper>
                                    )))
                                : null}
                        </div>
                    </div>
                )
                : null}
        </div>
    );
});
