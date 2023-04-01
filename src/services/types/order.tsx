import { TIngredient } from "./ingredients";
import { IWSMessage } from '../actions/ws';

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

