import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { RecipeDetailComponent } from "./recipe-book/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-book/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-book/recipe-start/recipe-start.component";
import { RecipesResolverService } from "./recipe-book/recipes-resolver.service";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    { path: 'recipes', component: RecipeBookComponent, children: [
        { path: '', component: RecipeStartComponent},
        { path: 'new', component: RecipeEditComponent},
        { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
        { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
    ]},
    { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}