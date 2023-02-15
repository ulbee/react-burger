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

const checkResponse = async (data) => {
  if (!data.ok) {
    throw new Error(data.message, { cause: await data.json() });
  }
  return data.json();
}

const getIngredientsRequest = async () => {
  const res = await fetch(GETINGREDIENTSURL);

  return await checkResponse(res);
}

const sendOrderRequest = async (ingredientIds, accessToken) => {
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

const getUserRequest = async ({accessToken}) => {
  const res = await fetch(USERURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + accessToken
    }
  });

  return await checkResponse(res);
}

const editUserRequest = async ({user, accessToken}) => {
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

const addUserRequest = async (user) => {
  const res = await fetch(ADDUSERURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  });

  return await checkResponse(res);
}

const loginRequest = async (user) => {
  const res = await fetch(LOGINUSERURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  });

  return await checkResponse(res);
}

const logoutRequest = async ({token}) => {
  const res = await fetch(LOGOUTUSERURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({token})
  });

  return await checkResponse(res);
}

const refreshTokenRequest = async (token) => {
  const res = await fetch(REFRESHTOKENURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({token})
  });

  return await checkResponse(res);
}

const passwordForgotRequest = async (email) => {
  const res = await fetch(PASSWORDFORGOTURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({'email': email})
  });

  return await checkResponse(res);
}

const passwordResetRequest = async (password, token) => {
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
