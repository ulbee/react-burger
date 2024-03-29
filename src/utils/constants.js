const BASEURL = 'https://norma.nomoreparties.space/api';
export const GETINGREDIENTSURL = BASEURL + '/ingredients';
export const SAVEORDERURL = BASEURL + '/orders';
export const ADDUSERURL = BASEURL + '/auth/register';
export const LOGINUSERURL = BASEURL + '/auth/login';
export const LOGOUTUSERURL = BASEURL + '/auth/logout';
export const REFRESHTOKENURL = BASEURL + '/auth/token';
export const USERURL = BASEURL + '/auth/user';
export const PASSWORDFORGOTURL = BASEURL + '/password-reset';
export const PASSWORDRESETURL = BASEURL + '/password-reset/reset';

export const WSURL = 'wss://norma.nomoreparties.space';
export const GET_ALL_ORDERS_URL = WSURL + '/orders/all';
export const GET_USER_ORDERS_URL = WSURL + '/orders';
export const WS_STATUS = {
  CONNECTING : 'CONNECTING...',
  ONLINE : 'ONLINE',
  OFFLINE : 'OFFLINE'
}
export const WS_MESSAGE = 'WS_MESSAGE';

// Константы для обработки запроса для получения всех ингридиентов
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

// Константы для обработки запроса оформления заказа
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

// Константы для получения/удаления данных об отдельном ингридиенте
export const SHOW_INGREDIENT = 'SHOW_INGREDIENT';
export const HIDE_INGREDIENT = 'HIDE_INGREDIENT';

// Константы для добавления ингридиента в конструктор бургера
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';

// Константы для сортировки ингридиентов бургера
export const CHANGE_INGREDIENT_ORDER = 'CHANGE_INGREDIENT_ORDER';

// Константа для изменения активного таба
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';

// Константы для обработки запроса получения данных о пользователе
export const SET_REGISTER_FORM_VALUE = 'SET_REGISTER_FORM_VALUE';
export const SET_EDIT_USER_FORM = 'SET_EDIT_USER_FORM';

export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILED = 'ADD_USER_FAILED';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED';

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILED = 'EDIT_USER_FAILED';
export const RESET_EDIT_USER_FORM = 'RESET_EDIT_USER_FORM';

export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const GET_USER_ORDERS = 'GET_USER_ORDERS';

export const ORDER_STATUSES = {
  done: 'Выполнен',
  cancelled: 'Отменён',
  progress: 'Готовится'
}
