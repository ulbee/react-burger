import { 
  addUserRequest,
  refreshTokenRequest,
  loginRequest,
  logoutRequest,
  getUserRequest,
  editUserRequest,
  passwordForgotRequest,
  passwordResetRequest
} from "../../utils/api";
import { setCookie, getCookie, getAccessToken } from "../../utils/cookie";
import {
  SET_REGISTER_FORM_VALUE,
  SET_EDIT_USER_FORM,

  ADD_USER_REQUEST, 
  ADD_USER_SUCCESS, 
  ADD_USER_FAILED,

  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,

  GET_USER_SUCCESS,
  GET_USER_FAILED,

  EDIT_USER_SUCCESS,
  EDIT_USER_FAILED,

  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,

  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,

  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILED
 } from '../../utils/constants'; 


export const setRegisterFormValue = (field, value) => ({
  type: SET_REGISTER_FORM_VALUE,
  field,
  value
});

export const setEditUserForm = (field, value) => ({
  type: SET_EDIT_USER_FORM,
  field,
  value
});

// Добавление нового пользователя
export function addUser(user) {
  return function(dispatch) {
    dispatch({type: ADD_USER_REQUEST});

    addUserRequest(user)
      .then((res) => {
        if (res && res.success) {
          const accessToken = getAccessToken(res.accessToken);

          setCookie('token', res.refreshToken);
          setCookie('accessToken', accessToken);
          dispatch({
            type: ADD_USER_SUCCESS,
            user: res.user
          })          
        }})
      .catch((err) => {
        dispatch({type: ADD_USER_FAILED});
      })
  }
}

// Вход уже существующего пользователя
export function loginUser(user) {
  return function(dispatch) {
    dispatch({type: LOGIN_USER_REQUEST});

    loginRequest(user)
      .then((res) => {
        if (res && res.success) {
          const accessToken = getAccessToken(res.accessToken);

          setCookie('token', res.refreshToken);
          setCookie('accessToken', accessToken);

          dispatch({
            type: LOGIN_USER_SUCCESS,
            user: res.user
          })          
        }})
      .catch((err) => {
        dispatch({type: LOGIN_USER_FAILED, errorMessage: err.message});
      })
  }
}

// Получение информации о пользователе
export function getUser() {
  return function(dispatch) {
    getRequestWithRetry(
      getUserRequest,
      ({user}) => dispatch({type: GET_USER_SUCCESS, user}),
      () => dispatch({type: GET_USER_FAILED})
    );
  }
}

export function editUser(user) {
  return function(dispatch) {
    getRequestWithRetry(
      editUserRequest,
      ({user}) => dispatch({type: EDIT_USER_SUCCESS, user}),
      () => dispatch({type: EDIT_USER_FAILED}),
      {user}
    );
  }
}

export function forgotPassword(email) {
  return function(dispatch) {

    passwordForgotRequest(email)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          user: res.user
        });
      }
    })
    .catch((err) => {
      dispatch({type: FORGOT_PASSWORD_FAILED});
    })
  }

}

export function resetPassword(password, code) {
  return function(dispatch) {

    passwordResetRequest(password, code)
    .then((res) => {
      if (res && res.success) {
        dispatch({type: RESET_PASSWORD_SUCCESS})
      }
    })
    .catch((err) => {
      dispatch({type: RESET_PASSWORD_FAILED});
    })
  }

}

export function logoutUser() {
  return function(dispatch) {
    getRequestWithRetry(
      logoutRequest,
      (res) => {
        setCookie('accessToken', '', {Expires: 0});
        setCookie('token', '', {Expires: 0});
        dispatch({
          type: LOGOUT_USER_SUCCESS
        })
      },
      ({message}) => {
        dispatch({type: LOGOUT_USER_FAILED, errorMessage: message});
      },
      {token: getCookie('token')}
    )
  }
}

/**
 * @param {function} getRequest - запрос для ретрая
 * @param {object} options - параметры запроса
 * @param {string} options.accessToken - токен авторизации
 * @param {string} onSuccess - функция для обработки успешного результата
 * @param {string} onFail - функция для обработки ошибок
 */
function getRequestWithRetry(getRequest, onSuccess, onFail, options = {}) {
  options.accessToken = getCookie('accessToken');

  getRequest(options)
      .then((res) => {
        if (res && res.success) {
          onSuccess(res);
        }})
      .catch((err) => {
        if (err.cause.message === "jwt expired") {
          return refreshTokenRequest(getCookie('token'))
            .then((res) => {
              if (res && res.success) {
                setCookie('accessToken', getAccessToken(res.accessToken));
                setCookie('token', res.refreshToken);
                
                options.accessToken = getAccessToken(res.accessToken);

                return getRequest(options)
                  .then((res) => {
                    if (res && res.success) {
                      onSuccess(res)
                    }
                  })
              }
            })
        }

        return err;
      })
      .catch((err) => {
        onFail(err);
      })
}
