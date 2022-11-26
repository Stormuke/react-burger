import type { FC } from 'react';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { AuthStore, CabinetStore } from 'services';
import { useCreateSliceActions } from 'utils/useCreateSliceActions';
import { useAppDispatch, useAppSelector } from 'services/rootReducer';
import { Redirect, useHistory, useRouteMatch } from 'react-router-dom';
import { useCallback, useEffect, useMemo } from 'react';
import type { Navigation } from 'types/types';
import { AuthAndResetNavigation } from 'components/AuthAndResetNavigation/AuthAndResetNavigation';
import { unwrapResult } from '@reduxjs/toolkit';
import { Loader } from 'utils/ui/Loader/Loader';
import { getCookie, setCookie } from 'utils/cookie';

import styles from './styles.module.scss';

const register: Navigation[] = [
  {
    title: 'Уже зарегистрированы?',
    link: '/login',
    linkText: 'Войти',
    key: '1',
  },
];

const login: Navigation[] = [
  {
    title: 'Вы — новый пользователь?',
    link: '/register',
    linkText: 'Зарегистрироваться',
    key: '1',
  },
  {
    title: 'Забыли пароль?',
    link: '/forgot-password',
    linkText: 'Восстановить пароль',
    key: '2',
  },
];

const forgotAndReset: Navigation[] = [
  { title: 'Вспомнили пароль?', link: '/login', linkText: 'Войти', key: '3' },
];

const Auth: FC = () => {
  const { url } = useRouteMatch();

  const accessToken = getCookie('accessToken');
  const history = useHistory();

  const dispatch = useAppDispatch();

  const { form, isPending } = useAppSelector(AuthStore.allAuthSelector);

  const { handleInput, reset } = useCreateSliceActions(AuthStore.slice.actions);

  const { handleInputsData } = useCreateSliceActions(
    CabinetStore.slice.actions,
  );

  const formInputs = useMemo(
    () =>
      url === '/register' || url === '/login'
        ? form.slice(url === '/register' ? 0 : 1, form.length - 1)
        : url === '/forgot-password'
        ? [form[1]]
        : url === '/reset-password'
        ? form.slice(2, form.length)
        : [],
    [form, url],
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const values = form.reduce((obj, item) => {
        if (item.value !== '') {
          return { ...obj, [item.name]: item.value };
        }
        return obj;
      }, {});

      const res = await dispatch(
        AuthStore.postAuthFormThunk({
          endpoint:
            url === '/forgot-password'
              ? 'password-reset'
              : url === '/reset-password'
              ? 'password-reset/reset'
              : `auth${url}`,
          body: values,
        }),
      );

      const data = unwrapResult(res);

      if (data.success) {
        if (url === '/login') {
          history.replace('/');
          setCookie('accessToken', data.accessToken.split(' ')[1]);
          setCookie('refreshToken', data.refreshToken);
          handleInputsData(data.user);
        }
        if (url === '/register') {
          history.replace('/login');
        }
        if (url === '/forgot-password') {
          history.replace('/reset-password');
        }
      }
    },
    [form, url], // eslint-disable-line
  );

  useEffect(() => {
    reset();
    // дизейбл линтера, зависимость ресет не нужна
    // eslint-disable-next-line
  }, [url]);

  return accessToken ? (
    <Redirect to="/" />
  ) : (
    <section className={styles.page}>
      {isPending ? (
        <Loader />
      ) : (
        <form className={styles.pageForm} onSubmit={handleSubmit}>
          <p className="text text_type_main-large">
            {{ '/register': 'Регистрация', '/login': 'Вход' }[url as string] ??
              'Восстановление пароля'}
          </p>
          {formInputs.map((item) =>
            item.type === 'password' ? (
              <PasswordInput
                key={item.key}
                name={item.name}
                value={item.value}
                onChange={(e) =>
                  handleInput({ key: item.key, value: e.target.value })
                }
              />
            ) : (
              <Input
                type={item.type}
                key={item.key}
                name={item.name}
                value={item.value}
                onChange={(e) =>
                  handleInput({ key: item.key, value: e.target.value })
                }
                placeholder={item.placeholder}
              />
            ),
          )}

          <Button
            htmlType="submit"
            disabled={formInputs.some((i) => i.value === '')}
          >
            {{
              '/register': 'Зарегистрироваться',
              '/login': 'Войти',
              '/forgot-password': 'Восстановить',
            }[url as string] ?? 'Сохранить'}
          </Button>
          {AuthAndResetNavigation(
            { '/register': register, '/login': login }[url as string] ??
              forgotAndReset,
          )}
        </form>
      )}
    </section>
  );
};

export default Auth;
