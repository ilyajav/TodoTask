import {useSelector} from 'react-redux';
// eslint-disable-next-line no-use-before-define
import React from 'react';
import {
    Container, Grid, Box, Paper,
} from '@material-ui/core';
import {AppRootStateType} from '../../store/store';
import {CategoryStateType} from '../../store/category-reducer';
import {CategoryContainer} from './CategoryContainer';
import {StatusType} from '../../store/app-reducer';
import {AddItemForm} from '../../utils/AddItemForm';

import {TodosDataType} from '../../store/todo-reducer';
import {TodosContainer} from './Todos/TodosContainer';
import {Header} from './compnents/Header';

export const CategoryMainContainer = () => {
    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status);
    const showDone = useSelector<AppRootStateType, boolean>(state => state.app.showDone);
    const todos = useSelector<AppRootStateType, TodosDataType >(state => state.todoData);

    const styles = {
        Paper: {padding: 20, height: 250, overflowY: 'auto' as 'auto'},
    };

    const {search} = window.location;
    const params = new URLSearchParams(search);
    const id = params.get('categoryId');

    return (
        <>
            <Header status={status} showDone={showDone} />
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
                    <Paper style={styles.Paper} />
                </Box>
            </Box>
        </>
    );
};
