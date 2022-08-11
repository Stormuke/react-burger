import { FC } from 'react';
import { ModalOverlayProps } from '../../types/types';

import styles from './styles.module.scss'

export const ModalOverlay: FC<ModalOverlayProps> = ({
  onClose
}) => (<div className={styles.backdrop}  onClick={onClose}/>)
