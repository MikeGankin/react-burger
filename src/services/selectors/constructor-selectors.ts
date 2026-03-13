import { createSelector } from '@reduxjs/toolkit';

import type { TConstructorIngredient } from '@services/slices/constructor-slice';
import type { RootState } from '@services/store';
import type { TIngredient } from '@utils/types';

type TIngredientsCounters = Record<string, number>;
type TBurgerConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const selectBurgerConstructorState = (state: RootState): TBurgerConstructorState =>
  state.burgerConstructor;

export const selectConstructorIngredients = createSelector(
  [selectBurgerConstructorState],
  (burgerConstructor) => burgerConstructor.ingredients
);

export const selectConstructorBun = createSelector(
  [selectBurgerConstructorState],
  (burgerConstructor) => burgerConstructor.bun
);

export const selectIngredientsCounters = createSelector(
  [selectConstructorBun, selectConstructorIngredients],
  (bun, ingredients): TIngredientsCounters => {
    const counters: TIngredientsCounters = {};

    if (bun) {
      counters[bun._id] = 2;
    }

    ingredients.forEach((ingredient) => {
      counters[ingredient._id] = (counters[ingredient._id] ?? 0) + 1;
    });

    return counters;
  }
);

export const selectTotalPrice = createSelector(
  [selectConstructorBun, selectConstructorIngredients],
  (bun, ingredients) => {
    const ingredientsTotal = ingredients.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0
    );
    const bunsTotal = bun ? bun.price * 2 : 0;

    return ingredientsTotal + bunsTotal;
  }
);
