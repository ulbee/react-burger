import { getIngredientsRequest, sendOrderRequest } from "../../utils/api";
import { 
  GET_INGREDIENTS_REQUEST, 
  GET_INGREDIENTS_SUCCESS, 
  GET_INGREDIENTS_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED
 } from '../../utils/constants';
 import { getAccessToken, getCookie, setCookie } from "../../utils/cookie";
 import { refreshTokenRequest } from "../../utils/api";

export function getIngredients() {
  return function(dispatch) {
    dispatch({type: GET_INGREDIENTS_REQUEST});

    getIngredientsRequest()
      .then((res) => {
        if (res && res.success) {
          const ingredientsById = {};
          const ingredientsByType = {};

          
          res.data.forEach((item) => {
            ingredientsById[item._id] = item;
            (ingredientsByType[item.type] || (ingredientsByType[item.type] = [])).push(item);
          });

          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredientsByType,
            ingredientsById
          })
        } else {
          dispatch({type: GET_INGREDIENTS_FAILED});
        }
      })
      .catch((err) => {
        dispatch({type: GET_INGREDIENTS_FAILED});
      })
  }
}

export function sendOrder(ids) {
  return function(dispatch) {
    dispatch({type: GET_ORDER_REQUEST});
    const accessToken = getCookie('accessToken');

    sendOrderRequest(ids, accessToken)
      .then((res) => {
        if (res && res.success) {          
          dispatch({
            type: GET_ORDER_SUCCESS,
            orderId: res.order.number
          })
        } else if (res.message === "jwt expired") {

          refreshTokenRequest(getCookie('token'))
            .then((res) => {
              if (res && res.success) {
                setCookie('accessToken', getAccessToken(res.accessToken));
                setCookie('token', res.refreshToken);
  
                sendOrderRequest(ids, getAccessToken(res.accessToken))
                  .then((res) => {
                    if (res && res.success) {
                      dispatch({
                        type: GET_ORDER_SUCCESS,
                        orderId: res.order.number
                      })
                    }
                  })
                  .catch((err) => {
                    dispatch({type: GET_ORDER_FAILED});
                  })
              }
            })
        } else {
          dispatch({type: GET_ORDER_FAILED});
        }
      })
      .catch((err) => {
        dispatch({type: GET_ORDER_FAILED});
      })
  }
}
