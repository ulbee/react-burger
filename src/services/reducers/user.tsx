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
  RESET_PASSWORD_FAILED,

  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILED
} from '../../utils/constants';
import { TUserActions } from '../types/user';

export type TUserState = {
  name: string,
  email: string,
  password: string,
  prevSavedName: string,
  prevSavedEmail: string,
  prevSavedPassword: string,

  isAuthSuccess: boolean,
  isUserLoaded: boolean,

  addUserRequest: boolean,
  addUserFailed: boolean,

  loginUserRequest: boolean,
  loginUserFailed: boolean,
  loginErrorMessage: string,

  logoutError: boolean,

  editUserFailed: boolean,
  isUserEdited: boolean,

  canResetPassword: boolean,
  resetPasswordSuccess: boolean,
  code: string
}

const initialUserState = {
  name: '',
  email: '',
  password: '',
  prevSavedName: '',
  prevSavedEmail: '',
  prevSavedPassword: '',

  isAuthSuccess: false,
  isUserLoaded: false,

  addUserRequest: false,
  addUserFailed: false,

  loginUserRequest: false,
  loginUserFailed: false,
  loginErrorMessage: '',

  logoutError: false,

  editUserFailed: false,
  isUserEdited: false,

  canResetPassword: false,
  resetPasswordSuccess: false,
  code: ''
}

export const userReducer = (state: TUserState = initialUserState, action: TUserActions) => {
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
        isAuthSuccess: true,
        isUserLoaded: true,
        canResetPassword: false,
        resetPasswordSuccess: false,
      }
    }
    case ADD_USER_FAILED: {
      return {
        ...state,
        addUserRequest: false,
        addUserFailed: true,
        isAuthSuccess: false
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
        isAuthSuccess: true,
        isUserLoaded: true,
        canResetPassword: false,
        resetPasswordSuccess: false
      }
    }
    case LOGIN_USER_FAILED: {
      return {
        ...state,
        loginUserRequest: false,
        loginUserFailed: true,
        loginErrorMessage: action.errorMessage,
        isAuthSuccess: false
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        name: action.user.name,
        email: action.user.email,
        prevSavedName: action.user.name,
        prevSavedEmail: action.user.email,
        isAuthSuccess: true,
        isUserLoaded: true
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
    case LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        name: '',
        email: '',
        password: '',
        prevSavedName: '',
        prevSavedEmail: '',
        prevSavedPassword: '',
        canResetPassword: false,
        resetPasswordSuccess: false,
        isAuthSuccess: false,
        logoutError: false
      }
    }
    case LOGOUT_USER_FAILED: {
      return {
        ...state,
        logoutError: true
      }
    }

    default: return state;  
  }
};
