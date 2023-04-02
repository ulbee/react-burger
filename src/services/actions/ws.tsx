import { AppDispatch, AppThunk } from '../types/index';
import { createAction } from '@reduxjs/toolkit';
import { refreshTokenRequest } from '../../utils/api';
import { setCookie, getCookie, getAccessToken } from '../../utils/cookie';
import { 
  GET_USER_ORDERS_URL, 
  WS_CONNECT, 
  WS_DISCONNECT,
  WS_CONNECTING,
  WS_OPEN,
  WS_CLOSE,
  WS_ERROR
} from '../../utils/constants';
import {
  TWSMessage,
  wsMessageAction
} from '../types/ws';

function withPayloadType<T>() {
  return (t: T) => ({ payload: t })
}
export const wsConnect = createAction(WS_CONNECT, withPayloadType<string>());
export const wsDisconnect = createAction(WS_DISCONNECT);
export const wsConnecting = createAction(WS_CONNECTING);
export const wsOpen = createAction(WS_OPEN);
export const wsClose = createAction(WS_CLOSE);
export const wsError = createAction(WS_ERROR);

export const wsMessage: AppThunk = (action: TWSMessage) => (dispatch: AppDispatch) => {
  dispatch(wsMessageAction(action));

  if (!action.success) {
    if (action.message === 'Invalid or missing token') {
      dispatch(wsDisconnect());
      refreshTokenRequest(getCookie('token'))
        .then((res) => {
          if (res && res.success) {              
            setCookie('accessToken', getAccessToken(res.accessToken));
            setCookie('token', res.refreshToken);

            dispatch(wsConnect(`${GET_USER_ORDERS_URL}?token=${getCookie('accessToken')}`));
          } else {
            throw new Error('Произошла ошибка ');
          }

        })
        .catch((err) => {
          console.log('error!', err);
        });
    }
  }
  
}
