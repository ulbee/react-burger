import { combineReducers } from 'redux';
import { 
  GET_INGREDIENTS_REQUEST, 
  GET_INGREDIENTS_SUCCESS, 
  GET_INGREDIENTS_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  SHOW_INGREDIENT,
  HIDE_INGREDIENT,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  ADD_BUN,
  CHANGE_INGREDIENT_ORDER
 } from '../../utils/constants';

const initialState = {
  ingredientsByType: null,
  ingredientsById: null,
  ingredientsRequest: false,
  ingredientsFailed: false,

  addedIngredients: {
    bun: null,
    others: []
  },
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
    case ADD_INGREDIENT: {
      return {
        ...state,
        addedIngredients: {
          ...state.addedIngredients,
          others: [...state.addedIngredients.others, state.ingredientsById[action.id]]
        }
      }
    }
    case DELETE_INGREDIENT: {
      const items = [...state.addedIngredients.others];
      items.splice(action.index, 1);
      return {
        ...state,
        addedIngredients: {
          ...state.addedIngredients,
          others: items
        }
      }
    }
    case ADD_BUN: {
      return {
        ...state,
        addedIngredients: {
          ...state.addedIngredients,
          bun: state.ingredientsById[action.id]
        }
      }
    }
    case CHANGE_INGREDIENT_ORDER: {
      const items = [...state.addedIngredients.others];

      items.splice(
        action.newId,
        0,
        items.splice(action.prevId, 1)[0]
      );
      return {
        ...state,
        addedIngredients: {
          ...state.addedIngredients,
          others: items
        }
      }
      
    }

    default: return state;  
  }
}

export const rootReducer = combineReducers({
  menu: ingredientsReducer
});
