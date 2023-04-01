export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v?: number;
};

export type TIngredientsByType = {
  [name: string]: Array<TIngredient>;
}

export type TIngredientsById = {
  [name: string] : TIngredient;
}