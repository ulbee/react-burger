import { 
  SET_REGISTER_FORM_VALUE,
  SET_EDIT_USER_FORM,

  ADD_USER_SUCCESS,
  ADD_USER_REQUEST,
  ADD_USER_FAILED,
  
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,

  GET_USER_SUCCESS,
  GET_USER_FAILED,

  EDIT_USER_SUCCESS,
  EDIT_USER_FAILED,
  RESET_EDIT_USER_FORM,


  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,

  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
 } from '../../utils/constants';


const initialUserState = {
  name: '',
  email: '',
  password: '',
  prevSavedName: '',
  prevSavedEmail: '',
  prevSavedPassword: '',

  isAuthSuccess: false,

  addUserRequest: false,
  addUserFailed: false,

  loginUserRequest: false,
  loginUserSuccess: false,
  loginUserFailed: false,
  loginErrorMessage: '',

  editUserFailed: false,
  isUserEdited: false,

  canResetPassword: false,
  resetPasswordSuccess: false,
  code: '',
}

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_REGISTER_FORM_VALUE: {
      
      return {
        ...state,
        [action.field]: action.value,
      }
    }
    case SET_EDIT_USER_FORM: {

      return {
        ...state,
        [action.field]: action.value,
        isUserEdited: true
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
        addUserRequest: false,
        loginUserSuccess: true
      }
    }
    case ADD_USER_FAILED: {
      return {
        ...state,
        addUserRequest: false,
        addUserFailed: true,
        loginUserSuccess: false
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
        loginUserRequest: false,
        loginUserSuccess: true
      }
    }
    case LOGIN_USER_FAILED: {
      return {
        ...state,
        loginUserRequest: false,
        loginUserFailed: true,
        loginErrorMessage: action.errorMessage
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        name: action.user.name,
        email: action.user.email,
        prevSavedName: action.user.name,
        prevSavedEmail: action.user.email,
        isAuthSuccess: true
      }
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        isAuthSuccess: false
      }
    }
    case EDIT_USER_SUCCESS: {
      return {
        ...state,
        name: action.user.name,
        email: action.user.email,
        prevSavedName: action.user.name,
        prevSavedEmail: action.user.email,
        editUserFailed: false,
        isUserEdited: false
      }
    }
    case EDIT_USER_FAILED: {
      return {
        ...state,
        editUserFailed: true
      }
    }
    case RESET_EDIT_USER_FORM: {
      return {
        ...state,
        name: state.prevSavedName,
        email: state.prevSavedEmail,
        password: state.prevSavedPassword
      }
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        canResetPassword: true
      }
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        canResetPassword: false
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordSuccess: true
      }
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordSuccess: false
      }
    }
    

    default: return state;  
  }
};
