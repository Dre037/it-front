import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromCategory from './category.reducer'

const categoryState = createFeatureSelector<fromCategory.CategoryState>(fromCategory.CategoryFeatureKey)

export const selectCategoryLoading = createSelector(categoryState, (state) => state.loading)
export const selectCategories = createSelector(categoryState, (state) => state.list)