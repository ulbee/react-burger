import { combineReducers } from 'redux';
import { 
  GET_INGREDIENTS_REQUEST, 
  GET_INGREDIENTS_SUCCESS, 
  GET_INGREDIENTS_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  SHOW_INGREDIENT,
  HIDE_INGREDIENT
 } from '../../utils/constants';
 import { ORDER } from '../../utils/order';

const initialState = {
  ingredientsByType: null,
  ingredientsById: null,
  ingredientsRequest: false,
  ingredientsFailed: false,

  addedIngredients: ORDER,
  currentIngredient: null,

  orderId: null,
  orderRequest: false,
  orderFailed: false
}


export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsById: action.ingredientsById,
        ingredientsByType: action.ingredientsByType
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true
      }
    }
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false
      }
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderId: action.orderId
      }
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true
      }
    }
    case SHOW_INGREDIENT: {
      return {
        ...state,
        currentIngredient: state.ingredientsById[action.id]
      }
    }
    case HIDE_INGREDIENT: {
      return {
        ...state,
        currentIngredient: null
      }
    }

    default: return state;  
  }
}

export const rootReducer = combineReducers({
  menu: ingredientsReducer
});
