import type { FC } from 'react';
import type { Form, Navigation } from 'types/types';
import { CabinetNavigation } from 'components/CabinetNavigation/CabinetNavigation';
import { CabinetStore } from 'services';
import { useAppSelector } from 'services/rootReducer';
import { useCreateSliceActions } from 'utils/useCreateSliceActions';
import { deleteCookie } from 'utils/cookie';
import { CabinetUserForm } from 'components/CabinetUserForm/CabinetUserForm';

import styles from './styles.module.scss';

const cabinetButtons: Navigation[] = [
  { title: 'Профиль', key: '1', link: '/profile', linkText: '' },
  { title: 'История заказов', key: '2', link: '/profile/orders', linkText: '' },
  {
    title: 'Выход',
    key: '3',
    link: '/',
    linkText: '',
    onClick: () => deleteCookie('accessToken'),
  },
];

const Cabinet: FC = ({ children }) => {
  const { inputs } = useAppSelector(CabinetStore.allCabinetSelector);

  const { handleInputValue } = useCreateSliceActions(
    CabinetStore.slice.actions,
  );

  const cabinetInputs: Form[] = [
    {
      name: 'name',
      value: inputs.name,
      type: 'text',
      key: '1',
      placeholder: 'Имя',
    },
    {
      name: 'email',
      value: inputs.email,
      type: 'email',
      key: '2',
      placeholder: 'Логин',
    },
    {
      name: 'password',
      value: '12345678',
      type: 'password',
      key: '3',
      placeholder: 'Пароль',
    },
  ];

  return (
    <section className={styles.cabinet}>
      <div className={styles.cabinetNavigation}>
        {CabinetNavigation({ navigation: cabinetButtons })}
      </div>
      <div className={styles.cabinetInfo}>
        {children ?? (
          <CabinetUserForm
            inputsArr={cabinetInputs}
            handleInput={handleInputValue}
          />
        )}
      </div>
    </section>
  );
};

export default Cabinet;
