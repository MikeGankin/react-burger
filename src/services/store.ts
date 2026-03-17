import { configureStore } from '@reduxjs/toolkit';

import { burgerApi } from '@services/burger-api';
import { rootReducer } from '@services/root-reducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(burgerApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
