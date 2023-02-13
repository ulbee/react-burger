import { GETINGREDIENTSURL, SAVEORDERURL, ADDUSERURL, LOGINUSERURL, LOGOUTUSERURL, REFRESHTOKENURL, USERURL } from "./constants";

const getIngredientsRequest = async () => {
  const data = await fetch(GETINGREDIENTSURL);

  if (!data.ok) {
    throw new Error('Произошла ошибка: ' + data.status);
  }
  return await data.json();
}

const sendOrderRequest = async (ingredientIds) => {
  const res = await fetch(SAVEORDERURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      ingredients: ingredientIds
    })
  });

  if (!res.ok) {
    throw new Error('Произошла ошибка: ' + res.status);
  }

  return await res.json();
}

const getUserRequest = async (token) => {
  const res = await fetch(USERURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + token
    }
  });

  return await res.json();
}

const editUserRequest = async (user, token) => {
  const res = await fetch(USERURL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(user)
  });

  if (!res.ok) {
    throw new Error('Произошла ошибка: ' + res.status);
  }

  return await res.json();
}

const addUserRequest = async (user) => {
  const res = await fetch(ADDUSERURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  });

  if (!res.ok) {
    throw new Error('Произошла ошибка: ' + res.status);
  }

  return await res.json();
}

const loginRequest = async (user) => {
  const res = await fetch(LOGINUSERURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  });

  if (!res.ok) {
    throw new Error('Произошла ошибка: ' + res.status);
  }

  return await res.json();
}

const logoutRequest = async (token) => {
  const res = await fetch(LOGOUTUSERURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({token})
  });

  if (!res.ok) {
    throw new Error('Произошла ошибка: ' + res.status);
  }

  return await res.json();
}

const refreshTokenRequest = async (token) => {
  const res = await fetch(REFRESHTOKENURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({token})
  });

  if (!res.ok) {
    throw new Error('Произошла ошибка: ' + res.status);
  }

  return await res.json();
}

export { 
  getIngredientsRequest, 
  sendOrderRequest, 
  addUserRequest, 
  loginRequest, 
  logoutRequest, 
  refreshTokenRequest,
  getUserRequest,
  editUserRequest
 };
