import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { type ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from '@components/modal-overlay/modal-overlay';

import styles from './modal.module.css';

type TModalProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export const Modal = ({
  title,
  children,
  onClose,
}: TModalProps): React.JSX.Element | null => {
  const modalRoot = document.getElementById('react-modals');

  useEffect(() => {
    const handleEscClose = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscClose);

    return (): void => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [onClose]);

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <div className={styles.modal_wrapper}>
      <ModalOverlay onClick={onClose} />
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        onClick={(event): void => {
          event.stopPropagation();
        }}
      >
        <div className={styles.header}>
          <h2 className="text text_type_main-large">{title}</h2>
          <button
            className={styles.close_button}
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
          >
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
