import { addUserRequest, refreshTokenRequest, loginRequest, logoutRequest, getUserRequest, editUserRequest } from "../../utils/api";
import { setCookie, getCookie } from "../../utils/cookie";
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
  EDIT_USER_FAILED
 } from '../../utils/constants'; 

 const getAccessToken = (accessToken) => {
  return accessToken.split('Bearer ')[1];
 }

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
        } else {
          dispatch({type: ADD_USER_FAILED});
        }
      })
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
        } else {
          dispatch({type: LOGIN_USER_FAILED});
        }
      })
      .catch((err) => {
        dispatch({type: LOGIN_USER_FAILED});
      })
  }
}

// Получение информации о пользователе
export function getUser() {
  return function(dispatch) {
    const accessToken = getCookie('accessToken');

    getUserRequest(accessToken)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            user: res.user
          })
        } else if (res.message === "jwt expired") {
          refreshTokenRequest(getCookie('token'))
            .then((res) => {
              if (res && res.success) {
                setCookie('accessToken', getAccessToken(res.accessToken));
                setCookie('token', res.refreshToken);

                getUserRequest(getAccessToken(res.accessToken))
                  .then((res) => {
                    if (res && res.success) {
                      dispatch({
                        type: GET_USER_SUCCESS,
                        user: res.user
                      })
                    }
                  })
                  .catch((err) => {
                    dispatch({type: GET_USER_FAILED});
                  })
              }
            })
        } else {
          dispatch({type: GET_USER_FAILED});
        }
      })
      .catch((err) => {
        dispatch({type: GET_USER_FAILED});
      })
  }
}

export function editUser(user) {
  return function(dispatch) {
    const accessToken = getCookie('accessToken');

    editUserRequest(user, accessToken)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: EDIT_USER_SUCCESS,
          user: res.user
        })
      }
    })
    .catch((err) => {
      dispatch({type: EDIT_USER_FAILED});
    })
  }

}
