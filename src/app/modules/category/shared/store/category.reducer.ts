import { Action, createReducer, on } from "@ngrx/store"
import { Category } from "../interfaces/category"
import * as CategoryActions from './category.actions'

export const CategoryFeatureKey = 'Category'

export interface CategoryState {
    loading: boolean
    list: Category[]
}

const initialState: CategoryState = {
    loading: false,
    list: []
}

const categoryReducer = createReducer(
    initialState,
    on(CategoryActions.fetchCategories, (state) => ({
        ...state,
        loading: true
    })),
    on(CategoryActions.fetchCategoriesSuccess, (state, action) => ({
        ...state,
        loading: false,
        list: action.categories
    })),
    on(CategoryActions.fetchCategories, (state) => ({
        ...state,
        loading: false
    }))
)

export function reducer(state: CategoryState, action: Action) {
    return categoryReducer(state, action)
}