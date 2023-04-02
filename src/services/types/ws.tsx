import { 
  WS_MESSAGE, 
  WS_CONNECT, 
  WS_DISCONNECT,
  WS_CONNECTING,
  WS_OPEN,
  WS_CLOSE,
  WS_ERROR
} from '../../utils/constants';
import { TOrder } from './order';

export type TWSErrorMessage = {
  success: false;
  message: string;
}
export type TWSMessage = {
  success: true;  
  orders: Array<TOrder>;
} | TWSErrorMessage;

interface IWSMessageAction {
  readonly type: typeof WS_MESSAGE;
  payload: TWSMessage;
}

export interface IWSErrorAction {
  readonly type: typeof WS_ERROR;
  payload: TWSErrorMessage;
}

interface IWSOpenAction {
  readonly type: typeof WS_OPEN;
  payload: TWSMessage;
}

interface IWSCloseAction {
  readonly type: typeof WS_CLOSE;
  payload: TWSMessage;
}

interface IWSConnectingAction {
  readonly type: typeof WS_CONNECTING;
  payload: TWSMessage;
}

interface IWSConnectAction {
  readonly type: typeof WS_CONNECT;
  payload: TWSMessage;
}

interface IWSDisconnectAction {
  readonly type: typeof WS_DISCONNECT;
  payload: TWSMessage;
}

export const wsMessageAction = (payload: TWSMessage): IWSMessageAction => ({
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
