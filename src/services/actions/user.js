import { addUserRequest, refreshTokenRequest, loginRequest, logoutRequest, getUserRequest } from "../../utils/api";
import { setCookie } from "../../utils/cookie";
import {
  SET_REGISTER_FORM_VALUE,

  ADD_USER_REQUEST, 
  ADD_USER_SUCCESS, 
  ADD_USER_FAILED,

  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,

  GET_USER_SUCCESS,
  GET_USER_FAILED
 } from '../../utils/constants'; 

export const setRegisterFormValue = (field, value) => ({
  type: SET_REGISTER_FORM_VALUE,
  field,
  value
});

export function addUser(user) {
  return function(dispatch) {
    dispatch({type: ADD_USER_REQUEST});

    addUserRequest(user)
      .then((res) => {
        if (res && res.success) {
          const accessToken = res.accessToken.split('Bearer ')[1];

          setCookie('token', res.refreshToken);
          dispatch({
            type: ADD_USER_SUCCESS,
            user: res.user,
            accessToken,
            refreshToken: res.refreshToken
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

export function loginUser(user) {
  return function(dispatch) {
    dispatch({type: LOGIN_USER_REQUEST});

    loginRequest(user)
      .then((res) => {
        if (res && res.success) {
          const accessToken = res.accessToken.split('Bearer ')[1];

          setCookie('token', res.refreshToken);
          setCookie('accessToken', accessToken, {expires: 1200});
          dispatch({
            type: LOGIN_USER_SUCCESS,
            user: res.user,
            accessToken,
            refreshToken: res.refreshToken
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

export function getUser(token) {
  return function(dispatch) {

    getUserRequest(token)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            user: res.user
          })          
        } else {
          dispatch({type: GET_USER_FAILED});
        }
      })
  }
}
