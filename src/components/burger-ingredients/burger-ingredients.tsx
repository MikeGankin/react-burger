import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useCallback, useMemo, useRef, useState, type RefObject } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
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

  const updateCurrentTab = useCallback((): void => {
    if (!containerRef.current) {
      return;
    }

    const containerTop = containerRef.current.getBoundingClientRect().top;
    const sections: { ref: RefObject<HTMLHeadingElement | null>; tab: TTab }[] = [
      { ref: bunsRef, tab: 'bun' },
      { ref: mainsRef, tab: 'main' },
      { ref: saucesRef, tab: 'sauce' },
    ];

    const closestSection = sections.reduce(
      (closest, section) => {
        const sectionTop = section.ref.current?.getBoundingClientRect().top ?? 0;
        const distance = Math.abs(sectionTop - containerTop);

        if (distance < closest.distance) {
          return {
            distance,
            tab: section.tab,
          };
        }

        return closest;
      },
      {
        distance: Number.POSITIVE_INFINITY,
        tab: 'bun' as TTab,
      }
    );

    setCurrentTab(closestSection.tab);
  }, []);

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
      <div
        ref={containerRef}
        className={clsx(styles.container, 'custom-scroll')}
        onScroll={updateCurrentTab}
      >
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
