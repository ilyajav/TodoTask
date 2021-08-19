// eslint-disable-next-line no-use-before-define
import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Box, Container, Grid, Paper,
} from '@material-ui/core';
import {changeStatus, StatusType} from '../../store/app-reducer';
import {CategoryStateType} from '../../store/category-reducer';
import {Category} from './Category';
import {AppRootStateType} from '../../store/store';
import {Header} from './compnents/Header/Header';
import {AddItemForm} from '../../utils/AddItemForm';
import {TodosContainer} from './Todos/TodosContainer';
import {TodosDataType} from '../../store/todo-reducer';

type CategoryContainerPropsType = {}

export const CategoryContainer: FC<CategoryContainerPropsType> = () => {
    const dispatch = useDispatch();
    const categories = useSelector<AppRootStateType, CategoryStateType[]>(state => state.categoryData);
    const showDone = useSelector<AppRootStateType, boolean>(state => state.app.showDone);
    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status);
    const todos = useSelector<AppRootStateType, TodosDataType>(state => state.todoData);

    useEffect(() => {
        dispatch(changeStatus('succeeded'));
    }, []);

    const {search} = window.location;
    const params = new URLSearchParams(search);
    const id = params.get('categoryId');

    const styles = {
        Paper: {
            padding: 20,
            height: 250,
            overflowY: 'auto' as 'auto',
        },
    };

    return (
        <>
            <Header showDone={showDone} status={status} />
            <Container fixed>
                <Grid
                    container
                    style={{padding: '20px'}}
                    justifyContent="space-between"
                >
                    <AddItemForm formText="Enter category title" />
                </Grid>
            </Container>
            <Box display="flex">
                <Box padding="25px">
                    <Paper style={styles.Paper}>
                        {
                            categories.map(ct => (
                                <>
                                    <Category
                                        title={ct.title}
                                        id={ct.id}
                                        category={ct}
                                    />
                                </>
                            ))
                        }
                    </Paper>
                </Box>
                {id
                    ? (
                        <Box margin="20px 450px">
                            <Paper style={styles.Paper}>
                                {
                                    // eslint-disable-next-line array-callback-return,consistent-return
                                    categories.map(ct => {
                                        if (id) {
                                            if (ct.id === id) {
                                                const todo = todos[ct.id];
                                                return (
                                                    <div>
                                                        <AddItemForm formText="Enter new todo name" />
                                                        <TodosContainer
                                                            todo={todo}
                                                            categoryId={ct.id}
                                                        />
                                                    </div>
                                                );
                                            }
                                        }
                                    })
                                }
                            </Paper>
                        </Box>
                    )
                    : null}
            </Box>
        </>
    );
};
