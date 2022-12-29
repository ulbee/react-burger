import { addUserRequest, saveTokenRequest, loginRequest, logoutRequest } from "../../utils/api";
import { setCookie } from "../../utils/methods";
import {
  SET_REGISTER_FORM_VALUE,

  ADD_USER_REQUEST, 
  ADD_USER_SUCCESS, 
  ADD_USER_FAILED
 } from '../../utils/constants'; 

export const setRegisterFormValue = (field, value) => ({
  type: SET_REGISTER_FORM_VALUE,
  field,
  value
});

export function addUser(user) {
  return function(dispatch) {
    dispatch({type: ADD_USER_REQUEST});

    console.log('addUser', user);
    addUserRequest(user)
      .then((res) => {
        console.log('success');
        if (res && res.success) {
          const token = res.accessToken.split('Bearer ')[1];
          console.log('token', token);

          setCookie('token', token);
          dispatch({
            type: ADD_USER_SUCCESS,
            user: res.user,
            accessToken: token
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
