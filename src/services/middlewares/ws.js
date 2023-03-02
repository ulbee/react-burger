import { getCookie, setCookie, getAccessToken } from "../../utils/cookie";
import { refreshTokenRequest } from '../../utils/api';
import { GET_USER_ORDERS_URL } from '../../utils/constants';

export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null;
    let tryReconnect = false;
    let reconnectTimer = 0;
    let url = '';

    return next => action => {
      const { dispatch } = store;
      const { type } = action;
      const {wsConnect, wsDisconnect, wsConnecting, onOpen, onClose, onError, onMessage } = wsActions;
      // const token = getCookie('accessToken');

      if (type === 'WS_CONNECT') {
        console.log('action.payload', action);
        url = action.payload;
        socket = new WebSocket(`${url}`);
        tryReconnect = true;
        dispatch(wsConnecting());
      }


      if (socket) {
        socket.onopen = event => {
          console.log('socket.onopen', event);
          tryReconnect = true;
          dispatch(onOpen());
        };

        socket.onerror = event => {
          console.log('socket.onerror', event);
          dispatch(onError());
        };

        socket.onmessage = event => {
          console.log('socket.onmessage', event);
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(onMessage(parsedData));

          if (data.message === 'Invalid or missing token') {
            console.log('Invalid or missing token');
            refreshTokenRequest(getCookie('token'))
              .then((res) => {
                if (res && res.success) {
                  setCookie('accessToken', getAccessToken(res.accessToken));
                  setCookie('token', res.refreshToken);
    
                  dispatch(wsConnect(`${GET_USER_ORDERS_URL}?token=${getCookie('accessToken')}`));
                }
              });
          }
        };

        socket.onclose = event => {
          console.log('socket.onclose', event);
          if (event.code !== 1000) {
            console.log('socket.onclose', event);
            dispatch(onError(event.code.toString()))
          }

          dispatch(onClose(event.code.toString()));

          if (event.message === 'Invalid or missing token') {
            console.log('Invalid or missing token');
            refreshTokenRequest(getCookie('token'))
              .then((res) => {
                if (res && res.success) {
                  setCookie('accessToken', getAccessToken(res.accessToken));
                  setCookie('token', res.refreshToken);
    
                  dispatch(wsConnect(`${GET_USER_ORDERS_URL}?token=${getCookie('accessToken')}`));
                }
              });
          }

          if(tryReconnect){
            console.log('tryReconnect', tryReconnect);
            dispatch(wsConnecting());
            reconnectTimer = window.setTimeout(() => {
                dispatch(wsConnect(url))
            }, 3000)
          }
        };

        if (wsDisconnect.match(action)) {
          console.log('wsDisconnect');
          tryReconnect = false;
          clearTimeout(reconnectTimer);
          reconnectTimer = 0;

          socket.close(1000, 'Работа приложения закончена');
        }
       
      }

      next(action);
    };
  };
};