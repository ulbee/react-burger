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


type TPayload = TWSMessage | TWSErrorMessage | string| undefined;

export interface IWSMessageAction {
  readonly type: typeof WS_MESSAGE;
  payload: TPayload;
}

export interface IWSErrorAction {
  readonly type: typeof WS_ERROR;
  payload: TPayload;
}

interface IWSOpenAction {
  readonly type: typeof WS_OPEN;
  payload: TPayload;
}

interface IWSCloseAction {
  readonly type: typeof WS_CLOSE;
  payload: TPayload;
}

interface IWSConnectingAction {
  readonly type: typeof WS_CONNECTING;
  payload: TPayload;
}

export interface IWSConnectAction {
  readonly type: typeof WS_CONNECT;
  payload: TPayload;
}

interface IWSDisconnectAction {
  readonly type: typeof WS_DISCONNECT;
  payload: TPayload;
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
