import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback } from 'react';

import type { TIngredient } from '@utils/types';

import styles from './constructor-card.module.css';

type TBurgerConstructorCardProps = {
  ingredient: TIngredient;
  onRemove: () => void;
};

export const ConstructorCard = ({
  ingredient,
  onRemove,
}: TBurgerConstructorCardProps): React.JSX.Element => {
  const handleClose = useCallback((): void => {
    onRemove();
  }, [onRemove]);

  return (
    <article className={styles.constructorCard}>
      <div className={styles.dragIcon}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        handleClose={handleClose}
        price={ingredient.price}
        text={ingredient.name}
        thumbnail={ingredient.image}
      />
    </article>
  );
};
