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
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from 'react-redux';

import {
    EditableSpan,
    AddChildTodo,
} from '../../TodoListPage/components';
import {TodoStyles} from '../TodoStyles';

import style from './CategoryItem.module.css';
import {MODE} from '../../../App.constants';
import {
    AppRootState,
    Category,
} from '../../../store';

type CategoryItemProps = {
    categoriesId: string[];
    onRemoveCategory: (categoryId: string) => void;
    styleData: TodoStyles;
    onAddSubCategory: (id: string, title: string) => void;
    onChangeCategoryTitle: (id: string, title: string) => void;
    categoryId: string | null,
    mode: string;
    onChangeTodoParent: (todoId: string | null, category: string) => void;
    todoId: string | null;
}

export const CategoryItem = React.memo((
    {
        categoriesId,
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
    const categoriesData = useSelector<AppRootState, Category>(state => state.categoryData.categories);
    const notifySuccess = () => toast.success('Todo moved');

    const removeCategory = (id: string) => {
        onRemoveCategory(id);
    };

    const childrenStyle = {
        margin: '5px 10px',
        border: '1px solid black',
    };

    const changeTodoParent = (todoId: string | null, categoryId: string) => {
        onChangeTodoParent(todoId, categoryId);
        notifySuccess();
    };

    return (
        <div>
            <Box>
                <Paper style={styleData}>
                    {
                        categoriesId.map(ci => (
                            <div key={ci}>
                                {
                                    mode === MODE.SHOW
                                        ? (
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="space-between"
                                                className={categoryId === ci ? style.selectedCategory : ''}
                                            >
                                                <div className={style.item}>
                                                    <EditableSpan
                                                        itemTitle={categoriesData[ci].title}
                                                        id={ci}
                                                        onChangeCategoryTitle={onChangeCategoryTitle}
                                                        categoryId={categoryId}
                                                    />
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => removeCategory(ci)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <span className={style.buttonAddElements}>
                                                        <AddChildTodo
                                                            id={ci}
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
                                                        {categoriesData[ci].title}
                                                    </span>
                                                </div>
                                                <span className={style.buttonElements}>
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => changeTodoParent(todoId, ci)}
                                                    >
                                                        <MenuOpenIcon />
                                                    </IconButton>
                                                </span>
                                            </Grid>
                                        )
                                }
                                <Divider light />
                                {/* {ct.children && ct.children.length */}
                                {/*    ? ( */}
                                {/*        <CategoryItem */}
                                {/*            category={ct.children} */}
                                {/*            onRemoveCategory={onRemoveCategory} */}
                                {/*            styleData={childrenStyle} */}
                                {/*            onAddSubCategory={onAddSubCategory} */}
                                {/*            onChangeCategoryTitle={onChangeCategoryTitle} */}
                                {/*            categoryId={categoryId} */}
                                {/*            mode={mode} */}
                                {/*            onChangeTodoParent={onChangeTodoParent} */}
                                {/*            todoId={todoId} */}
                                {/*        /> */}
                                {/*    ) */}
                                {/*    : null} */}
                            </div>
                        ))
                    }
                </Paper>
            </Box>
        </div>
    );
});
