import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useCallback } from 'react';
import { useDrag } from 'react-dnd';

import { DND_INGREDIENT_TYPE } from '@utils/constants';

import type { TIngredient } from '@utils/types';

import styles from './ingredient-card.module.css';

type TIngredientCardProps = {
  ingredient: TIngredient;
  onClick?: (ingredient: TIngredient) => void;
};

export const IngredientCard = ({
  ingredient,
  onClick,
}: TIngredientCardProps): React.JSX.Element => {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: DND_INGREDIENT_TYPE,
      item: ingredient,
      collect: (monitor): { isDragging: boolean } => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [ingredient]
  );

  const handleIngredientClick = useCallback((): void => {
    onClick?.(ingredient);
  }, [ingredient, onClick]);

  return (
    <article
      ref={dragRef}
      className={clsx(styles.ingredient_card, isDragging && styles.dragging)}
      onClick={handleIngredientClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          handleIngredientClick();
        }
      }}
    >
      <Counter extraClass="" count={1} size="default" />
      <div className="visual">
        <img src={ingredient.image_large} alt={ingredient.name} />
      </div>
      <div className={styles.info}>
        <span className="text text_type_digits-default">{ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={clsx(styles.ingredient_name, 'text text_type_main-default')}>
        {ingredient.name}
      </h3>
    </article>
  );
};
