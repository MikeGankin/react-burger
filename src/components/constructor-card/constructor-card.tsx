import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@utils/types';

import styles from './constructor-card.module.css';

type TBurgerConstructorCardProps = {
  ingredient: TIngredient;
};

export const ConstructorCard = ({
  ingredient,
}: TBurgerConstructorCardProps): React.JSX.Element => {
  const handleClose = (): void => {
    /* remove logic will be added in next sprint */
  };

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
