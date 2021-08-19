// eslint-disable-next-line no-use-before-define
import React from 'react';
import {useSelector} from 'react-redux';
import {Box, Paper} from '@material-ui/core';
import {AppRootStateType} from '../../store/store';
import {TodosDataType} from '../../store/todo-reducer';
import {EditHeader} from './components/EditHeader';
import {CategoryStateType} from '../../store/category-reducer';
import {CategoryEdit} from './CategoryEdit';
import {AddItemForm} from '../../utils/AddItemForm';
import {TodosEditContainer} from './TodosEdit/TodosEditContainer';

export const CategoryEditContainer = () => {
    const todoData = useSelector<AppRootStateType, TodosDataType>(state => state.todoData);
    const categories = useSelector<AppRootStateType, CategoryStateType[]>(state => state.categoryData);

    const {search} = window.location;
    const params = new URLSearchParams(search);
    const id = params.get('todoId');

    const styles = {
        Paper: {
            padding: 20,
            height: 250,
            overflowY: 'auto' as 'auto',
        },
    };

    return (
        <div>
            {
                // eslint-disable-next-line array-callback-return
                categories.map(ct => {
                    const todo = todoData[ct.id];
                    // eslint-disable-next-line array-callback-return,consistent-return
                    todo.map(td => {
                        // eslint-disable-next-line no-debugger
                        debugger;
                        if (td.id === id) {
                            // eslint-disable-next-line no-debugger
                            debugger;
                            return <EditHeader todoTitle={td.title} />;
                        }
                    });
                })
            }
            <Box display="flex">
                <Box padding="25px">
                    <Paper style={styles.Paper}>
                        {
                            categories.map(ct => (
                                <>
                                    <CategoryEdit
                                        title={ct.title}
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
                                                const todo = todoData[ct.id];
                                                return (
                                                    <div>
                                                        <AddItemForm formText="Enter new todo name" />
                                                        <TodosEditContainer
                                                            todo={todo}
                                                            categoryId={ct.id}
                                                            id={id}
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
        </div>
    );
};
