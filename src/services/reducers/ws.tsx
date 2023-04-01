import { WS_STATUS, WS_MESSAGE } from '../../utils/constants';
import { wsClose, wsConnecting, wsError, wsOpen } from '../actions/ws';
import { createReducer } from '@reduxjs/toolkit';
import { IWSMessage, TWSAction } from '../types/ws';
import { TFeedData } from '../types/order';

export type TWSState = {
  status: string;
  connectionError: string | undefined;
  feed: TFeedData | IWSMessage | undefined;
}

const initialWSState: TWSState = {
  status: WS_STATUS.OFFLINE,
  connectionError: '',
  feed: undefined
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
    state.connectionError = action.payload?.message
  })
  .addCase(WS_MESSAGE, (state: TWSState, action: TWSAction) => {
    state.feed = action.payload;
  })
})
