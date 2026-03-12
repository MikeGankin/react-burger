import { combineReducers } from '@reduxjs/toolkit';

import { burgerApi } from '@services/burger-api';
import { constructorReducer } from '@services/slices/constructor-slice';
import { ingredientDetailsReducer } from '@services/slices/ingredient-details-slice';

export const rootReducer = combineReducers({
  constructor: constructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  [burgerApi.reducerPath]: burgerApi.reducer,
});
