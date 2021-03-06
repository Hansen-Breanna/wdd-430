import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe-book.model";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'Lemon Pork Chops',
    //         'A great grilled pork chop with a hint of lemon',
    //         'https://cdn.pixabay.com/photo/2020/02/02/15/07/meat-4813261_960_720.jpg',
    //         [
    //             new Ingredient('Pork Chops', 4),
    //             new Ingredient('Lemons', 2)
    //         ]),
    //     new Recipe(
    //         'Vegetable Quiche',
    //         'A delicious vegetable quiche',
    //         'https://cdn.pixabay.com/photo/2017/12/10/14/47/pizza-3010062_960_720.jpg',
    //         [
    //             new Ingredient('Eggs', 4),
    //             new Ingredient('Green Pepper', 1),
    //             new Ingredient('Red Pepper', 1)
    //         ]),
    // ];

    private recipes: Recipe[] = [];
    
    constructor(private slService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}