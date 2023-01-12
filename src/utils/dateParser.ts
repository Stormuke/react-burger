import moment from 'moment';

export const dateParser = (date: string): string => {
  const orderDate = moment(date).locale('ru');

  return `${orderDate.fromNow()}, ${orderDate.format('LTS')}, i-GMT+3`;
};
