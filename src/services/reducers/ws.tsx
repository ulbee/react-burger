import { WS_STATUS_OFFLINE, WS_STATUS_CONNECTING, WS_STATUS_ONLINE, WS_MESSAGE } from '../../utils/constants';
import { wsClose, wsConnecting, wsError, wsOpen } from '../actions/ws';
import { createReducer } from '@reduxjs/toolkit';
import { TWSMessage, IWSMessageAction, IWSErrorAction } from '../types/ws';
import { TFeedData } from '../types/order';

export type TWSState = {
  status: typeof WS_STATUS_ONLINE | typeof WS_STATUS_CONNECTING | typeof WS_STATUS_OFFLINE;
  feed?: TFeedData | TWSMessage | undefined;
  connectionError: string;
};

const initialWSState: TWSState = {
  status: WS_STATUS_OFFLINE,
  connectionError: '',
  feed: undefined
}

export const wsReducer = createReducer(initialWSState, (builder) => {

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
      let error = '';
      if (typeof action.payload !== 'string' && typeof action.payload !== 'undefined') {
        if (!action.payload.success) {
          error = action.payload.message;
        }
      }

      state.connectionError = error;
    })
    .addCase(WS_MESSAGE, (state: TWSState, action: IWSMessageAction) => {
      let feed = undefined;
      if (typeof action.payload !== 'string') {
        feed = action.payload;
      }
      state.feed = feed;
    })
})
