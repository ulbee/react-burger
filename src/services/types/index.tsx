import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import { TIngredientsAction } from '../types/ingredients';
import { TUserActions } from './user';
import { TWSAction } from '../types/ws';

export type TRootState = ReturnType<typeof store.getState>

// Типизация всех экшенов приложения
type TApplicationActions = TIngredientsAction | TUserActions | TWSAction;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, TRootState, TApplicationActions>
>;