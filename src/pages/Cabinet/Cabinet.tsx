import type { FC, SyntheticEvent } from 'react';
import type { Form, Navigation } from 'types/types';
import { CabinetNavigation } from 'components/CabinetNavigation/CabinetNavigation';
import { AuthStore, CabinetStore } from 'services';
import { useAppDispatch, useAppSelector } from 'services/rootReducer';
import { useCreateSliceActions } from 'utils/useCreateSliceActions';
import { deleteCookie, getCookie } from 'utils/cookie';
import { CabinetUserForm } from 'components/CabinetUserForm/CabinetUserForm';
import { useCallback, useEffect, useState } from 'react';
import { isFulfilled, isRejected } from '@reduxjs/toolkit';
import { Spinner } from 'utils/ui/Spinner/Spinner';

import styles from './styles.module.scss';

const cabinetButtons: Navigation[] = [
  { title: 'Профиль', key: '1', link: '/profile', linkText: '' },
  { title: 'История заказов', key: '2', link: '/profile/orders', linkText: '' },
  {
    title: 'Выход',
    key: '3',
    link: '/',
    linkText: '',
    onClick: () => {
      localStorage.clear();
      deleteCookie('refreshToken');
      deleteCookie('accessToken');
    },
  },
];

const Cabinet: FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');

  const [isChanged, setIsChanged] = useState(false);

  const cabinet = useAppSelector(CabinetStore.cabinetSelector);

  const { handleInputValue, resetForm } = useCreateSliceActions(
    CabinetStore.slice.actions,
  );

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      const res = await dispatch(
        CabinetStore.patchUserDataThunk({
          url: 'auth/user',
          cookie: accessToken as string,
          body: {
            ...cabinet.form,
            password:
              cabinet.form.password === '' ? undefined : cabinet.form.password,
          },
        }),
      );

      if (isRejected(res)) {
        const refresh = await dispatch(
          AuthStore.postAuthFormThunk({
            endpoint: 'auth/token',
            body: { token: refreshToken as string },
          }),
        );

        if (isFulfilled(refresh)) {
          dispatch(
            CabinetStore.patchUserDataThunk({
              url: 'auth/user',
              cookie: accessToken as string,
              body: {
                ...cabinet.form,
                password:
                  cabinet.form.password === ''
                    ? undefined
                    : cabinet.form.password,
              },
            }),
          );
        }
      }
    },
    [accessToken, refreshToken, cabinet, dispatch],
  );

  const handleReset = (e: SyntheticEvent): void => {
    e.preventDefault();
    resetForm();
  };

  const cabinetInputs: Form[] = [
    {
      name: 'name',
      value: cabinet.form.name,
      type: 'text',
      key: '1',
      placeholder: 'Имя',
    },
    {
      name: 'email',
      value: cabinet.form.email,
      type: 'email',
      key: '2',
      placeholder: 'Логин',
    },
    {
      name: 'password',
      value: cabinet.form.password,
      type: 'password',
      key: '3',
      placeholder: 'Пароль',
    },
  ];

  useEffect(
    () =>
      setIsChanged(
        cabinet.form.name !== cabinet.inputs.name ||
          cabinet.form.email !== cabinet.inputs.email ||
          cabinet.form.password !== cabinet.inputs.password,
      ),
    [cabinet.form, cabinet.inputs],
  );

  return (
    <section className={styles.cabinet}>
      <div className={styles.cabinetNavigation}>
        {CabinetNavigation({ navigation: cabinetButtons })}
      </div>
      <div className={styles.cabinetInfo}>
        {children ??
          (cabinet.isPending ? (
            <Spinner />
          ) : (
            <CabinetUserForm
              inputsArr={cabinetInputs}
              handleInput={handleInputValue}
              handleSubmit={handleSubmit}
              isChanged={isChanged}
              handleReset={handleReset}
            />
          ))}
      </div>
    </section>
  );
};

export default Cabinet;
