import { TIngredient } from "./ingredientsTypes";
import { IWSMessage } from '../services/actions/ws';

export type TOrder = {
  _id: string;
  status: string;
  name: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  number: number;
  ingredients: Array<TIngredient>
}

export type TFeedData = {
  success: boolean;
  total: number;
  totalToday: number;
  orders: Array<TOrder>;
}

export type TWSState = {
  status: string;
  connectionError: string | IWSMessage;
  feed: TFeedData | {};
}
