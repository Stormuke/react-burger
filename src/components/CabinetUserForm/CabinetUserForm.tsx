import { FC, useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Form } from '../../types/types';

interface CabinetUserFormProps {
  handleInput: (body: { name: string; value: string }) => void;
  inputsArr: Form[];
}

const disabledInitial = {
  name: true,
  email: true,
  password: true,
};

export const CabinetUserForm: FC<CabinetUserFormProps> = ({
  inputsArr,
  handleInput,
}) => {
  const [disabled, setDisabled] =
    useState<Record<keyof typeof disabledInitial, boolean>>(disabledInitial);

  return (
    <>
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
    </>
  );
};
