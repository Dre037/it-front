import { Routes } from "@angular/router";
import { ConceptLayout } from "./layouts/concept/concept.component";

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/entrys'
    },
    {
        path: 'entrys',
        component: ConceptLayout,
        loadChildren: () => import("./modules/entrys/entrys.module").then(m => m.EntrysModule),
        data: { preload: true, delay: false },
    },
    {
        path: 'category',
        component: ConceptLayout,
        loadChildren: () => import("./modules/category/category.module").then(m => m.CategoryModule),
        data: { preload: true, delay: false }
    }
]