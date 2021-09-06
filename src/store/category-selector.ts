import {createSelector} from 'reselect';
import {AppRootState} from './store';

const getCategoryId = (state: AppRootState) => state.categoryData.categoriesId;

export const categoryIdSelector =
    createSelector([getCategoryId], (categoriesId: string[]) => categoriesId);
