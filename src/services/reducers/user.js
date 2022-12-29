import { 
  SET_REGISTER_FORM_VALUE,

  ADD_USER_SUCCESS,
  ADD_USER_REQUEST,
  ADD_USER_FAILED
 } from '../../utils/constants';


const initialUserState = {
  // requiredForRegistration: ['name', 'email', 'password'],
  name: '',
  email: '',
  password: '',
  token: '',

  // canAddUser: false,
  addUserRequest: false,
  addUserFailed: false
}

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_REGISTER_FORM_VALUE: {
      // let canAddUser = state.requiredForRegistration.reduce((res, value) => {
      //   console.log('value', state[value], res);
      //   return res && state[value];
      // }, true);
      
      return {
        ...state,
        [action.field]: action.value,
        // canAddUser
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
        password: '',
        token: action.accessToken,
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
