import { BurgerIngredientsData, ParsedOrderDetails } from 'types/types';


/**
 * На основе массива айдишников строит готовый объект с финальной ценой, количеством ингредиентов, их названием и ценой каждого.
 *
 * @param currentOrderIngredientIds массив айди ингридентов в конкретном заказе.
 * @param ingredients массив ингредиентов получаемых при начальной загрузке приложения.
 *
 * @return - {totalPrice, array}
 */
export const orderDetailsParser = (
  currentOrderIngredientIds: string[],
  ingredients: BurgerIngredientsData[],
): ParsedOrderDetails =>
  currentOrderIngredientIds.reduce(
    (acc, item) => {
      const ingredientIndex = ingredients.findIndex((i) => i._id === item);

      const currentIngredient: BurgerIngredientsData =
        ingredients[ingredientIndex];

      const newIngredient = {
        name: currentIngredient.name,
        id: currentIngredient._id,
        count: currentIngredient.type === 'bun' ? 2 : 1,
        image: currentIngredient.image,
        price: currentIngredient.price,
      };

      if (acc.array.some((i) => item === i.id)) {
        const itemIndex = acc.array.findIndex((i) => i.id === item);
        if (currentIngredient.type !== 'bun') {
          acc.array[itemIndex].count += 1;
        } else {
          acc.array[itemIndex].count = 2;
        }
      } else {
        acc.array.push(newIngredient);
      }

      const totalPrice = acc.array
        .map((ingredient) => ingredient.price * ingredient.count)
        .reduce((total, price) => total + price, 0);

      return {
        array: acc.array,
        totalPrice,
      };
    },
    { array: [], totalPrice: 0 } as ParsedOrderDetails,
  );
