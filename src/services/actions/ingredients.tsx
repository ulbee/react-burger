import { getIngredientsRequest, sendOrderRequest } from "../../utils/api";
import { 
  GET_INGREDIENTS_REQUEST, 
  GET_INGREDIENTS_SUCCESS, 
  GET_INGREDIENTS_FAILED,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED
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
