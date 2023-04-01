import { WS_STATUS, WS_MESSAGE } from '../../utils/constants';
import { wsClose, wsConnecting, wsError, wsOpen, TWSAction } from '../actions/ws';
import { createReducer } from '@reduxjs/toolkit';
import { IWSMessage } from '../actions/ws';
import { TFeedData } from '../types/order';

export type TWSState = {
  status: string;
  connectionError: string | IWSMessage;
  feed: TFeedData | {};
}

const initialWSState: TWSState = {
  status: WS_STATUS.OFFLINE,
  connectionError: '',
  feed: {}
}

export const wsReducer = createReducer(initialWSState, (builder: any) => {

  builder
  .addCase(wsConnecting, (state: TWSState) => {
    state.status = WS_STATUS.CONNECTING
  })
  .addCase(wsOpen, (state: TWSState) => {
    state.status = WS_STATUS.ONLINE;
    state.connectionError = ''
  })
  .addCase(wsClose, (state: TWSState) => {
    state.status = WS_STATUS.OFFLINE;
    state.connectionError = ''
  })
  .addCase(wsError, (state: TWSState, action: TWSAction) => {
    state.connectionError = action.payload
  })
  .addCase(WS_MESSAGE, (state: TWSState, action: TWSAction) => {
    state.feed = action.payload;
  })
})
