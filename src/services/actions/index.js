import { getIngredientsRequest, sendOrderRequest } from "../../utils/api";
import { 
  GET_INGREDIENTS_REQUEST, 
  GET_INGREDIENTS_SUCCESS, 
  GET_INGREDIENTS_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED
 } from '../../utils/constants'; 

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
  }
}

export function getOrder() {
  return function(dispatch) {
    dispatch({type: GET_ORDER_REQUEST});

    getIngredientsRequest()
      .then((res) => {
        if (res && res.success) {          
          console.log('getOrder', res);
          dispatch({
            type: GET_ORDER_SUCCESS,
            order: res.data
          })
        } else {
          dispatch({type: GET_ORDER_FAILED});
        }
      })
  }
}
