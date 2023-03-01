// import { getCookie } from "../../utils/cookie";

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
        console.log('action.payload', action.payload);
        url = action.payload;
        socket = new WebSocket(`${url}`);
        tryReconnect = true;
        dispatch(wsConnecting());
      }


      if (socket) {
        socket.onopen = event => {
          console.log('socket.onopen');
          tryReconnect = true;
          dispatch(onOpen());
        };

        socket.onerror = event => {
          console.log('socket.onerror', event);
          dispatch(onError());
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(onMessage(parsedData));
        };

        socket.onclose = event => {
          if (event.code !== 1000) {
            console.log('socket.onclose', event);
            dispatch(onError(event.code.toString()))
          }

          dispatch(onClose(event.code.toString()));

          if(tryReconnect){
            dispatch(wsConnecting())
            reconnectTimer = window.setTimeout(() => {
                dispatch(wsConnect(url))
            }, 3000)
          }
        };

        if (wsDisconnect.match(action)) {
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