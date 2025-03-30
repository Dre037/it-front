import { createAction, props } from "@ngrx/store";
import { Category } from "../interfaces/category";

export const fetchCategories = createAction(
    '[Category API] load categories',
)

export const fetchCategoriesSuccess = createAction(
    '[Category API] load categories success',
    props<{ categories: Category[] }>()
)

export const fetchCategoriesFailure = createAction(
    '[Category API] load categories failure',
    props<{ error: Error }>()
)