import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useCallback, useMemo, useRef, useState } from 'react';

import { IngredientCard } from '@components/ingredient-card/ingredient-card';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TTab = 'bun' | 'main' | 'sauce';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
  onIngredientClick?: (ingredient: TIngredient) => void;
};

export const BurgerIngredients = ({
  ingredients,
  onIngredientClick,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const [currentTab, setCurrentTab] = useState<TTab>('bun');
  const bunsRef = useRef<HTMLHeadingElement>(null);
  const mainsRef = useRef<HTMLHeadingElement>(null);
  const saucesRef = useRef<HTMLHeadingElement>(null);

  const buns = useMemo<TIngredient[]>(
    () => ingredients.filter((ingredient) => ingredient.type === 'bun'),
    [ingredients]
  );
  const mains = useMemo<TIngredient[]>(
    () => ingredients.filter((ingredient) => ingredient.type === 'main'),
    [ingredients]
  );
  const sauces = useMemo<TIngredient[]>(
    () => ingredients.filter((ingredient) => ingredient.type === 'sauce'),
    [ingredients]
  );

  const handleTabClick = useCallback((tab: string): void => {
    const selectedTab = tab as TTab;
    setCurrentTab(selectedTab);

    if (selectedTab === 'bun') {
      bunsRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (selectedTab === 'main') {
      mainsRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    saucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab value="bun" active={currentTab === 'bun'} onClick={handleTabClick}>
            Булки
          </Tab>
          <Tab value="main" active={currentTab === 'main'} onClick={handleTabClick}>
            Начинки
          </Tab>
          <Tab value="sauce" active={currentTab === 'sauce'} onClick={handleTabClick}>
            Соусы
          </Tab>
        </ul>
      </nav>
      <div className={clsx(styles.container, 'custom-scroll')}>
        <h2 ref={bunsRef} className="text text_type_main-medium mb-6">
          Булки
        </h2>
        <ul className={styles.ingredients_list}>
          {buns.map((ingredient) => (
            <li key={ingredient._id} className={styles.ingredients_item}>
              <IngredientCard ingredient={ingredient} onClick={onIngredientClick} />
            </li>
          ))}
        </ul>
        <h2 ref={mainsRef} className="text text_type_main-medium mb-6">
          Начинки
        </h2>
        <ul className={styles.ingredients_list}>
          {mains.map((ingredient) => (
            <li key={ingredient._id} className={styles.ingredients_item}>
              <IngredientCard ingredient={ingredient} onClick={onIngredientClick} />
            </li>
          ))}
        </ul>
        <h2 ref={saucesRef} className="text text_type_main-medium mb-6">
          Соусы
        </h2>
        <ul className={styles.ingredients_list}>
          {sauces.map((ingredient) => (
            <li key={ingredient._id} className={styles.ingredients_item}>
              <IngredientCard ingredient={ingredient} onClick={onIngredientClick} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
