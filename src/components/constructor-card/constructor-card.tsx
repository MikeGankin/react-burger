import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useCallback, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { DND_CONSTRUCTOR_INGREDIENT_TYPE } from '@utils/constants';

import type { TConstructorIngredient } from '@services/slices/constructor-slice';

import styles from './constructor-card.module.css';

type TConstructorDragItem = {
  index: number;
};

type TBurgerConstructorCardProps = {
  ingredient: TConstructorIngredient;
  index: number;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  onRemove: () => void;
};

export const ConstructorCard = ({
  ingredient,
  index,
  onMove,
  onRemove,
}: TBurgerConstructorCardProps): React.JSX.Element => {
  const cardRef = useRef<HTMLElement>(null);
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: DND_CONSTRUCTOR_INGREDIENT_TYPE,
      item: { index },
      collect: (monitor): { isDragging: boolean } => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [index]
  );
  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: DND_CONSTRUCTOR_INGREDIENT_TYPE,
      drop: (draggedItem: TConstructorDragItem): void => {
        if (draggedItem.index === index) {
          return;
        }

        onMove(draggedItem.index, index);
      },
      collect: (monitor): { isOver: boolean } => ({
        isOver: monitor.isOver(),
      }),
    }),
    [index, onMove]
  );

  dragRef(dropRef(cardRef));

  const handleClose = useCallback((): void => {
    onRemove();
  }, [onRemove]);

  return (
    <article
      ref={cardRef}
      className={clsx(
        styles.constructorCard,
        isDragging && styles.dragging,
        isOver && styles.hovered
      )}
    >
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
