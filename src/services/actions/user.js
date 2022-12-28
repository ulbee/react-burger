import { addUserRequest, saveTokenRequest, loginRequest, logoutRequest } from "../../utils/api";
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

    addUserRequest()
      .then((res) => {
        if (res && res.success) {

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
