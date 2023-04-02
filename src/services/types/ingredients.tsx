import { AppThunk } from './index';

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  SEND_ORDER_REQUEST,
  SEND_ORDER_FAILED,
  SEND_ORDER_SUCCESS,
  SHOW_INGREDIENT,
  HIDE_INGREDIENT,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  ADD_BUN,
  CHANGE_INGREDIENT_ORDER,
  SET_ACTIVE_TAB
} from '../../utils/constants';

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


// Типизация получения списка ингридиентов
interface IGetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

interface IGetCountriesSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredientsByType: TIngredientsByType;
  readonly ingredientsById: TIngredientsById;
}

export const getIngredientsAction = (): IGetIngredientsAction => ({
  type: GET_INGREDIENTS_REQUEST
});

export const getIngredientsSuccessAction = 
(ingredientsByType: TIngredientsByType, ingredientsById: TIngredientsById): IGetCountriesSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  ingredientsByType,
  ingredientsById
});

export const getIngredientsFailedAction = (): IGetIngredientsFailedAction => ({
  type: GET_INGREDIENTS_FAILED
});

// Типизация создания заказа
interface ISendOrderAction {
  readonly type: typeof SEND_ORDER_REQUEST;
}

interface ISendOrderFailedAction {
  readonly type: typeof SEND_ORDER_FAILED;
}

interface ISendOrderSuccessAction {
  readonly type: typeof SEND_ORDER_SUCCESS;
  readonly orderId: number;
}

export const sendOrderAction = (): ISendOrderAction => ({
  type: SEND_ORDER_REQUEST
});

export const sendOrderSuccessAction = (orderId: number): ISendOrderSuccessAction => ({
  type: SEND_ORDER_SUCCESS,
  orderId
});

export const sendOrderFailedAction = (): ISendOrderFailedAction => ({
  type: SEND_ORDER_FAILED
});

// Типизация других действий с ингридиентами
interface IShowIngredient {
  readonly type: typeof SHOW_INGREDIENT;
  id: string;
}

interface IHideIngredient {
  readonly type: typeof HIDE_INGREDIENT;
}

interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  id: string;
}

interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT;
  index: number;
}

interface IAddBun {
  readonly type: typeof ADD_BUN;
  id: string;
}

interface IChangeOrderIngredients {
  readonly type: typeof CHANGE_INGREDIENT_ORDER;
  prevIndex: number;
  newIndex: number;
}

interface ISetActiveTab {
  readonly type: typeof SET_ACTIVE_TAB;
  name: string;
}

export type TIngredientsAction = 
  IGetIngredientsAction
  | IGetCountriesSuccessAction
  | IGetIngredientsFailedAction
  | ISendOrderAction
  | ISendOrderSuccessAction
  | ISendOrderFailedAction
  | IShowIngredient
  | IHideIngredient
  | IAddIngredient
  | IDeleteIngredient
  | IAddBun
  | IChangeOrderIngredients
  | ISetActiveTab;
