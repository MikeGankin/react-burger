import { useCallback, useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';
import { getIngredients } from '@utils/api';

import type { TIngredient } from '@utils/types';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<TIngredient | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadIngredients = async (): Promise<void> => {
      setIsLoading(true);
      setError(null);
      const data = await getIngredients();
      setIngredients(data);
      setIsLoading(false);
    };

    loadIngredients().catch((errorData: unknown) => {
      setError(
        errorData instanceof Error ? errorData.message : 'Ошибка загрузки ингредиентов'
      );
      setIsLoading(false);
    });
  }, []);

  const handleCloseModal = useCallback((): void => {
    setSelectedIngredient(null);
    setIsOrderModalOpen(false);
  }, []);

  const handleIngredientClick = useCallback((ingredient: TIngredient): void => {
    setSelectedIngredient(ingredient);
  }, []);

  const handleOrderClick = useCallback((): void => {
    setIsOrderModalOpen(true);
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        {isLoading && <p className="text text_type_main-default">Загрузка...</p>}
        {error && <p className="text text_type_main-default">Ошибка: {error}</p>}
        {!isLoading && !error && (
          <>
            <BurgerIngredients
              ingredients={ingredients}
              onIngredientClick={handleIngredientClick}
            />
            <BurgerConstructor
              ingredients={ingredients}
              onOrderClick={handleOrderClick}
            />
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
