import { FC, SyntheticEvent, useState } from 'react';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Form } from '../../types/types';

import styles from './styles.module.scss'

interface CabinetUserFormProps {
  handleInput: (body: { name: string; value: string }) => void;
  handleReset: (e: SyntheticEvent) => void;
  handleSubmit: (e: SyntheticEvent) => void;
  inputsArr: Form[];
  isChanged: boolean;
}

const disabledInitial = {
  name: true,
  email: true,
  password: true,
};

export const CabinetUserForm: FC<CabinetUserFormProps> = ({
  inputsArr,
  handleInput,
  handleSubmit,
  isChanged,
  handleReset,
}) => {
  const [disabled, setDisabled] =
    useState<Record<keyof typeof disabledInitial, boolean>>(disabledInitial);

  return (
    <form onSubmit={handleSubmit} onReset={handleReset} className={styles.form}>
      {inputsArr.map((item) => (
        <Input
          type={item.type}
          name={item.name}
          key={item.key}
          value={item.value ?? ''}
          disabled={disabled[item.name]}
          onIconClick={() =>
            setDisabled((prev) => ({
              ...prev,
              [item.name]: !disabled[item.name],
            }))
          }
          onChange={(e) =>
            handleInput({ name: item.name, value: e.target.value })
          }
          icon="EditIcon"
          placeholder={item.placeholder}
        />
      ))}
      {isChanged && (
        <div className={styles.formButtons}>
          <Button htmlType="submit">Сохранить</Button>
          <Button htmlType="reset" >Отмена</Button>
        </div>
      )}
    </form>
  );
};
