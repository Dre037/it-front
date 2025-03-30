import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CategoryApiService } from "../services/category-api.service";
import * as CategoryActions from "./category.actions";
import { catchError, map, of, switchMap, take } from "rxjs";

@Injectable()
export class CategoryEffects {

    constructor(
        private actions$: Actions,
        private categoryApiService: CategoryApiService
    ) {}

    fetch$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CategoryActions.fetchCategories),
            switchMap(() => this.categoryApiService.list()),
            map(list => CategoryActions.fetchCategoriesSuccess({ categories: list })),
            catchError(err => of(CategoryActions.fetchCategoriesFailure({ error: new Error(err)} )))
        )
    })
}