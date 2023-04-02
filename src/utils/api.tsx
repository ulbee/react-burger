import { 
  GETINGREDIENTSURL, 
  SAVEORDERURL, 
  ADDUSERURL, 
  LOGINUSERURL, 
  LOGOUTUSERURL, 
  REFRESHTOKENURL, 
  USERURL,
  PASSWORDFORGOTURL,
  PASSWORDRESETURL 
} from "./constants";
import { TUser } from "../services/types/user";
import { TIngredient } from "../services/types/ingredients";
import { TOrder } from "../services/types/order";

type TErrorResponse = { success: false; message: string; };
type TIngredientsResponse = { success: true; data: Array<TIngredient>; } | TErrorResponse;
type TSendOrderResponse = {
  success: true;
  name: string;
  order: TOrder;
} | TErrorResponse;

type TUserResponse = {
  success: true;
  user: TUser
} | TErrorResponse;

type TLoginUserResponse = {
  success: true;
  accessToken: string;
  refreshToken: string;
  user: TUser;
} | TErrorResponse;

type TLogoutUserResponse = {
  success: true;
  message: string;
} | TErrorResponse;

type TRefreshTokenResponse = {
  success: true;
  accessToken: string;
  refreshToken: string;
} | TErrorResponse;

type TForgotPasswordResponse = {
  success: boolean;
  message: string;
  user: TUser;
}

export type TResponse =
TIngredientsResponse
& TSendOrderResponse
& TUserResponse
& TLoginUserResponse
& TLogoutUserResponse
& TRefreshTokenResponse
& TForgotPasswordResponse;

const checkResponse = async (data: Response): Promise<TResponse> => {
  if (!data.ok) {
    throw new Error(data.status.toString(), { cause: await data.json() });
  }
  return data.json();
}

const getIngredientsRequest = async (): Promise<TIngredientsResponse> => {
  const res = await fetch(GETINGREDIENTSURL);

  return await checkResponse(res);
}

const sendOrderRequest = async (ingredientIds: Array<string>, accessToken: string): Promise<TSendOrderResponse> => {
  const res = await fetch(SAVEORDERURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + accessToken
    },
    body: JSON.stringify({
      ingredients: ingredientIds
    })
  });

  return await checkResponse(res);
}

const getUserRequest = async (accessToken: string): Promise<TUserResponse> => {
  const res = await fetch(USERURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + accessToken
    }
  });

  return await checkResponse(res);
}

const editUserRequest = async (accessToken: string, user: TUser): Promise<TUserResponse> => {
  const res = await fetch(USERURL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + accessToken
    },
    body: JSON.stringify(user)
  });

  return checkResponse(res);
}

const addUserRequest = async (user: TUser): Promise<TLoginUserResponse> => {
  const res = await fetch(ADDUSERURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  });

  return await checkResponse(res);
}

const loginRequest = async (user: TUser): Promise<TLoginUserResponse> => {
  const res = await fetch(LOGINUSERURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  });

  return await checkResponse(res);
}

const logoutRequest = async (accessToken: string, token: string): Promise<TLogoutUserResponse> => {
  const res = await fetch(LOGOUTUSERURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({token})
  });

  return await checkResponse(res);
}

const refreshTokenRequest = async (token: string): Promise<TRefreshTokenResponse> => {
  const res = await fetch(REFRESHTOKENURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({token})
  });

  return await checkResponse(res);
}

const passwordForgotRequest = async (email: string): Promise<TForgotPasswordResponse> => {
  const res = await fetch(PASSWORDFORGOTURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({'email': email})
  });

  return await checkResponse(res);
}

const passwordResetRequest = async (password: string, token: string): Promise<TForgotPasswordResponse> => {
  const res = await fetch(PASSWORDRESETURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({'password': password, 'token': token})
  });

  return await checkResponse(res);
}

export { 
  getIngredientsRequest, 
  sendOrderRequest, 
  addUserRequest, 
  loginRequest, 
  logoutRequest, 
  refreshTokenRequest,
  getUserRequest,
  editUserRequest,
  passwordForgotRequest,
  passwordResetRequest
 };
