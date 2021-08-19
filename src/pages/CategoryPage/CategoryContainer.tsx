// eslint-disable-next-line no-use-before-define
import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Box} from '@material-ui/core';
import {changeStatus} from '../../store/app-reducer';
import {CategoryStateType, removeCategory} from '../../store/category-reducer';
import {Category} from './Category';
import {AppRootStateType} from '../../store/store';

type CategoryContainerPropsType = {}

export const CategoryContainer: FC<CategoryContainerPropsType> = () => {
    const dispatch = useDispatch();
    const categories = useSelector<AppRootStateType, CategoryStateType[]>(state => state.categoryData);

    useEffect(() => {
        dispatch(changeStatus('succeeded'));
    }, []);

    return (
        <>
            {
                categories.map(ct => {
                    const onRemoveCategory = () => {
                        dispatch(removeCategory(ct.id));
                    };
                    return (
                        <>
                            <Category
                                title={ct.title}
                                id={ct.id}
                                onRemoveCategory={onRemoveCategory}
                                category={ct}
                            />
                            <Box>
                                <Box padding="5px" />
                            </Box>
                        </>
                    );
                })
            }
        </>
    );
};
