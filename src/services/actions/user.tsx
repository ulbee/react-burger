import { AppDispatch, AppThunk } from '../types/index';
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
  TUser,
  addUserAction,
  addUserSuccessAction,
  addUserFailedAction,
  loginUserAction,
  loginUserSuccessAction,
  loginUserFailedAction,
  getUserSuccessAction,
  getUserFailedAction,
  editUserSuccessAction,
  editUserFailedAction,
  forgotPasswordSuccessAction,
  forgotPasswordFailedAction,
  resetPasswordSuccessAction,
  resetPasswordFailedAction,
  logoutUserSuccessAction,
  logoutUserFailedAction
 } from "../types/user";
 import { 
  TRequestRetryOptions, 
  requestRetryOnFail, 
  requestRetryOnSuccess ,
  requestRetry
} from "../types/request";
import {
  SET_REGISTER_FORM_VALUE,
  SET_EDIT_USER_FORM,
} from '../../utils/constants'; 



export const setRegisterFormValue = (field: string, value: string) => ({
  type: SET_REGISTER_FORM_VALUE,
  field,
  value
});

export const setEditUserForm = (field: string, value: string) => ({
  type: SET_EDIT_USER_FORM,
  field,
  value
});

// Добавление нового пользователя
export function addUser(user: TUser) {
  return function(dispatch: AppDispatch) {
    dispatch(addUserAction());

    addUserRequest(user)
      .then((res) => {
        if (res && res.success) {
          const accessToken = getAccessToken(res.accessToken);

          setCookie('token', res.refreshToken);
          setCookie('accessToken', accessToken);

          dispatch(addUserSuccessAction(res.user))
        }})
      .catch(() => {
        dispatch(addUserFailedAction());
      })
  }
}

// Вход уже существующего пользователя
export const loginUser: AppThunk = (user: TUser) => (dispatch: AppDispatch) => {
  dispatch(loginUserAction());

  loginRequest(user)
    .then((res) => {
      if (res && res.success) {
        const accessToken: string = getAccessToken(res.accessToken);

        setCookie('token', res.refreshToken);
        setCookie('accessToken', accessToken);

        dispatch(loginUserSuccessAction(res.user));
      }})
    .catch((err) => {
      dispatch(loginUserFailedAction(err.message));
    })
}

// Получение информации о пользователе
export function getUser() {
  return function(dispatch: AppDispatch) {
    getRequestWithRetry(
      getUserRequest,
      ({user}) => dispatch(getUserSuccessAction(user)),
      () => dispatch(getUserFailedAction())
    );
  }
}

// Редактирование информации о пользователе
export function editUser(user: TUser) {
  return function(dispatch: AppDispatch) {
    getRequestWithRetry(
      editUserRequest,
      ({user}) => dispatch(editUserSuccessAction(user)),
      () => dispatch(editUserFailedAction()),
      user
    );
  }
}

export const forgotPassword: AppThunk = (email: string) => (dispatch: AppDispatch) => {
  passwordForgotRequest(email)
  .then((res) => {
    if (res && res.success) {
      dispatch(forgotPasswordSuccessAction(res.user));        
    }
  })
  .catch(() => {
    dispatch(forgotPasswordFailedAction());
  })
}

export function resetPassword(password: string, code: string) {
  return function(dispatch: AppDispatch) {

    passwordResetRequest(password, code)
    .then((res) => {
      if (res && res.success) {
        dispatch(resetPasswordSuccessAction())
      }
    })
    .catch(() => {
      dispatch(resetPasswordFailedAction());
    })
  }

}

export const logoutUser: AppThunk = () => (dispatch: AppDispatch) => {
  getRequestWithRetry(
    logoutRequest,
    () => {
      setCookie('accessToken', '', {expires: 0});
      setCookie('token', '', {expires: 0});
      dispatch(logoutUserSuccessAction())
    },
    ({message}) => {
      dispatch(logoutUserFailedAction(message));
    },
    getCookie('token')
  )
}

/**
 * @param {function} getRequest - запрос для ретрая
 * @param {object} options - параметры запроса
 * @param {string} options.accessToken - токен авторизации
 * @param {string} onSuccess - функция для обработки успешного результата
 * @param {string} onFail - функция для обработки ошибок
 */

// TODO что делать с options и getRequest???
function getRequestWithRetry(getRequest: requestRetry, onSuccess: requestRetryOnSuccess, onFail: requestRetryOnFail, options?: TRequestRetryOptions) {
  
  getRequest(getCookie('accessToken'), options)
      .then((res: any) => {
        if (res && res.success) {
          onSuccess(res);
        }})
      .catch((err: any) => {
        if (err.cause.message === "jwt expired") {
          return refreshTokenRequest(getCookie('token'))
            .then((res) => {
              if (res && res.success) {
                setCookie('accessToken', getAccessToken(res.accessToken));
                setCookie('token', res.refreshToken);
                
                return getRequest(getAccessToken(res.accessToken), options)
                  .then((res: any) => {
                    if (res && res.success) {
                      onSuccess(res)
                    }
                  })
              }
            })
        }

        return err;
      })
      .catch((err: any) => {
        onFail(err);
      })
}
