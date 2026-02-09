import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useMemo } from 'react';

import { ConstructorCard } from '@components/constructor-card/constructor-card';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
  onOrderClick?: () => void;
};

export const BurgerConstructor = ({
  ingredients,
  onOrderClick,
}: TBurgerConstructorProps): React.JSX.Element => {
  const bun = useMemo<TIngredient | null>(
    () => ingredients.find((ingredient) => ingredient.type === 'bun') ?? null,
    [ingredients]
  );
  const constructorItems = useMemo<TIngredient[]>(
    () => ingredients.filter((ingredient) => ingredient.type === 'main'),
    [ingredients]
  );
  const totalPrice = useMemo<number>(() => {
    const ingredientsTotal = constructorItems.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0
    );
    const bunsTotal = bun ? bun.price * 2 : 0;

    return ingredientsTotal + bunsTotal;
  }, [bun, constructorItems]);
  const handleOrderButtonClick = useCallback((): void => {
    onOrderClick?.();
  }, [onOrderClick]);

  return (
    <section className={styles.burger_constructor}>
      {bun && (
        <div className={`${styles.constructor_element} ml-8`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      <ul className={`${styles.constructor_list} custom-scroll`}>
        {constructorItems.map((ingredient) => (
          <li key={ingredient._id} className={styles.constructor_item}>
            <ConstructorCard ingredient={ingredient} />
          </li>
        ))}
      </ul>
      {bun && (
        <div className={styles.constructor_element}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
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
