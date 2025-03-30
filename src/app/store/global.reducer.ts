import { ActionReducerMap, createReducer } from "@ngrx/store";

const appReducer = createReducer(
    {}
)

export const reducers: ActionReducerMap<any> = {
    app: appReducer
}