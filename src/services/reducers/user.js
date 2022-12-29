import { 
  SET_REGISTER_FORM_VALUE,

  ADD_USER_SUCCESS,
  ADD_USER_REQUEST,
  ADD_USER_FAILED,
  
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,

  GET_USER_SUCCESS,
  GET_USER_FAILED
 } from '../../utils/constants';


const initialUserState = {
  // requiredForRegistration: ['name', 'email', 'password'],
  name: '',
  email: '',
  password: '',
  accessToken: '',
  refreshToken: '',

  isUserLoaded: false,

  // canAddUser: false,
  addUserRequest: false,
  addUserFailed: false,

  loginUserRequest: false,
  loginUserFailed: false,

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
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
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
    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        loginUserRequest: true
      }
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        name: action.user.name,
        email: action.user.email,
        password: '',
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        loginUserRequest: false
      }
    }
    case LOGIN_USER_FAILED: {
      return {
        ...state,
        loginUserRequest: false,
        loginUserFailed: true
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        name: action.user.name,
        email: action.user.email,
        isUserLoaded: true
      }
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        isUserLoaded: false
      }
    }
    

    default: return state;  
  }
};
