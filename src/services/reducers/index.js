import { combineReducers } from 'redux';
import { userReducer } from './user';
import { wsReducer } from './ws';
import { 
  GET_INGREDIENTS_REQUEST, 
  GET_INGREDIENTS_SUCCESS, 
  GET_INGREDIENTS_FAILED,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
  SHOW_INGREDIENT,
  HIDE_INGREDIENT,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  ADD_BUN,
  CHANGE_INGREDIENT_ORDER,
  SET_ACTIVE_TAB
 } from '../../utils/constants';

const initialMenuState = {
  ingredientsByType: null,
  ingredientsById: null,
  ingredientsRequest: false,
  ingredientsFailed: false,

  addedIngredients: {
    bun: null,
    others: []
  },
  currentIngredient: null,

  activeTab: 'bun',

  orderId: null,
  orderRequest: false,
  orderFailed: false
}

let uniqId = 0;
export const ingredientsReducer = (state = initialMenuState, action) => {
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
    case SEND_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false
      }
    }
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderId: action.orderId,
        addedIngredients: {
          bun: null,
          others: []
        }
      }
    }
    case SEND_ORDER_FAILED: {
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
          others: [...state.addedIngredients.others, {...state.ingredientsById[action.id], key: uniqId++}]
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
      const items = state.addedIngredients.others.slice();
      const draggedItem = items.splice(action.prevId, 1)[0];

      items.splice(
        action.newId,
        0,
        draggedItem
      );
      return {
        ...state,
        addedIngredients: {
          ...state.addedIngredients,
          others: items
        }
      }
      
    }
    case SET_ACTIVE_TAB: {
      return {
        ...state,
        activeTab: action.name
      }
    }

    default: return state;
  }
}

export const rootReducer = combineReducers({
  menu: ingredientsReducer,
  user: userReducer,
  ws: wsReducer
});
