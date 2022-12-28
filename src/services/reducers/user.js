import { 
  SET_REGISTER_FORM_VALUE,

  ADD_USER_SUCCESS,
  ADD_USER_REQUEST,
  ADD_USER_FAILED
 } from '../../utils/constants';


const initialUserState = {
  name: '',
  email: '',
  password: '',
  token: '',

  addUserRequest: false,
  addUserFailed: false
}

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_REGISTER_FORM_VALUE: {
      return {
        ...state,
        [action.field]: action.value
      }
    }
    case ADD_USER_REQUEST: {
      return {
        ...state,
        addUserRequest: true
      }
    }
    case ADD_USER_SUCCESS: {
      return {
        ...state,
        name: action.user.name,
        email: action.user.email,
        token: action.accessToken.split('Bearer ')[1],
        addUserRequest: false
      }
    }
    case ADD_USER_FAILED: {
      return {
        ...state,
        addUserRequest: false,
        addUserFailed: true
      }
    }
    default: return state;  
  }
};
