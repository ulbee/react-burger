import { WS_STATUS_OFFLINE, WS_STATUS_CONNECTING, WS_STATUS_ONLINE, WS_MESSAGE } from '../../utils/constants';
import { wsClose, wsConnecting, wsError, wsOpen } from '../actions/ws';
import { createReducer } from '@reduxjs/toolkit';
import { TWSMessage, IWSMessageAction, IWSErrorAction } from '../types/ws';
import { TFeedData } from '../types/order';

type TWSStateOffline = {
  status: typeof WS_STATUS_OFFLINE; 
  connectionError: string;
};
type TWSStateConnecting = {
  status: typeof WS_STATUS_CONNECTING;
  connectionError: string | TWSMessage;
};
type TWSStateOnline = {
  status: typeof WS_STATUS_ONLINE;
  feed: TFeedData | TWSMessage;
  connectionError: string;
};

export type TWSState = TWSStateOffline | TWSStateConnecting | TWSStateOnline;

const initialWSState: TWSState = {
  status: WS_STATUS_OFFLINE,
  connectionError: ''
}

export const wsReducer = createReducer(initialWSState as TWSState, (builder: any) => {

  builder
    .addCase(wsConnecting, (state: TWSState) => {
      state.status = WS_STATUS_CONNECTING
    })
    .addCase(wsOpen, (state: TWSState) => {
      state.status = WS_STATUS_ONLINE;
      state.connectionError = ''
    })
    .addCase(wsClose, (state: TWSState) => {
      state.status = WS_STATUS_OFFLINE;
      state.connectionError = ''
    })
    .addCase(wsError, (state: TWSState, action: IWSErrorAction) => {
      state.connectionError = action.payload.success ? '' : action.payload.message;
    })
    .addCase(WS_MESSAGE, (state: TWSStateOnline, action: IWSMessageAction) => {
      state.feed = action.payload;
    })
})
