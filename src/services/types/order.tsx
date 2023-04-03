export type TOrder = {
  _id: string;
  status: 'created' | 'done' | 'progress' | 'cancelled';
  name: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  number: number;
  ingredients: Array<string>
}

export type TFeedData = {
  success: boolean;
  total: number;
  totalToday: number;
  orders: Array<TOrder>;
}

