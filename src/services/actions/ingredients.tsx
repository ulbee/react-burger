import { getIngredientsRequest, sendOrderRequest } from "../../utils/api";
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
 import { TIngredient, TIngredientsByType, TIngredientsById } from "../../utils/ingredientsTypes";
 import { getAccessToken, getCookie, setCookie } from "../../utils/cookie";
 import { refreshTokenRequest } from "../../utils/api";

// Типизация получения списка ингридиентов
interface IGetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

interface IGetCountriesSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredientsByType: TIngredientsByType;
  readonly ingredientsById: TIngredientsById;
}

const getIngredientsAction = (): IGetIngredientsAction => ({
  type: GET_INGREDIENTS_REQUEST
});
const getIngredientsSuccessAction = 
(ingredientsByType: TIngredientsByType, ingredientsById: TIngredientsById): IGetCountriesSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  ingredientsByType,
  ingredientsById
});
const getIngredientsFailedAction = (): IGetIngredientsFailedAction => ({
  type: GET_INGREDIENTS_FAILED
});

// Типизация создания заказа
interface ISendOrderAction {
  readonly type: typeof SEND_ORDER_REQUEST;
}

interface ISendOrderFailedAction {
  readonly type: typeof SEND_ORDER_FAILED;
}

interface ISendOrderSuccessAction {
  readonly type: typeof SEND_ORDER_SUCCESS;
  readonly orderId: number;
}

const sendOrderAction = (): ISendOrderAction => ({
  type: SEND_ORDER_REQUEST
});

const sendOrderSuccessAction = (orderId: number): ISendOrderSuccessAction => ({
  type: SEND_ORDER_SUCCESS,
  orderId
});

const sendOrderFailedAction = (): ISendOrderFailedAction => ({
  type: SEND_ORDER_FAILED
});

// Типизация других действий с ингридиентами
interface IShowIngredient {
  readonly type: typeof SHOW_INGREDIENT;
  id: string;
}

interface IHideIngredient {
  readonly type: typeof HIDE_INGREDIENT;
}

interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  id: string;
}

interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT;
  index: number;
}

interface IAddBun {
  readonly type: typeof ADD_BUN;
  id: string;
}

interface IChangeOrderIngredients {
  readonly type: typeof CHANGE_INGREDIENT_ORDER;
  prevIndex: number;
  newIndex: number;
}

interface ISetActiveTab {
  readonly type: typeof SET_ACTIVE_TAB;
  name: string;
}

export type TIngredientsAction = 
  IGetIngredientsAction
  | IGetCountriesSuccessAction
  | IGetIngredientsFailedAction
  | ISendOrderAction
  | ISendOrderSuccessAction
  | ISendOrderFailedAction
  | IShowIngredient
  | IHideIngredient
  | IAddIngredient
  | IDeleteIngredient
  | IAddBun
  | IChangeOrderIngredients
  | ISetActiveTab;

export function getIngredients() {
  return function(dispatch: any) {
    dispatch(getIngredientsAction());

    getIngredientsRequest()
      .then((res) => {
        if (res && res.success) {
          const ingredientsById: TIngredientsById = {};
          const ingredientsByType: TIngredientsByType = {};
          
          res.data.forEach((item: TIngredient) => {
            ingredientsById[item._id] = item;
            (ingredientsByType[item.type] || (ingredientsByType[item.type] = [])).push(item);
          });

          dispatch(getIngredientsSuccessAction(ingredientsByType, ingredientsById))
        } else {
          // Пробрасывать ошибку и обрабатывать все только в catch
          dispatch(getIngredientsFailedAction());
        }
      })
      .catch(() => {
        dispatch(getIngredientsFailedAction());
      })
  }
}

export function sendOrder(ids: Array<string>) {
  return function(dispatch: any) {
    dispatch(sendOrderAction());

    const accessToken: string = getCookie('accessToken');

    sendOrderRequest(ids, accessToken)
      .then((res) => {
        if (res && res.success) {   
          dispatch(sendOrderSuccessAction(res.order.number));
        } else if (res.message === "jwt expired") {

          refreshTokenRequest(getCookie('token'))
            .then((res) => {
              if (res && res.success) {
                setCookie('accessToken', getAccessToken(res.accessToken));
                setCookie('token', res.refreshToken);
  
                sendOrderRequest(ids, getAccessToken(res.accessToken))
                  .then((res) => {
                    if (res && res.success) {
                      dispatch(sendOrderSuccessAction(res.order.number));
                    }
                  })
                  .catch(() => {
                    dispatch(sendOrderFailedAction());
                  })
              }
            })
        } else {
          dispatch(sendOrderFailedAction());
        }
      })
      .catch(() => {
        dispatch(sendOrderFailedAction());
      })
  }
}
