import type { FC } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from 'components/ModalOverlay/ModalOverlay';
import { useCallback, useEffect } from 'react';
import { ModalProps } from '../../types/types';

import styles from './styles.module.scss';

const popupRoot = document.getElementById('popup-root');

export const Modal: FC<ModalProps> = ({
  isOpened,
  onClose,
  children,
  title,
}) => {
  const handleEscClose = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose, false);

    return () => document.removeEventListener('keydown', handleEscClose, false);
    // Отключил линтер, колбеки не нужны в зависимостях
    // eslint-disable-next-line
  }, []);

  return createPortal(
    isOpened && (
      <div className={styles.popup}>
        <div className={styles.container}>
          <div className={styles.containerHeader}>
            <p className="text text_type_main-large">{title}</p>
            <button className={styles.containerHeaderButton} onClick={onClose}>
              <CloseIcon type="primary" />
            </button>
          </div>
          {children}
        </div>
        <ModalOverlay onClose={onClose} />
      </div>
    ),
    // eslint-disable-next-line
    popupRoot!,
  );
};
