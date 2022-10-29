import { GETINGREDIENTSURL, SAVEORDERURL } from "./constants";

const getIngredients = async () => {
  const data = await fetch(GETINGREDIENTSURL);

  if (!data.ok) {
    throw new Error('Произошла ошибка: ' + data.status);
  }
  return await data.json();
}

const sendOrder = async (ingredientIds) => {
  const res = await fetch(SAVEORDERURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      ingredients: ingredientIds
    })
  });

  if (!res.ok) {
    throw new Error('Произошла ошибка: ' + res.status);
  }

  return await res.json();
}

export { getIngredients, sendOrder };
