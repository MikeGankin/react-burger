import { useCallback, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';
import { useGetIngredientsQuery } from '@services/burger-api';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import {
  clearSelectedIngredient,
  setSelectedIngredient,
} from '@services/slices/ingredient-details-slice';

import type { TIngredient } from '@utils/types';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { ingredient: selectedIngredient } = useAppSelector(
    (state) => state.ingredientDetails
  );
  const { data: ingredients = [], error, isLoading } = useGetIngredientsQuery();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);

  const handleCloseModal = useCallback((): void => {
    dispatch(clearSelectedIngredient());
    setIsOrderModalOpen(false);
  }, [dispatch]);

  const handleIngredientClick = useCallback(
    (ingredient: TIngredient): void => {
      dispatch(setSelectedIngredient(ingredient));
    },
    [dispatch]
  );

  const handleOrderClick = useCallback((): void => {
    setIsOrderModalOpen(true);
  }, []);

  const errorMessage =
    error && 'status' in error ? 'Не удалось загрузить ингредиенты' : null;

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        {isLoading && <p className="text text_type_main-default">Загрузка...</p>}
        {errorMessage && (
          <p className="text text_type_main-default">Ошибка: {errorMessage}</p>
        )}
        {!isLoading && !errorMessage && (
          <>
            <BurgerIngredients
              ingredients={ingredients}
              onIngredientClick={handleIngredientClick}
            />
            <BurgerConstructor onOrderClick={handleOrderClick} />
          </>
        )}
      </main>
      {selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={handleCloseModal}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
      {isOrderModalOpen && (
        <Modal title="Детали заказа" onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default App;
