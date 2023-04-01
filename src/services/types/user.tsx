import {
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
  LOGOUT_USER_FAILED,

  SET_REGISTER_FORM_VALUE,
  SET_EDIT_USER_FORM,
  RESET_EDIT_USER_FORM
 } from '../../utils/constants'; 

export type TUser = {
  name: string;
  email: string;
  password?: string;
};

// Типизация создания нового пользователя
interface IAddUserAction {
  readonly type: typeof ADD_USER_REQUEST;
}

interface IAddUserSuccessAction {
  readonly type: typeof ADD_USER_SUCCESS;
  user: TUser
}

interface IAddUserFailedAction {
  readonly type: typeof ADD_USER_FAILED;
}

export const addUserAction = (): IAddUserAction => ({
  type: ADD_USER_REQUEST
});

export const addUserSuccessAction = (user: TUser): IAddUserSuccessAction => ({
  type: ADD_USER_SUCCESS,
  user
});

export const addUserFailedAction = (): IAddUserFailedAction => ({
  type: ADD_USER_FAILED
});

// Типизация для логина пользователя
interface ILoginUserAction {
  readonly type: typeof LOGIN_USER_REQUEST;
}

interface ILoginUserSuccessAction {
  readonly type: typeof LOGIN_USER_SUCCESS;
  user: TUser
}

interface ILoginUserFailedAction {
  readonly type: typeof LOGIN_USER_FAILED;
  readonly errorMessage: string;
}

export const loginUserAction = (): ILoginUserAction => ({
  type: LOGIN_USER_REQUEST
});

export const loginUserSuccessAction = (user: TUser): ILoginUserSuccessAction => ({
  type: LOGIN_USER_SUCCESS,
  user
});

export const loginUserFailedAction = (errorMessage: string): ILoginUserFailedAction => ({
  type: LOGIN_USER_FAILED,
  errorMessage
});

// Типизация получения данных о пользователе
interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  user: TUser
}

interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}

export const getUserSuccessAction = (user: TUser): IGetUserSuccessAction => ({
  type: GET_USER_SUCCESS,
  user
});

export const getUserFailedAction = (): IGetUserFailedAction => ({
  type: GET_USER_FAILED
});

// Типизация редактирования данных о пользователе
interface IEditUserSuccessAction {
  readonly type: typeof EDIT_USER_SUCCESS;
  user: TUser
}

interface IEditUserFailedAction {
  readonly type: typeof EDIT_USER_FAILED;
}

export const editUserSuccessAction = (user: TUser): IEditUserSuccessAction => ({
  type: EDIT_USER_SUCCESS,
  user
});

export const editUserFailedAction = (): IEditUserFailedAction => ({
  type: EDIT_USER_FAILED
});

// Типизация экшнов для забытого юзером пароля
interface IForgotPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  user: TUser
}

interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export const forgotPasswordSuccessAction = (user: TUser): IForgotPasswordSuccessAction => ({
  type: RESET_PASSWORD_SUCCESS,
  user
});

export const forgotPasswordFailedAction = (): IForgotPasswordFailedAction => ({
  type: FORGOT_PASSWORD_FAILED
});


// Типизация экшнов для сброса пароля
interface IResetPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export const resetPasswordSuccessAction = (): IResetPasswordSuccessAction => ({
  type: FORGOT_PASSWORD_SUCCESS
});

export const resetPasswordFailedAction = (): IResetPasswordFailedAction => ({
  type: RESET_PASSWORD_FAILED
});

// Типизация экшнов для логаута пользователя
interface ILogoutUserSuccessAction {
  readonly type: typeof LOGOUT_USER_SUCCESS;
}

interface ILogoutUserFailedAction {
  readonly type: typeof LOGOUT_USER_FAILED;
  readonly errorMessage: string;
}

export const logoutUserSuccessAction = (): ILogoutUserSuccessAction => ({
  type: LOGOUT_USER_SUCCESS
});

export const logoutUserFailedAction = (errorMessage: string): ILogoutUserFailedAction => ({
  type: LOGOUT_USER_FAILED,
  errorMessage
});

// Типизация экшнов работы с формами
interface ISetRegisterFormAction {
  readonly type: typeof SET_REGISTER_FORM_VALUE;
  [name: string]: string;
}

type TSetEditFormAction = {
  readonly type: typeof SET_EDIT_USER_FORM;
  [name: string]: string;
} & {
  isUserEdited: boolean;
}

interface IResetEditUserFormUserAction {
  readonly type: typeof RESET_EDIT_USER_FORM;
  name: string;
  email: string;
  password: string;
}

export type TUserActions = 
 IAddUserAction
 | IAddUserSuccessAction
 | IAddUserFailedAction
 | ILoginUserAction
 | ILoginUserSuccessAction
 | ILoginUserFailedAction
 | IGetUserSuccessAction
 | IGetUserFailedAction
 | IEditUserSuccessAction
 | IEditUserFailedAction
 | IForgotPasswordSuccessAction
 | IForgotPasswordFailedAction
 | IResetPasswordSuccessAction
 | IResetPasswordFailedAction
 | ILogoutUserSuccessAction
 | ILogoutUserFailedAction
 | ISetRegisterFormAction
 | TSetEditFormAction
 | IResetEditUserFormUserAction;
