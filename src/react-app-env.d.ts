/// <reference types="react-scripts" />

declare type Callback = () => void;

declare type TitleAndKey = { title: string; key: string | number };

declare type AppError =
  | string
  | import('@reduxjs/toolkit').SerializedError
  | null;

declare type Endpoint = string;

declare type ParseActions<T> = {
  [Property in keyof T]: Parameters<T[Property]>[0] extends undefined
    ? Callback
    : (payload: Parameters<T[Property]>[0]) => void;
};
