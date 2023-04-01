import { compose, createStore, applyMiddleware } from 'redux';
import { socketMiddleware } from './middlewares/ws';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { wsConnect, wsDisconnect, wsConnecting, wsOpen, wsClose, wsError, wsMessage } from './actions/ws';

const wsActions = {
  wsConnect,
  wsDisconnect,
  wsConnecting,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage
}

const composeEnhancers =
  typeof window === 'object' && (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
    ? (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));

export const store = createStore(rootReducer, enhancer);
