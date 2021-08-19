// eslint-disable-next-line no-use-before-define
import React from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../store/store';
import {TodosDataType} from '../../store/todo-reducer';
import {EditHeader} from './components/EditHeader';
import {CategoryStateType} from '../../store/category-reducer';

export const CategoryEditContainer = () => {
    const todoData = useSelector<AppRootStateType, TodosDataType>(state => state.todoData);
    const categories = useSelector<AppRootStateType, CategoryStateType[]>(state => state.categoryData);

    const {search} = window.location;
    const params = new URLSearchParams(search);
    const id = params.get('edit');

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
        </div>
    );
};
