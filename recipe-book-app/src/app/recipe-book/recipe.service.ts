import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe-book.model";

@Injectable()
export class RecipeService {

    private recipes: Recipe[] = [
        new Recipe(
            'Lemon Pork Chops',
            'A great grilled pork chop with a hint of lemon',
            'https://cdn.pixabay.com/photo/2020/02/02/15/07/meat-4813261_960_720.jpg',
            [
                new Ingredient('Pork Chops', 4),
                new Ingredient('Lemons', 2)
            ]),
        new Recipe(
            'Vegetable Quiche',
            'A delicious vegetable quiche',
            'https://cdn.pixabay.com/photo/2017/12/10/14/47/pizza-3010062_960_720.jpg',
            [
                new Ingredient('Eggs', 4),
                new Ingredient('Green Pepper', 1),
                new Ingredient('Red Pepper', 1)
            ]),
    ];

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}