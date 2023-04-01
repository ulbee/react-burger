import { AppDispatch, AppThunk } from '../types/index';
import { getIngredientsRequest, sendOrderRequest } from "../../utils/api";
import { TIngredient, TIngredientsByType, TIngredientsById } from "../types/ingredients";
import { getAccessToken, getCookie, setCookie } from "../../utils/cookie";
import { refreshTokenRequest } from "../../utils/api";
import { 
  getIngredientsSuccessAction,
  getIngredientsFailedAction,
  getIngredientsAction,
  sendOrderAction,
  sendOrderSuccessAction,
  sendOrderFailedAction
} from '../types/ingredients';

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
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

export const sendOrder: AppThunk = (ids: Array<string>) => (dispatch: AppDispatch) => {
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
