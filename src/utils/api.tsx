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
import { IEditUserOptions, IGetUserOptions, ILogoutUserOptions } from '../services/types/request';
import { TUser } from "../services/types/user";

// TODO: нужно ли типизировать data? Должен быть {ok: boolean, json?: () => any } ???
const checkResponse = async (data: any) => {
  if (!data.ok) {
    throw new Error(data.message, { cause: await data.json() });
  }
  return data.json();
}

// TODO: как вообще типизировать ответ сервера???
const getIngredientsRequest = async (): Promise<any> => {
  const res = await fetch(GETINGREDIENTSURL);

  return await checkResponse(res);
}

const sendOrderRequest = async (ingredientIds: Array<string>, accessToken: string): Promise<any> => {
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

const getUserRequest = async ({accessToken}: IGetUserOptions): Promise<any> => {
  const res = await fetch(USERURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + accessToken
    }
  });

  return await checkResponse(res);
}

const editUserRequest = async ({user, accessToken} : IEditUserOptions): Promise<any> => {
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

const addUserRequest = async (user: TUser): Promise<any> => {
  const res = await fetch(ADDUSERURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  });

  return await checkResponse(res);
}

const loginRequest = async (user: TUser): Promise<any> => {
  const res = await fetch(LOGINUSERURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  });

  return await checkResponse(res);
}

const logoutRequest = async ({token}: ILogoutUserOptions): Promise<any> => {
  const res = await fetch(LOGOUTUSERURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({token})
  });

  return await checkResponse(res);
}

const refreshTokenRequest = async (token: string): Promise<any> => {
  const res = await fetch(REFRESHTOKENURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({token})
  });

  return await checkResponse(res);
}

const passwordForgotRequest = async (email: string): Promise<any> => {
  const res = await fetch(PASSWORDFORGOTURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({'email': email})
  });

  return await checkResponse(res);
}

const passwordResetRequest = async (password: string, token: number): Promise<any> => {
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
