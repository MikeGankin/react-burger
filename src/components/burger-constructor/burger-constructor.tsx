import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useCallback, useMemo } from 'react';
import { useDrop } from 'react-dnd';

import { ConstructorCard } from '@components/constructor-card/constructor-card';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import { addIngredient, removeIngredient } from '@services/slices/constructor-slice';
import { DND_INGREDIENT_TYPE } from '@utils/constants';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  onOrderClick?: () => void;
};

export const BurgerConstructor = ({
  onOrderClick,
}: TBurgerConstructorProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { bun, ingredients } = useAppSelector((state) => state.burgerConstructor);
  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: DND_INGREDIENT_TYPE,
      drop: (ingredient: TIngredient): void => {
        dispatch(addIngredient(ingredient));
      },
      collect: (monitor): { isOver: boolean } => ({
        isOver: monitor.isOver(),
      }),
    }),
    [dispatch]
  );

  const totalPrice = useMemo<number>(() => {
    const ingredientsTotal = ingredients.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0
    );
    const bunsTotal = bun ? bun.price * 2 : 0;

    return ingredientsTotal + bunsTotal;
  }, [bun, ingredients]);

  const handleOrderButtonClick = useCallback((): void => {
    onOrderClick?.();
  }, [onOrderClick]);

  const handleRemoveIngredient = useCallback(
    (uniqueId: string): void => {
      dispatch(removeIngredient(uniqueId));
    },
    [dispatch]
  );

  return (
    <section
      ref={dropRef}
      className={clsx(styles.burger_constructor, isOver && styles.drop_active)}
    >
      {bun ? (
        <div className={`${styles.constructor_element} ml-8`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      ) : (
        <div className={`${styles.empty_element} ml-8`}>
          <p className="text text_type_main-default text_color_inactive">
            Выберите булку
          </p>
        </div>
      )}
      <ul className={`${styles.constructor_list} custom-scroll`}>
        {ingredients.length > 0 ? (
          ingredients.map((ingredient) => (
            <li key={ingredient.uniqueId} className={styles.constructor_item}>
              <ConstructorCard
                ingredient={ingredient}
                onRemove={() => {
                  handleRemoveIngredient(ingredient.uniqueId);
                }}
              />
            </li>
          ))
        ) : (
          <li className={styles.constructor_item}>
            <div className={styles.empty_list}>
              <p className="text text_type_main-default text_color_inactive">
                Перетащите сюда ингредиенты
              </p>
            </div>
          </li>
        )}
      </ul>
      {bun ? (
        <div className={styles.constructor_element}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      ) : (
        <div className={styles.empty_element}>
          <p className="text text_type_main-default text_color_inactive">
            Выберите булку
          </p>
        </div>
      )}
      <div className={`${styles.total} mt-10`}>
        <span className="text text_type_digits-medium mr-2">{totalPrice}</span>
        <CurrencyIcon type="primary" />
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass="ml-10"
          onClick={handleOrderButtonClick}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};
