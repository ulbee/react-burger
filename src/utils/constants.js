const BASEURL = 'https://norma.nomoreparties.space/api';
export const GETINGREDIENTSURL = BASEURL + '/ingredients';
export const SAVEORDERURL = BASEURL + '/orders';
export const ADDUSERURL = BASEURL + '/auth/register';
export const LOGINUSERURL = BASEURL + '/auth/login';
export const LOGOUTUSERURL = BASEURL + '/auth/logout';
export const SAVETOKENURL = BASEURL + '/auth/token';

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
export const ADD_USER_REQUEST = 'GET_USER_REQUEST';
export const ADD_USER_SUCCESS = 'GET_USER_SUCCESS';
export const ADD_USER_FAILED = 'GET_USER_FAILED';
