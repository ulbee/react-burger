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
  payload: IWSMessage | undefined;
}

export const wsMessageAction = (payload: IWSMessage): IWSMessageAction => ({
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
