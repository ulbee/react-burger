import { WS_STATUS } from '../../utils/constants';
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from '../actions/ws';
import { createReducer } from '@reduxjs/toolkit';

const initialWSState = {
  status: WS_STATUS.OFFLINE,
  connectionError: '',
  feed: {}
}

export const wsReducer = createReducer(initialWSState, (builder) => {
  builder
  .addCase(wsConnecting, (state) => {
          state.status = WS_STATUS.CONNECTING
  })
  .addCase(wsOpen, (state) => {
      state.status = WS_STATUS.ONLINE;
      state.connectionError = ''
  })
  .addCase(wsClose, (state) => {
      state.status = WS_STATUS.OFFLINE;
      state.connectionError = ''
  })
  .addCase(wsError, (state, action) => {
      state.connectionError = action.payload
  })
  .addCase(wsMessage, (state, action) => {
      state.feed = action.payload;
  })
})
