import { ActionReducerMap, createReducer } from "@ngrx/store";
import { reducer } from "../modules/category/shared/store/category.reducer";

const appReducer = createReducer(
    {}
)

export const reducers: ActionReducerMap<any> = {
    app: appReducer,
    category: reducer
}