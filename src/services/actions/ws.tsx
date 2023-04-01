import { createAction } from '@reduxjs/toolkit';
import { refreshTokenRequest } from '../../utils/api';
import { setCookie, getCookie, getAccessToken } from '../../utils/cookie';
import { 
  GET_USER_ORDERS_URL, 
  WS_MESSAGE, 
  WS_CONNECT, 
  WS_DISCONNECT,
  WS_CONNECTING,
  WS_OPEN,
  WS_CLOSE,
  WS_ERROR
} from '../../utils/constants';
import { TOrder } from '../types/order';

function withPayloadType<T>() {
  return (t: T) => ({ payload: t })
}
export const wsConnect = createAction(WS_CONNECT, withPayloadType<string>());
export const wsDisconnect = createAction(WS_DISCONNECT);
export const wsConnecting = createAction(WS_CONNECTING);
export const wsOpen = createAction(WS_OPEN);
export const wsClose = createAction(WS_CLOSE);
export const wsError = createAction(WS_ERROR);

export interface IWSMessage {
  success: boolean;
  message?: string;
  orders?: Array<TOrder>;
}

interface IWSMessageAction {
  readonly type: typeof WS_MESSAGE;
  payload: IWSMessage;
}

interface IWSErrorAction {
  readonly type: typeof WS_ERROR;
  payload: IWSMessage;
}

interface IWSOpenAction {
  readonly type: typeof WS_OPEN;
  payload: IWSMessage;
}

interface IWSCloseAction {
  readonly type: typeof WS_CLOSE;
  payload: IWSMessage;
}

interface IWSConnectingAction {
  readonly type: typeof WS_CONNECTING;
  payload: IWSMessage;
}

interface IWSConnectAction {
  readonly type: typeof WS_CONNECT;
  payload: IWSMessage;
}

interface IWSDisconnectAction {
  readonly type: typeof WS_DISCONNECT;
  payload: IWSMessage;
}

const wsMessageAction = (payload: IWSMessage): IWSMessageAction => ({
  type: WS_MESSAGE,
  payload
});

export type TWSAction = 
  IWSMessageAction
  | IWSErrorAction
  | IWSOpenAction
  | IWSCloseAction
  | IWSConnectingAction
  | IWSConnectAction
  | IWSDisconnectAction;

export const wsMessage = (action: IWSMessage) => (dispatch: any) => {

  dispatch(wsMessageAction(action));

  if (action.message === 'Invalid or missing token') {
    dispatch(wsDisconnect());
    refreshTokenRequest(getCookie('token'))
      .then((res) => {
        if (res && res.success) {              
          setCookie('accessToken', getAccessToken(res.accessToken));
          setCookie('token', res.refreshToken);

          dispatch(wsConnect(`${GET_USER_ORDERS_URL}?token=${getCookie('accessToken')}`));
        } else {
          throw new Error('Произошла ошибка ', res.message);
        }

      })
      .catch((err) => {
        console.log('error!', err);
      });
  }
}
